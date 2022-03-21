import React, { Component } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Image
} from "react-native";
import _ from "lodash";
import { ListItem, SearchBar, Avatar, Button, Card } from "react-native-elements";
import { getUsers, contains } from "./assets/data";
<<<<<<< Updated upstream
import firebase from 'firebase/compat/app'
import "firebase/firestore";
import { documentId, QuerySnapshot } from 'firebase/firestore';
=======
import Background from './components/Background2'
>>>>>>> Stashed changes

const DATA = [
  { id: 1, text: 'Project Name #1', uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png' },
  { id: 2, text: 'Project Name #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Project Name #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Project Name #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Project Name #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Project Name #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Project Name #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Project Name #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];




class MatchesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
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
    const postData = []

    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('likedPosts').get().then(querySnapshot => {
      console.log('Total posts: ', querySnapshot.size);
      querySnapshot.forEach(documentSnapshot => {
        console.log('Posts : ', documentSnapshot.data());
        
        postData.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id
        })
      });
    })

    
    return (
      <Background>
      <SafeAreaView>
        <StatusBar style="light-content" />
        <FlatList
          data={postData}
          renderItem={({ item }) => (
            <Card styles={{backgroundColor: "#00314D"}}>
          <Text style = {{marginBottom : 10, paddingBottom: 10, fontSize: 20, fontWeight: "bold", textAlign: "center"} }>
          {item.title}

        </Text>

        <Image 
                source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png'}} 
                style={{paddingRight: 10, height: 300 }} 
            />
        <Text style = {{marginBottom : 10, paddingTop: 10}}>
          <Text>{item.title}</Text>
        </Text>

        <Button
          
          backgroundColor="#03A9F4"
          title="Donate"
        />
      </Card>
          )}
          keyExtractor={(item) => item.email}
          ListFooterComponent={this.renderFooter}
        />
      </SafeAreaView>
      </Background>
    );
  }
}

export default MatchesPage;