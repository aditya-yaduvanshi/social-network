import React from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Loader from "../components/Loader";
import {sendOtp, verifyOtp} from "../redux/actions/otp";
import {reset} from "../redux/actions/auth";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-native";

class ResetPass extends React.Component {
  state = {
    email: "",
    otp: null,
    password: "",
    password2: "",
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
  setPassword(text) {
    this.setState({
      password: text,
    });
  }
  setPassword2(text) {
    this.setState({
      password2: text,
    });
  }
  sendOTP(event) {
    event.preventDefault();
    this.props.sendOtp({
      email: this.state.email,
    });
  }
  verifyOTP(event) {
    event.preventDefault();
    this.props.verifyOtp({
      otp: this.state.otp,
      email: this.state.email,
    });
  }
  resetPass(event) {
    event.preventDefault();
    this.props.reset({
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    });
  }

  render() {
    if (this.props.loadingAuth || this.props.loadingOTP) return <Loader />;
    if(this.props.resetted) return <Redirect to="/login" />

    return (
      <>
        <View style={styles.container}>
          <Text style={styles.app}>SOCIO</Text>
          <View style={styles.view}>
            <Text style={styles.title}>Reset Password</Text>
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
            {this.props.otpSent && this.props.otpVerified && (
              <>
                <TextInput
                  style={styles.textInput}
                  placeholder="New Password."
                  onChangeText={this.setPassword.bind(this)}
                  value={this.state.password}
                  secureTextEntry
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirm Password."
                  onChangeText={this.setPassword2.bind(this)}
                  value={this.state.password2}
                  secureTextEntry
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.resetPass.bind(this)}
                >
                  <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
              </>
            )}
            <View style={styles.buttonGroup}>
              <Link
                style={styles.button2}
                to="/signup"
              >
                <Text>Create Account</Text>
              </Link>
              <Link
                style={styles.button2}
                to="/login"
              >
                <Text>Account Login</Text>
              </Link>
            </View>
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
  loadingAuth: state.auth.loading,
  loadingOTP: state.otp.loading,
  resetted: state.auth.resetted,
});

export default connect(mapStateToprops, {sendOtp, verifyOtp, reset})(ResetPass);
