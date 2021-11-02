import {StatusBar} from "expo-status-bar";
import React from "react";
import {StyleSheet, View} from "react-native";
import axios from "axios";
import {Nat, Switch, Route} from "react-router-native";
import Store from "./app/redux/store";
import {Provider} from "react-redux";

import Alert from "./app/components/Alert";
import ProRoute from "./app/components/ProRoute";
import Loader from "./app/components/Loader";

const Home = React.lazy(() =>
  import("./app/screens/Home")
    .then((Home) => Home)
    .catch((err) => console.log(err))
);
const Login = React.lazy(() =>
  import("./app/screens/Login")
    .then((Login) => Login)
    .catch((err) => console.log(err))
);
const Signup = React.lazy(() =>
  import("./app/screens/Signup")
    .then((Signup) => Signup)
    .catch((err) => console.log(err))
);
const ResetPass = React.lazy(() =>
  import("./app/screens/ResetPass")
    .then((ResetPass) => ResetPass)
    .catch((err) => console.log(err))
);
const Verification = React.lazy(() =>
  import("./app/screens/Verification")
    .then((Verification) => Verification)
    .catch((err) => console.log(err))
);

axios.defaults.baseURL = "http://192.168.151.39:5000/api/";
axios.defaults.headers = {};
axios.defaults.headers = {
  "Content-Type": "application/json",
};

export default class App extends React.Component {
  render() {
    return (
      <>
        <Provider store={Store}>
          <View style={styles.container}>
            <NativeRouter>
              <React.Suspense fallback={<Loader />}>
                <Switch>
                  <ProRoute exact path="/" component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/verify" component={Verification} />
                  <Route path="/reset" component={ResetPass} />
                  <Route component={Home} />
                </Switch>
              </React.Suspense>
            </NativeRouter>
            <Alert />
            <StatusBar
              style={{height: "20px", width: "100%", backgroundColor: "red"}}
            />
          </View>
        </Provider>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
