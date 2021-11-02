import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {connect} from "react-redux";

const Alert = ({alerts}) =>
  alerts != null &&
  alerts.length > 0 &&
  alerts.map((alert) => {
    return (
      <View
        key={alert.id}
        style={[
          styles.view,
          alert.type === "success" ? styles.success : styles.error,
        ]}
      >
        <Text style={styles.text}>{alert.msg}</Text>
      </View>
    );
  });

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    width: "100%",
    bottom: 50,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  success: {
    backgroundColor: "rgb(100,255,100)",
  },
  error: {
    backgroundColor: "rgb(255,100,100)",
  },
  text: {
    color: "black",
  },
});

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, {})(Alert);
