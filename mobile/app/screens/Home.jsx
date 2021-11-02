import React from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {logout} from "../redux/actions/auth";

class Home extends React.Component {
  render() {
    return (
      <>
        <View style={styles.view}>
          <Text style={styles.text}>Welcome! {this.props.user}</Text>
          {this.props.loggedin ? (
            <TouchableOpacity
              style={styles.button2}
              onPress={this.props.logout}
            >
              <Text>Log Out</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button2}
              onPress={() => this.props.navigation.navigate("login")}
            >
              <Text>Login To Continue</Text>
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
  },
  button2: {
    backgroundColor: "rgb(225,225,225)",
    padding: 10,
    borderRadius: 3,
    borderColor: "transparent",
    borderWidth: 1,
  },
});

const mapStateToProps = (state) => ({
  loggedin: state.auth.loggedin,
  user: state.auth.user
});

export default connect(mapStateToProps, {logout})(Home);
