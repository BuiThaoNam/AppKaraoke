import Expo from 'expo';
import React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet, 
  TextInput,
  FlatList, 
  ListView, 
  Image, 
  Text, 
  View, 
  } from 'react-native';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode';

const styles = StyleSheet.create({
  like_buttons: {
    backgroundColor: '#ddd9', 
    borderRadius: 5, 
    borderWidth: 1,
    padding: 10,
    height: 80, 
    width: 80,  
  },
  like_images: {
    width: '100%',
    height: '100%',
  },
  text_input: {
    flex: 1,
    margin: 5, 
    height: 40, 
    padding: 5,
    fontSize: 17,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'coral',
    backgroundColor: 'white',
    marginHorizontal: 10,
    color: 'steelblue',
  },
  favorite_filter: {
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ''
  },
  favorite_image: {
    width: 35, 
    height: 35,
  },
});



export default class ListScreen extends React.Component {
  static navigationOptions = 
  {
    title: 'Songs List',
    headerStyle: {
      backgroundColor: 'crimson',
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 5,
    },
  }

  constructor(props) 
  {
    super(props);
    this.state = 
    {
      query: '',
      marked: new Object(),
      dataSource: [],
    }
    Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.PORTRAIT);
    AsyncStorage.getItem('Marked').then((item) => {this.setState({marked: JSON.parse(item)});});
    this.getData(this.state.query);

  }

  mark_as_favorited(track)
  {
    let marked = this.state.marked;
    if(marked.hasOwnProperty(track.track.track_id))
      delete marked[track.track.track_id];
    else
      marked[track.track.track_id] = track;
    this.setState({marked: marked});
    AsyncStorage.setItem('Marked', JSON.stringify(marked)).then(() => {});
    console.log(marked);
  }

  check_if_favorited(id)
  {
    return (this.state.marked != null && this.state.marked.hasOwnProperty(id));
  }

  filter_favorite()
  {
    if(this.state.marked != null)
      this.setState({dataSource: Object.values(this.state.marked)})
    else
      this.setState({dataSource: []})
  }

  show_list_data(item)
  {
    let marked = this.state.marked;
    const {navigate} = this.props.navigation
    
    return (
      <View>
        <View style = {{flexDirection: 'row', height: 90, paddingVertical: 5}}>
          <TouchableOpacity onPress={() => this.mark_as_favorited(item)}>
              <View style = {styles.like_buttons}>
                <Image style={styles.like_images} source={this.check_if_favorited(item.track.track_id) ? require('./img/favorited.png') : require('./img/not-favorited.png')} resizeMode={ImageResizeMode.contain}/>
              </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('Lyric', {track: item.track})}>
            <View style = {{flex:1, padding: 10, justifyContent: 'center'}}>
              <Text style = {{fontSize: 20, textAlign: 'left'}} numberOfLines={2}>{item.track.track_name}</Text>
              <Text style = {{fontSize: 15, textAlign: 'left', color: 'gray'}} numberOfLines={1}>{item.track.artist_name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      )
  }

  show_list_empty()
  {
    return (
    <View style={{height: 100, alignItems: 'center', justifyContent: 'center', marginTop: '50%'}}>
      <Text style={{fontSize: 25, fontStyle: 'italic', color: 'gray'}}>"the list is empty"</Text>
    </View>
    )
  }
  
  getData(query)
  {
    let root = 'http://api.musixmatch.com/ws/1.1/track.search?apikey=445d6196c08dc2b7490929f18149d684&f_has_lyrics=1&page_size=100&q=';
    let url = root + query;
    this.setState({query});
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({dataSource: responseJson.message.body.track_list,});
        console.log(responseJson.message.body.track_list);
        });
  } 

  render() 
  {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{flexDirection: 'row',  backgroundColor: 'hotpink',}}>
          <TextInput style={styles.text_input} value={this.state.query}  onChangeText={(query) => {this.getData(query);}}/>
          <View style={{width: 2, backgroundColor: 'pink', marginVertical: 5}}/>
          <TouchableWithoutFeedback onPress={() => this.filter_favorite()}>
            <View style={styles.favorite_filter}>
              <Image style={styles.favorite_image} source={require('./img/favorited.png')} resizeMode={ImageResizeMode.contain}/>
            </View>
          </TouchableWithoutFeedback>
        </View>
          <FlatList
          style = {{paddingHorizontal: 10,  flex:1}}
          data = {this.state.dataSource}
          renderItem={({ item }) => this.show_list_data(item)}
          ItemSeparatorComponent = {() => (<View style={{height: 1, backgroundColor: 'gray'}}/>)}
          ListHeaderComponent = {() => (<View style={{height: 1, backgroundColor: '#ffaa3c',}}/>)}
          ListEmptyComponent = {this.show_list_empty()}
        />
      </View>
    );
  }
}