import React from "react";
import {View, Text, TextInput, StyleSheet, Button, Pressable} from "react-native";

class Login extends React.Component {
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
  submitLogin(){
    fetch(`http://192.168.168.39:5000/api/accounts/auth?email=${this.state.username}&password=${this.state.password}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(result => {
      console.log(result)
      if(result.access){
        this.setState({
          loggedin: true
        })
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    if(this.state.loggedin){
      return <Text>You are loggedin</Text>
    }
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
            title="Login"
            style={styles.button}
            onPress={this.submitLogin.bind(this)}
          > 
            <Text>Login</Text> 
          </Pressable>
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
    padding: 5
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'black',
    margin: 5,
    width: '100%',
    padding: 5,
    borderRadius: 3
  },
  button: {
    margin: 10,
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'blue',
    color: 'white',
    padding: 5,
    borderRadius: 3
  },
})

export default Login;
