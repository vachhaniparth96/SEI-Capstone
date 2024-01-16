import './App.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Main from './components/Main'

function App() {
  return (
    <div>
      <Nav />
      <div className="container">
      <Main />
      </div>
      <Footer />
    </div>
  )
}

export default App
