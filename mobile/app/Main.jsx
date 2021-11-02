import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {connect} from "react-redux";
import Loader from "./components/Loader";

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
const Tab = createBottomTabNavigator();

class Main extends React.Component {
  render() {
    return (
      <>
        <NavigationContainer>
          <React.Suspense fallback={<Loader />}>
            <Tab.Navigator initialRouteName="Login">
              {!this.props.loggedin ? (
                <>
                  <Tab.Screen name="Login" component={Login} />
                  <Tab.Screen name="Signup" component={Signup} />
                  <Tab.Screen name="Verification" component={Verification} />
                  <Tab.Screen name="Reset Password" component={ResetPass} />
                </>
              ) : (
                <>
                  <Tab.Screen name="Home" component={Home} />
                </>
              )}
            </Tab.Navigator>
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
