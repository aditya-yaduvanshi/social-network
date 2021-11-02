import React from "react";
import {View, TextInput, StyleSheet} from "react-native";

class Input extends React.Component {
  render(){
    return (
      <>
        <View style={[styles.view, this.props.view.style]} {...this.props.view}>
          <TextInput
            style={[styles.TextInput, this.props.textInput.style]}
            {...this.props.textInput}
          />
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
  },
  inputText: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10
  },
});

export default Input;