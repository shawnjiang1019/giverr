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
import Background from './components/Background2'




const posts = []

export class Matches extends Component {
 

  renderCard(item) {
    
    return (
      <Background>
      <Card style ={{paddingTop: 1}}>
          <Text style = {{marginBottom : 10, paddingBottom: 10, fontSize: 20, fontWeight: "bold", textAlign: "center"} }>
          {item.title}

        </Text>


        <Image 
                source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png'}} 
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
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      </Background>
      );
  }

  renderNoMoreCards() {
    return (
      <Background> 
        <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>     
        <Text style = {{marginBottom : 10, textAlign: 'center', alignItems: 'center', fontSize: '30', fontWeight: '700', color: 'white'}}>
          You're All Caught Up !!
        </Text>
        <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
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
      <View style={styles.container}>
        <Deck 
            data = {posts}
            renderCard = {this.renderCard} 
            renderNoMoreCards = {this.renderNoMoreCards}
        />
        
        
      </View>
      </Background>
      
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00314D',
    marginTop: 20,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Matches); 
