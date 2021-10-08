import React from "react"
import { 
  BrowserRouter, 
  Route, 
  Switch 
} from "react-router-dom"
import Nav from "./utils-components/nav/Nav"
import SideBar from "./utils-components/side-bar/SideBar"
import Home from "./main-app/home/Home"

const Signup = React.lazy(() => 
  import('./accounts/containers/user-auth/Signup')
  .then(Signup => Signup)
  .catch(err => console.log(err))
)

const Login = React.lazy(() => 
  import('./accounts/containers/user-auth/Login')
  .then(Login => Login)
  .catch(err => console.log(err))
)

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Nav/>
        </header>
        <main className="App-main">
          <div className="App-main-sidebar">
            <SideBar/>
          </div>
          <div className="App-main-container">
            <React.Suspense fallback={<h1>Loading ...</h1>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
              </Switch>
            </React.Suspense>
          </div>
        </main>
        <footer className="App-footer">
          footer
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default App
