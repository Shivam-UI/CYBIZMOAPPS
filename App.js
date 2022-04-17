import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StatusBar, Platform, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// desible yellow box
LogBox.ignoreLogs(['Warning: ...']);   // Ignore log notification by message
LogBox.ignoreAllLogs();  //Ignore all log notifications
import Router from './routes';

export default class App extends Component {

  render() {
    return (
      <NavigationContainer>
        <StatusBar backgroundColor={'#ffffff'} barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'} />
        <Router
          navigationBarStyle={{ backgroundColor: '#0000' }} />
      </NavigationContainer>
    );
  }
};