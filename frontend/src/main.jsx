import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './utilities/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App className="bg-slate-800"/>
    </Provider>
  </Router>,
)
