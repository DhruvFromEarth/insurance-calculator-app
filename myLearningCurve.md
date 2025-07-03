# My Learning Curve

## 1. Learned Electron - youtube

## 2. serched for how to train an ml model - youtube.
[Build Your First Machine Learning Project [Full Beginner Walkthrough]](https://www.youtube.com/watch?v=Hr06nSA-qww&t=40s)

- import pandas - data analysis tool
- foo = pandas.read_csv("./foo.csv") - read and assign to a variable
- foo.corr()["columnName"] - to check correlation of this column to other columns
- import seaborn - graph plotting
- seaborn.lmplot(x="col1", y="col2", data=foo, fit_reg=True `regression line`, ci=None `confidence interval`) - plot a 2D diagram with a line
- foo.plot.hist(y="col3") - histogram to chech balance in data(optional)

- data preprocessing - * if required

- train = foo[foo["col1"] < 50 `any condition` ].copy() - splitting the dataset for testing later with untouched data.
- test = foo[foo["col1"] > 50 `any condition` ].copy()
- foo.shape - shows matrix size

----
actually training the model
- from sklearn.linear_model import LinearRegression - scikitLearn python library
- reg = LinearRegression() - initialize linearRegression class
- predictors = ["col1","col2"]
- target = "col3"
- reg.fit(train[predictors],train[target]) - fit our linearRegression model - training

---
testing
- predictions = reg.predict(test[predictors]) - generate predictions (gives numpy array)
- test["col4"] = predictions - (optional) added a column for predictions value
- test.loc[test[predictions] < 0, predictions] = 0 - turned negetive values to zero(0).
- test["col4"] = test["col4"].round() - to round off float value to the nearest integer.
- from sklearn.metrics import mean_absolute_error - scikitLearn python library
- print('mean_absolute_error: ', mean_absolute_error(test['col3'], test['col4'])) - prints error in off value
- after this i sped up the video.

---
others
- .info() - give info about the data set - ALL COLUMNS MUST BE NUMBERS*
- foo.replace({'col1':{'yes':1,'no':0}}, inplace = True) - NOT WORKING FOR NEW VERSION OF PANDAS - changes string to number* - use before spliting the data
- foo['col1'] = foo['col1'].map({'yes': 1, 'no': 0}).astype(int) - WORKING
- .isnull().sum() - missing values by column
- .describe() - data stats
- sns.countplot(x="col1", data=foo) - histogram for non-numericals
- import pickle as pkl - library to download trained model
- pkl.dump( reg, open('model.pkl' `fileName`,'wb' `writeBinary`)) - download syntax
- data split
    ► from sklearn.model_selection import train_test_split
    ► train_data, test_data = train_test_split(data, test_size=0.2, random_state=2)
    ► X_train = train_data.drop("charges", axis=1) - axis 1 is row 0 is column
    ► Y_train = train_data["charges"]
    ► X_test = test_data.drop("charges", axis=1)
    ► Y_test = test_data["charges"]
- data split v2
    ► columns = df.columns.tolist()
    ► target = columns.pop()
    ► predictors = columns

'*' -> important

## 3. recomended project structure -gpt
```bash
v1 -
your-app/
│
├── frontend/               # React app for the UI
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                # Flask app + ML model
│   ├── app.py              # Flask server entry point
│   ├── model/              # ML scripts + saved model
│   │   ├── train.py        # Script to train & save your model
│   │   ├── model.pkl       # Saved trained model
│   │   └── utils.py        # (optional) helper functions
│   ├── requirements.txt    # Python dependencies
│   └── data/               # Your .csv file
│
├── electron/               # Electron main process
│   ├── main.js             # Electron main script
│   ├── preload.js          # (optional) Secure bridge
│
├── package.json            # Root Electron + Node config
└── README.md

v2 -
my-electron-app/
│
├── app/                          # Core application logic (Electron + Frontend)
│   ├── main/                     # Electron main process
│   │   ├── main.js
│   │   └── preload.js
│   │
│   ├── renderer/                 # Frontend (React + Vite)
│   │   ├── components/
│   │   │   └── Hero.jsx
│   │   ├── renderer.jsx
│   │   ├── index.css
│   │   └── index.html
│   │
│   └── vite.config.js            # Vite config for renderer
│
├── backend/                      # Flask backend
│   ├── app.py                    # Flask entry point
│   ├── socket_handlers.py        # Socket event handlers (modular)
│   ├── model/                    # ML models or logic
│   │   └── model.pkl
│   ├── data/
│   ├── requirements.txt
│   └── __init__.py
│
├── scripts/                      # Helper scripts
│   └── start-backend.sh          # Launch Flask backend
│
├── electron.config.js            # Forge or Builder config
├── package.json                  # Dependencies
├── .nvmrc
├── README.md
├── LICENSE
├── myLearningCurve.md
└── .gitignore
```

- alt codes for documentation.
```bash
alt 179 │
alt 195 ├
alt 192 └
alt 196 ─
alt 16 ►
```

## 4. flask - youtube

[build a meme Python website (Flask Tutorial for Beginners)](https://youtu.be/5aYpkLfkgRE?si=9Tq1ROfmpImBJTHE) - basic

[Flask Documentation](https://flask.palletsprojects.com/en/stable/installation/#install-flask) - nice

- `py -3 -m venv .venv` - create virtual env
- `source .venv/Scripts/activate` - activate venv (for bash)
- `pip install flask`
- `flask --app hello run --debug` - app name hello.py and debug mode is on.
- using `escape()` will prevent from taking scripts as inputs.
    ```python
    from markupsafe import escape

    @app.route("/<name>")   #routing and using <name> variable
    def hello(name):
        return f"Hello, {escape(name)}!"

    @app.route('/post/<int:post_id>')   #id is integer
    def show_post(post_id):
        return f'Post {post_id}'

    @app.route('/path/<path:subpath>')  # show the subpath after /path/
    def show_subpath(subpath):
        return f'Subpath {escape(subpath)}'
    ```

- HTTP routing
    ```python
    from flask import request

    @app.route('/login', methods=['GET', 'POST'])
    def login():
        if request.method == 'POST':
            return do_the_login()
        else:
            return show_the_login_form()
    ```
    or

    ```python
    @app.get('/login')
    def login_get():
        return show_the_login_form()

    @app.post('/login')
    def login_post():
        return do_the_login()
    ```

[Python Flask Web Development Tutorial in Hindi](https://youtu.be/oA8brF3w5XQ?si=JrtBQRVBHq6_Mz_2)

- `pip install virtualenv`
- `virtualenv env` - create virtual environment
- `set-ExecutionPolicy unrestricted` - if scripts are not executing(in powershell)
- `.\env\Scripts\activate.ps1` - activate virtual environment
- `pip install flask` - python lib, installed in this env

[Complete Python Flask Tutorial For Data Science Projects In Hindi](https://youtu.be/KF-rDqQfqz0?si=izQttL0PmKZvp1gm)

[article - Integrating Python Flask Backend with Electron (Nodejs) Frontend](https://medium.com/red-buffer/integrating-python-flask-backend-with-electron-nodejs-frontend-8ac621d13f72)

## Others
- do data pre processing before splitting.


## steps to setup virtual environment
- `python -m venv .venv`
- `source .venv/scripts/activate`
- `(.venv)` - if you see this, means activated.
- `pip list` - to check what packages you have in venv
- `pip install flask` - install whatever
- recheck with `pip list`
- `pip freeze > requirements.txt` - writes all the packages in this file

## IMPORTANT
- gpt
    ```md
    Tip:
    Also, if your Flask app requires model.pkl or other files, make sure to include them in your app.py like this:

    ```python
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    MODEL_PATH = os.path.join(BASE_DIR, 'model', 'model.pkl')
    ```
    And ensure the model folder is also bundled using the --add-data flag if needed:

    ```bash
    pyinstaller --onefile --add-data "model/model.pkl;model" app.py
    ```
    run spec file
    ```bash
    pyinstaller app.spec
    ```
    ```
    - ```bash
    pyinstaller --onefile --hidden-import=flask_cors --hidden-import=sklearn --hidden-import=scipy._lib._uarray --hidden-import=scipy.sparse._csparsetools --add-data "model/model.pkl;model" app.py 
    ```
    - the error keeps poping up for a package not included so i did


    ```app.spec
    hiddenimports=[
        'sklearn.utils._cython_blas',
        'sklearn.utils._cython_utils',
        'sklearn.utils._weight_vector',
        'sklearn._loss',
        'sklearn._loss.loss',
        'sklearn._loss.loss_fast',
        'sklearn.linear_model._cd_fast',
        'sklearn.tree._utils',
        'sklearn.tree._tree',
        'sklearn.utils.sparsetools._graph_validation',
        'sklearn.utils.sparsetools._split',
        'sklearn.utils.sparsetools._validation',
        'scipy._lib.messagestream',
        'scipy.sparse._csparsetools',
        'scipy.sparse._index',
        'scipy.sparse._sparsetools',
        'scipy.sparse.csgraph._validation',
        'scipy.special._ufuncs_cxx',
        'scipy.linalg.cython_blas',
        'scipy.linalg.cython_lapack',
        'scipy._lib._ccallback_c',
        'scipy._lib._numpy_compat',
        'numpy.core._methods',
        'numpy.lib.format',
        'joblib.externals.loky.backend.popen_loky_win32',
        'joblib.externals.loky.backend.popen_loky_posix',
    ],
    ```
    app.spec keps getting overridden so here it goes
    ```
    # -*- mode: python ; coding: utf-8 -*-


    a = Analysis(
        ['app.py'],
        pathex=[],
        binaries=[],
        datas=[('model/model.pkl', 'model')],
        hiddenimports=[
            'sklearn.utils._cython_blas',
            'sklearn.utils._cython_utils',
            'sklearn.utils._weight_vector',
            'sklearn._loss',
            'sklearn._loss.loss',
            'sklearn._loss.loss_fast',
            'sklearn.linear_model._cd_fast',
            'sklearn.tree._utils',
            'sklearn.tree._tree',
            'sklearn.utils.sparsetools._graph_validation',
            'sklearn.utils.sparsetools._split',
            'sklearn.utils.sparsetools._validation',
            'scipy._lib.messagestream',
            'scipy.sparse._csparsetools',
            'scipy.sparse._index',
            'scipy.sparse._sparsetools',
            'scipy.sparse.csgraph._validation',
            'scipy.special._ufuncs_cxx',
            'scipy.linalg.cython_blas',
            'scipy.linalg.cython_lapack',
            'scipy._lib._ccallback_c',
            'scipy._lib._numpy_compat',
            'numpy.core._methods',
            'numpy.lib.format',
            'joblib.externals.loky.backend.popen_loky_win32',
            'joblib.externals.loky.backend.popen_loky_posix',
            'flask_cors',
            'sklearn',
            'scipy._lib._util',
            'scipy._lib',
            'scipy.sparse',
            'scipy.sparse._csparsetools',
            'scipy._cython_utility',
            'scipy._cyutility',
        ],
        hookspath=[],
        hooksconfig={},
        runtime_hooks=[],
        excludes=[],
        noarchive=False,
        optimize=0,
    )
    pyz = PYZ(a.pure)

    exe = EXE(
        pyz,
        a.scripts,
        a.binaries,
        a.datas,
        [],
        name='app',
        debug=False,
        bootloader_ignore_signals=False,
        strip=False,
        upx=True,
        upx_exclude=[],
        runtime_tmpdir=None,
        console=True,
        disable_windowed_traceback=False,
        argv_emulation=False,
        target_arch=None,
        codesign_identity=None,
        entitlements_file=None,
    )
    ```