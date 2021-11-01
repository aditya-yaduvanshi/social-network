import {StatusBar} from "expo-status-bar";
import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import axios from "axios";

import Store from "./app/redux/store";
import {Provider} from "react-redux";

import Home from "./app/screens/Home";
import Loader from "./app/components/Loader";

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

axios.defaults.baseURL = "http://192.168.177.39:5000/api/";
axios.defaults.headers = {};
axios.defaults.headers = {
  "Content-Type": "application/json",
};

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <>
        <Provider store={Store}>
          <NavigationContainer>
            <View style={styles.container}>
              <React.Suspense fallback={<Loader />}>
                <Stack.Navigator initialRouteName="home">
                  <Stack.Screen name="login" component={Login} />
                  <Stack.Screen name="signup" component={Signup} />
                  <Stack.Screen
                    name="reset-password"
                    component={ResetPass}
                  />
                  <Stack.Screen
                    name="verification"
                    component={Verification}
                  />
                  <Stack.Screen name="home" component={Home} />
                </Stack.Navigator>
              </React.Suspense>
              <StatusBar
                style={{height: "20px", width: "100%", backgroundColor: "red"}}
              />
            </View>
          </NavigationContainer>
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
