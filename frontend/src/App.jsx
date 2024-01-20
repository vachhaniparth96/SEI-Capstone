import './App.css'
import Nav from './components/Nav'
import Main from './components/Main'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className=' bg-slate-800'>
      <Toaster position="top-center" />
      <Nav />
      <div className="container">
      <Main />
      </div>
    </div>
  )
}

export default App
