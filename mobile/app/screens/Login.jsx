import React from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";

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
    fetch(`http://192.168.43.39:5000/api/accounts/auth?email=${this.state.username}&password=${this.state.password}`, {
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
      return this.props.navigation.navigate("home")
    }
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.app}>SOCIO</Text>
          <View style={styles.view}>
            <Text style={styles.title}>Account Login</Text>
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
            <TouchableOpacity 
              style={styles.button}
              onPress={this.submitLogin.bind(this)}
            > 
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => this.props.navigation.navigate("signup")}
              >
                <Text>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => alert("reset")}
              >
                <Text>Reset Password</Text>
              </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(245,245,245)',
    minWidth: '100%',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '100%'
  },
  app: {
    position: 'absolute',
    top: 100,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(0,150,255)'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'black',
    margin: 5,
    width: '100%',
    minWidth: '85%',
    padding: 5,
    borderRadius: 3
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    minWidth: '85%' 
  },
  button: {
    margin: 10,
    backgroundColor: 'rgb(0,150,255)',
    color: 'white',
    minWidth: '85%',
    borderRadius: 3,
  },
  button2: {
    backgroundColor: 'rgb(225,225,225)',
    padding: 10,
    borderRadius: 3,
    borderColor: 'transparent',
    borderWidth: 1
  },
  buttonText: {
    minWidth: '85%',
    padding: 10,
    color: 'white',
    textAlign: 'center',
  },
})

export default Login;
