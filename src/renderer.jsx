import ReactDOM from 'react-dom/client'
import Hero from './components/Hero.jsx'
import './index.css'

function App() {
  return (<>
    <h1>Insurance Calculator</h1>
    <Hero />
  </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);