import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import Config from './app/config';
import Login from './app/screens/Login';
import Signup from './app/screens/Signup';
import Home from './app/screens/Home';

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  render(){
    return (
      <>
        <NavigationContainer>
          <View style={styles.container}>
            <Text>SOCIO APP</Text>
            <Stack.Navigator initialRouteName="home">
              <Stack.Screen name="login" component={Login} options={{title: "Home"}}/>
              <Stack.Screen name="signup" component={Signup}/>
              <Stack.Screen name="home" component={Home}/>
            </Stack.Navigator>
            <Login/>
            <StatusBar style={{height: '20px', width: '100%', backgroundColor: 'red'}} />
          </View>
        </NavigationContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
