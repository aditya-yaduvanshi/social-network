import React from "react";
import Loader from "./components/Loader";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {connect} from "react-redux";

const Home = React.lazy(() =>
  import("./screens/Home")
    .then((Home) => Home)
    .catch((err) => console.log(err))
);
const Login = React.lazy(() =>
  import("./screens/Login")
    .then((Login) => Login)
    .catch((err) => console.log(err))
);
const Signup = React.lazy(() =>
  import("./screens/Signup")
    .then((Signup) => Signup)
    .catch((err) => console.log(err))
);
const ResetPass = React.lazy(() =>
  import("./screens/ResetPass")
    .then((ResetPass) => ResetPass)
    .catch((err) => console.log(err))
);
const Verification = React.lazy(() =>
  import("./screens/Verification")
    .then((Verification) => Verification)
    .catch((err) => console.log(err))
);

const Stack = createNativeStackNavigator();

class Main extends React.Component {
  render() {
    return (
      <>
        <NavigationContainer>
          <React.Suspense fallback={<Loader />}>
            <Stack.Navigator initialRouteName="Home">
              {!this.props.loggedin ? (
                <>
                  <Stack.Screen key="login" name="Login" component={Login} />
                  {!this.props.signedup ? (
                    <Stack.Screen
                      key="signup"
                      name="Signup"
                      component={Signup}
                    />
                  ) : (
                    <Stack.Screen
                      key="verify-account"
                      name="Account Verification"
                      component={Verification}
                    />
                  )}
                  {!this.props.verified ? (
                    <Stack.Screen
                      key="verify"
                      name="Verification"
                      component={Verification}
                    />
                  ) : (
                    <Stack.Screen key="login-account" name="Account Login" component={Login} />
                  )}
                  {!this.props.resetted ? (
                    <Stack.Screen
                      key="reset"
                      name="Reset Password"
                      component={ResetPass}
                    />
                  ) : (
                    <Stack.Screen key="resetted-login" name="Login to Account" component={Login} />
                  )}
                </>
              ) : (
                <>
                  <Stack.Screen key="home" name="Home" component={Home} />
                </>
              )}
            </Stack.Navigator>
          </React.Suspense>
        </NavigationContainer>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  loggedin: state.auth.loggedin,
  verified: state.auth.verified,
  signedup: state.auth.signedup,
  resetted: state.auth.resetted,
});

export default connect(mapStateToProps, {})(Main);
