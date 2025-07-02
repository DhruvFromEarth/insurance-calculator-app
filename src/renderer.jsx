import ReactDOM from 'react-dom/client'
import Hero from './components/Hero.jsx'

function App() {
  return (<>
    <h1>Hello from React inside Electron!</h1>
    <Hero />
  </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);