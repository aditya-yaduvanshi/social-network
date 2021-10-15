// react things
import React from "react";
import {Route, Switch} from "react-router-dom";

// index page or home page
import Home from "./pages/home/Home";
import "./App.scss";
// authentication pages
const Signup = React.lazy(() =>
  import("./pages/signup/Signup")
    .then((Signup) => Signup)
    .catch((err) => console.log(err))
);
const Login = React.lazy(() =>
  import("./pages/login/Login")
    .then((Login) => Login)
    .catch((err) => console.log(err))
);
// not found
const NotFound = React.lazy(() =>
  import("./components/not-found/NotFound")
    .then((NotFound) => NotFound)
    .catch((err) => console.log(err))
);

class App extends React.Component {
  render() {
    return (
      <>
        <main className="App container">
          <React.Suspense fallback={"Loading please wait ..."}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route component={NotFound} />
            </Switch>
          </React.Suspense>
        </main>
      </>
    );
  }
}

export default App;
