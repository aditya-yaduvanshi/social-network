import React from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Loader from "../components/Loader";
import {sendOtp, verifyOtp} from "../redux/actions/otp";
import {connect} from "react-redux";
//import {Redirect, Link} from "react-router-native";

class Verification extends React.Component {
  state = {
    email: this.props.route.params ? this.props.route.params.email : "",
    otp: null,
  };

  setEmail(text) {
    this.setState({
      email: text,
    });
  }
  setOTP(text) {
    this.setState({
      otp: text,
    });
  }
  sendOTP(event) {
    event.preventDefault();
    this.props.sendOtp({
      email: this.state.email,
      type: "email-verification",
    });
  }
  verifyOTP(event) {
    event.preventDefault();
    this.props.verifyOtp({
      otp: this.state.otp,
      email: this.state.email,
      type: "email-verification",
    });
  }

  render() {
    if (this.props.loadingOTP) return <Loader />;
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.app}>SOCIO</Text>
          <View style={styles.view}>
            <Text style={styles.title}>Email Verification</Text>
            {!this.props.otpSent && !this.props.otpVerified && (
              <>
                <TextInput
                  style={styles.textInput}
                  placeholder="Email or Username."
                  onChangeText={this.setEmail.bind(this)}
                  value={this.state.email}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.sendOTP.bind(this)}
                >
                  <Text style={styles.buttonText}>Send OTP</Text>
                </TouchableOpacity>
              </>
            )}
            {this.props.otpSent && !this.props.otpVerified && (
              <>
                <TextInput
                  style={styles.textInput}
                  placeholder="Email or Username."
                  onChangeText={this.setEmail.bind(this)}
                  value={this.state.email}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirm OTP."
                  onChangeText={this.setOTP.bind(this)}
                  value={this.state.otp}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.verifyOTP.bind(this)}
                >
                  <Text style={styles.buttonText}>Verify OTP</Text>
                </TouchableOpacity>
              </>
            )}
            {/*<View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => this.props.navigation.navigate("Signup")}
              >
                <Text>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text>Account Login</Text>
              </TouchableOpacity>
            </View>*/}
            {this.props.authVerified && this.props.otpVerified
              ? Alert.alert(
                  "Verification Success",
                  "Your email is verified! Now you can login to your account.",
                  [
                    {
                      text: "Login to Account",
                      onPress: () => this.props.navigation.navigate("Login"),
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
    minWidth: "100%",
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

const mapStateToprops = (state) => ({
  otpSent: state.otp.sent,
  otpVerified: state.otp.verified,
  loadingOTP: state.otp.loading,
  authVerified: state.auth.verified,
});

export default connect(mapStateToprops, {sendOtp, verifyOtp})(Verification);
