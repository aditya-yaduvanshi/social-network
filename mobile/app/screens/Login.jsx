import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import {login} from "../redux/actions/auth";
import {connect} from "react-redux";
//import { Redirect, Link } from "react-router-native";

import Loader from "../components/Loader";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  setEmail(text) {
    this.setState({
      email: text,
    });
  }
  setPassword(text) {
    this.setState({
      password: text,
    });
  }
  submitLogin(event) {
    event.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    });
  }

  render() {
    if (this.props.loading) return <Loader />;
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.app}>SOCIO</Text>
          <View style={styles.view}>
            <Text style={styles.title}>Account Login</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Email or Username."
              onChangeText={this.setEmail.bind(this)}
              value={this.state.email}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Password."
              onChangeText={this.setPassword.bind(this)}
              value={this.state.password}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.button}
              onPress={this.submitLogin.bind(this)}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            {/*<View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => this.props.navigation.navigate("Signup")}
              >
                <Text>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => this.props.navigation.navigate("Reset Password")}
              >
                <Text>Reset Password</Text>
              </TouchableOpacity>
            </View>*/}
            {this.props.signedup && !this.props.verified
              ? Alert.alert(
                  "Verification Required",
                  "Please verify your email to login to your account?",
                  [
                    {
                      text: "Verify Email",
                      onPress: () =>
                        this.props.navigation.navigate("Verification", {
                          itemId: "verify-email",
                          email: this.state.email
                        }),
                    },
                  ]
                )
              : null}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(245,245,245)",
    minWidth: "100%",
  },
  view: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  app: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgb(0,150,255)",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "black",
    margin: 5,
    width: "100%",
    maxWidth: "85%",
    minWidth: "85%",
    padding: 5,
    borderRadius: 3,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    maxWidth: "85%",
    minWidth: "85%",
    width: "100%",
  },
  button: {
    margin: 10,
    backgroundColor: "rgb(0,150,255)",
    color: "white",
    minWidth: "85%",
    maxWidth: "85%",
    width: "100%",
    borderRadius: 3,
  },
  button2: {
    backgroundColor: "rgb(225,225,225)",
    padding: 10,
    borderRadius: 3,
    borderColor: "transparent",
    borderWidth: 1,
  },
  buttonText: {
    minWidth: "85%",
    padding: 10,
    color: "white",
    textAlign: "center",
  },
});

const mapStateToProps = (state) => ({
  loggedin: state.auth.loggedin,
  loading: state.auth.loading,
  verified: state.auth.verified,
  signedup: state.auth.signedup,
});

export default connect(mapStateToProps, {login})(Login);
