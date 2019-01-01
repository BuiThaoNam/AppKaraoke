import React from 'react';
//import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-naviagation';
//import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-naviagation';
import {createAppContainer, createStackNavigator,createSwitchNavigator } from 'react-navigation'
import ListScreen from './ListScreen.js';
import LyricScreen from './LyricScreen.js';
import SplashScreen from './SplashScreen.js';

import Login from './Components/Login'
import Main from './Components/Main'
import Loading from './Components/Loading'
import SignUp from './Components/SignUp'

  

const KaraokeStack = createStackNavigator(
{
  List: {screen: ListScreen},
  Lyric: {screen: LyricScreen},
});



const LogInStack = createStackNavigator(
{
  Log: {screen: Login},
  Sign: {screen: SignUp},
});


const KaraokeAppContainer = createAppContainer(createSwitchNavigator(
  {
    Intro: SplashScreen,
    Auth: LogInStack,
    Karaoke: KaraokeStack,
  },));

export default class App extends React.Component {
  render() {
    return <KaraokeAppContainer />;
  }
}