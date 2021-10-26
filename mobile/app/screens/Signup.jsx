import React from "react";
import {View, Text, TextInput, StyleSheet, Button, Pressable} from "react-native";

class Signup extends React.Component {
  state = {
    username: '',
    password: '',
    loggedin: false
  }

  setUsername(text){
    this.setState({
      username: text
    })
  }
  setPassword(text){
    this.setState({
      password: text
    })
  }
  submitSignup(){
    console.log(this.state)
  }

  render() {
    return (
      <>
        <View style={styles.view}>
          <Text>Socio Login</Text>
          <TextInput 
            style={styles.textInput}
            placeholder="Email or Username."
            onChangeText={this.setUsername.bind(this)}
            value={this.state.username}
          />
          <TextInput 
            style={styles.textInput}
            placeholder="Password."
            onChangeText={this.setPassword.bind(this)}
            value={this.state.password}
          />
          <Pressable 
            title="Signup"
            style={styles.button}
            onPress={this.submitSignup.bind(this)}
          > Login </Pressable>
          <Text>{this.state.username}</Text>
          <Text>{this.state.password}</Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5px'
  },
  textInput: {
    borderColor: 'black',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderBottomColor: 'black',
    margin: '5px',
    width: '100%',
    outline: 'none',
    padding: '5px',
    borderRadius: '3px'
  },
  button: {
    margin: '10px',
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'blue',
    color: 'white',
    padding: '5px',
    borderRadius: '3px'
  },
})

export default Signup;
