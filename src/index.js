// react things
import React from 'react'
import ReactDOM from 'react-dom'

// app
import App from './App'
import Header from './components/header/Header'

// router
import { BrowserRouter as Router } from 'react-router-dom'

// redux state management
import { Provider } from 'react-redux'
import store from './redux/store'

// report web vitals
import reportWebVitals from './reportWebVitals'


ReactDOM.render(
  <React.StrictMode>
    {/*<Provider store={store}>*/}
      <Router>
        <Header/>
        <App/>
      </Router>
    {/*</Provider>*/}
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()