import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens/index';

registerScreens();

export default class App extends Component {
  
    constructor(props){
      super(props)
      this.startApp();
      global.defaultSettings = require("./src/assets/default-settings.json");
    }
  
    startApp(){
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'app.HomeScreen', 
          title: 'Welcome', 
          navigatorStyle: {
            drawUnderNavBar: true,
            navBarTranslucent: true,
            navBarTextColor: '#fff',
            navBarButtonColor: '#fff'
          }, 
          navigatorButtons: {} 
        },
      });
    }
}
