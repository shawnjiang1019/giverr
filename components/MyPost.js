import React, { Component, useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Image,
  Linking
} from "react-native";
import _ from "lodash";
import { ListItem, SearchBar, Avatar, Button, Card} from "react-native-elements";
import { getUsers, contains } from "./assets/data";
import firebase from 'firebase/compat/app'
import "firebase/firestore";
import { documentId, QuerySnapshot } from 'firebase/firestore';
import { likedPosts } from "./Matches";
import { array } from "./swipeStuff/containers/Deck"
import Background from "./components/Background2";

const DATA = [
  { id: 1, text: 'Project Name #1', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png' },
  { id: 2, text: 'Project Name #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Project Name #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Project Name #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Project Name #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Project Name #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Project Name #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Project Name #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
]


const theseposts = []

export class MyPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      random: 'some'
    };
  }

  shouldcomponentDidUpdate(){
    
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('myPosts').get().then(querySnapshot => {
      console.log('Total posts: ', querySnapshot.size);
      querySnapshot.forEach(documentSnapshot => {
        console.log('Liked Posts for reall this time : ', documentSnapshot.data());
        
        theseposts.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id
        })

        

        
      });
    })
    

  }

  componentDidMount() {
    
    this.makeRemoteRequest();
    this.setState({random: 'new'})
    
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('myPosts').get().then(querySnapshot => {
      console.log('Total posts: ', querySnapshot.size);
      querySnapshot.forEach(documentSnapshot => {
        console.log('Liked Posts for reall this time : ', documentSnapshot.data());
        
        theseposts.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id
        })

        

        
      });
    })
  }

  makeRemoteRequest = _.debounce(() => {
    this.setState({ loading: true });

    getUsers(20, this.state.query)
      .then((users) => {
        this.setState({
          loading: false,
          data: users,
          fullData: users,
        });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }, 250);

  handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const data = _.filter(this.state.fullData, (user) => {
      return contains(user, formattedQuery);
    });
    this.setState({ data, query: text }, () => this.makeRemoteRequest());
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%",
        }}
      />
    );
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={this.handleSearch}
        value={this.state.query}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  


  render() {
    
    
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('myPosts').get().then(querySnapshot => {
      console.log('Total posts: ', querySnapshot.size);
      querySnapshot.forEach(documentSnapshot => {
        console.log('Liked Posts for reall this time : ', documentSnapshot.data());
        
        theseposts.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id
        })

        

        
      });
    })

    this.componentDidUpdate
    
    

    
    return (
      
      <SafeAreaView>
        <Button
          
          backgroundColor="#03A9F4"
          title="Refresh"
          onPress={ ()=>{ firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('myPosts').get().then(querySnapshot => {
            console.log('Total posts: ', querySnapshot.size);
            querySnapshot.forEach(documentSnapshot => {
              console.log('Liked Posts for reall this time : ', documentSnapshot.data());
              
              theseposts.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id
              })
      
              
      
              
            });
          })}}
        />
     <Background>
        <FlatList
          data={theseposts}
          renderItem={({ item }) => (
            <Card>
          <Text style = {{marginBottom : 10, paddingBottom: 10, fontSize: 20, fontWeight: "bold", textAlign: "center"} }>
          {item.title}

        </Text>

        <Image 
                source={{uri: item.imageLink}} 
                style={{paddingRight: 10, height: 300 }} 
            />
        <Text style = {{marginBottom : 10, paddingTop: 10}}>
          {item.post}
        </Text>

        <Button
          
          backgroundColor="#03A9F4"
          title="Donate"
          onPress={ ()=>{ Linking.openURL(item.website)}}
        />
      </Card>
          )}
          keyExtractor={(item) => item.id}
          ListFooterComponent={this.renderFooter}
        />
        </Background>
      </SafeAreaView>
    );
  }
}

export default MyPost;