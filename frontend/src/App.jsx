import './App.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Main from './components/Main'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div>
      <Toaster position="top-center" />
      <Nav />
      <div className="container">
      <Main />
      </div>
      <Footer />
    </div>
  )
}

export default App
