import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Linking } from 'react-native';
import Deck from './swipeStuff/containers/Deck';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'
import firebase from 'firebase/compat/app'
import "firebase/firestore";
import { documentId, QuerySnapshot } from 'firebase/firestore';
import Background from './components/Background2';


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


const posts = []

export class Matches extends Component {
 

  renderCard(item) {
    
    return (
      <Background>
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
      <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
      </Background>
      );
  }

  renderNoMoreCards() {
    return (
      <Background>
<        Card title="All Done!!">
        <Text style = {{marginBottom : 10}}>
          You're All Caught Up !!

        </Text>
        
      </Card>
      <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
      </Background>
      
      );
  }

  render() {
    firebase.firestore().collection('posts').get().then(querySnapshot => {
      console.log('Total posts: ', querySnapshot.size);
      querySnapshot.forEach(documentSnapshot => {
        console.log('Posts : ', documentSnapshot.data());
        
        posts.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id
        })

        console.log('Post titles: ', posts[0].title);
      });
    })

    
    
    return (
      <Background>
        <Deck 
            data = {posts}
            renderCard = {this.renderCard} 
            renderNoMoreCards = {this.renderNoMoreCards}
        />
        
        
        
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 20,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Matches); 
