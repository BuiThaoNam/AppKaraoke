import Expo from 'expo';
import React from 'react';
import {
  Image, 
  Text, 
  View, 
  } from 'react-native';
  import * as firebase from 'firebase' ;
 
 var config = {
    apiKey: "AIzaSyDIZsCDGcvWgjveG4lgMIHXs4SxYXSdgSI",
    authDomain: "signup-71be5.firebaseapp.com",
    databaseURL: "https://signup-71be5.firebaseio.com",
    projectId: "signup-71be5",
    storageBucket: "signup-71be5.appspot.com",
    messagingSenderId: "203536763944"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default class SplashScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) 
  {
    super(props);
    setTimeout(() => { this.props.navigation.navigate('Auth');}, 1000);
    //Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.PORTRAIT);
  }

  render() 
  {
    return (
      <Image style={{flex:1, resizeMode: 'cover',}} source={require('./img/splash.jpg')}/>
    );
  }
}