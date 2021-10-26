import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScreenContainer } from 'react-native-screens';
import { StyleSheet, Text, View } from 'react-native';

//import Config from './app/config';
import Login from './app/screens/Login';

export default class App extends React.Component {
  render(){
    return (
      <>
        <ScreenContainer>
          <Text>SOCIO APP</Text>
          <View style={styles.container}>
            <Login/>
            <StatusBar style={{height: '20px', width: '100%', backgroundColor: 'red'}} />
          </View>
        </ScreenContainer>
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
