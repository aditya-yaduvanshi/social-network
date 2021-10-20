// react things
import React from "react";
import {Route, Switch} from "react-router-dom";

// index page or home page
import Home from "./pages/home/Home";
import "./App.scss";
import { connect } from "react-redux";
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
const Verification = React.lazy(() =>
  import("./pages/verification/Verification")
    .then((Verification) => Verification)
    .catch((err) => console.log(err))
);
const ResetPassword = React.lazy(() =>
  import("./pages/reset-password/ResetPassword")
    .then((ResetPassword) => ResetPassword)
    .catch((err) => console.log(err))
);

const Fetching = () => {
  return (
    <>
      <div className="fetch">
        <div className="fetch-indicator"></div>
      </div>
    </>
  )
}

class App extends React.Component {
  render() {
    return (
      <>
        <main className="App container">
          {(this.props.loadingAuth || this.props.loadingOTP ) && <Fetching/>}
          <React.Suspense fallback={Fetching}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/reset-password" component={ResetPassword}/>
              <Route path="/email-verification" component={Verification}/>
              <Route component={NotFound} />
            </Switch>
          </React.Suspense>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loadingAuth: state.auth.loading,
  loadingOTP: state.otp.loading
});

export default connect(mapStateToProps, {})(App);
