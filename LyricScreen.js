import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View
  } from 'react-native';
import Dash from './Dash.js'

const styles = StyleSheet.create({
  text_track: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 2,
  },
  text_album: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 2,
  },
  text_artist: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 2,
  },
  text_lyrics: {
    color: '#eee',
    fontSize: 20,
    textAlign: 'center',
  },
  image_background: {
    flex:1, 
    padding: 20, 
    paddingTop: 0, 
    resizeMode: 'cover',
    flexDirection: 'column',
  },
});

export default class LyricScreen extends React.Component {
  static navigationOptions = 
  {
    title: 'Lyrics',
    headerTintColor: 'crimson',
    headerTitleStyle: {
      flexGrow:1,
      fontSize: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      paddingBottom: 5,
    },
    headerRight: <View/>
  }

  constructor(props)
  {
    super(props);
    this.state = {
      track: '',
      lyrics: '',
      count: -1,
      };
    setInterval(() => { this.on_interval() }, 125);
  }
  
  on_interval()
  {
    let count = this.state.count;
    if (count >= 0 && count < this.state.lyrics.length)
      count++;
    this.setState({ count });
  }

  getData(track)
  {
    let url = 'http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=445d6196c08dc2b7490929f18149d684&track_id=' + track.track_id;
    this.setState({ track });
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        var lyrics = responseJson.message.body.lyrics.lyrics_body;
        lyrics = lyrics.substring(0, lyrics.indexOf("*******"))
        this.setState({ lyrics });
        this.setState({ count: 0 });
        });
  }
  
  componentDidMount() 
  {
    this.getData(this.props.navigation.state.params.track);
  }

  show_dash()
  {
    return (<Dash style={{width:1, flexDirection:'column'}} dashThickness={2} dashLength={7} dashGap={3} dashColor='crimson'/>);
  }

  render() 
  {
    return (
      <ImageBackground style={styles.image_background} source={require('./img/background.jpg')}>
        <View style={{flexDirection: 'row', borderBottomWidth: 5, borderColor: 'crimson', backgroundColor: '#fff'}}>
          {this.show_dash()}
          <View style={{flex:1, padding: 10, paddingBottom: 15,}}>
            <Text style={styles.text_track}>{this.state.track.track_name}</Text>
            <Text style={styles.text_artist}>{this.state.track.artist_name}</Text>
            <Text style={styles.text_album}>Album: {this.state.track.album_name}</Text>
          </View>
          {this.show_dash()}
        </View>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItem: 'center', }}>
          <ScrollView style={{backgroundColor: '#3339', padding: 20, borderTopWidth: 1, borderColor: 'crimson'}}>
            <Text style={styles.text_lyrics}>
              <Text style={{color: 'coral'}}>{this.state.lyrics.substring(0, this.state.count)}</Text>
              {this.state.lyrics.substring(this.state.count, this.state.lyrics.length)}
            </Text>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}