import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { spawn } from 'node:child_process';

let flaskProcess = null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const startFlask = () => {
  const flaskExePath = process.env.NODE_ENV === 'development'
    ? path.join(__dirname, '../../backend/dist/app.exe') // this path for development
    : path.join(process.resourcesPath, 'app.exe'); // using this path for production

  flaskProcess = spawn(flaskExePath, [], {
    windowsHide: true, // True -  Hides the console window on Windows
  });

  flaskProcess.stdout.on('data', (data) => {
    console.log(`[Flask] ${data}`);
  });

  flaskProcess.stderr.on('data', (data) => {
    console.error(`[Flask Error] ${data}`);
  });

  flaskProcess.on('close', (code) => {
    console.log(`[Flask] exited with code ${code}`);
  });

  flaskProcess.on('error', (err) => {
    console.error(`[Flask Spawn Error] ${err}`);
  });
};


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // It is highly recommended to enable contextIsolation for security.
      // If you are using a preload script, ensure your exposed APIs are safe.
      contextIsolation: true,
      nodeIntegration: false,
      devTools: false, // *use this wisely, only use when there is no openDevTools() or the app will crash
      // For development, webSecurity might sometimes be temporarily disabled to prevent
      // CORS issues if assets are loaded from different origins. However, the Vite plugin
      // typically handles this without needing to disable it. Keep it true in production.
      // webSecurity: false,
    },
  });

  mainWindow.setMenuBarVisibility(false);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools(); // *commment out devtools:false if using this
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  startFlask();
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (flaskProcess) {
    flaskProcess.kill();
  }

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
