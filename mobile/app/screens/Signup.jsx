import React from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";

class Signup extends React.Component {
  state = {
    name: '',
    username: '',
    password: '',
    password2: '',
    loggedin: false
  }
  setName(text){
    this.setState({
      name: text
    })
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
  setPassword2(text){
    this.setState({
      password2: text
    })
  }
  submitSignup(){
    console.log(this.state)
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.app}>SOCIO</Text>
          <View style={styles.view}>
            <Text style={styles.title}>Create Account</Text>
            <TextInput 
              style={styles.textInput}
              textContentType="name"
              placeholder="Full Name."
              onChangeText={this.setName.bind(this)}
              value={this.state.name}
            />
            <TextInput 
              style={styles.textInput}
              placeholder="Email or Username."
              textContentType="emailAddress"
              onChangeText={this.setUsername.bind(this)}
              value={this.state.username}
            />
            <TextInput 
              style={styles.textInput}
              placeholder="Password."
              textContentType="newPassword"
              onChangeText={this.setPassword.bind(this)}
              value={this.state.password}
            />
            <TextInput 
              style={styles.textInput}
              placeholder="Confirm Password."
              textContentType="password"
              onChangeText={this.setPassword2.bind(this)}
              value={this.state.password2}
            />
            <TouchableOpacity 
              style={styles.button}
              onPress={this.submitSignup.bind(this)}
            > 
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => this.props.navigation.navigate("login")}
              >
                <Text>Login to Account</Text>
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

export default Signup;
