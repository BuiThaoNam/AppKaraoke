import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import ListScreen from './ListScreen.js';
import LyricScreen from './LyricScreen.js';

const KaraokeApp = createStackNavigator({
  List: {screen: ListScreen},
  Lyric: {screen: LyricScreen},
});
const KaraokeAppContainer = createAppContainer(KaraokeApp);

export default class App extends React.Component {
  render() {
    return <KaraokeAppContainer />;
  }
}