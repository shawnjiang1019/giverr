import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  
} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from 'firebase/compat/app'
import "firebase/firestore";
import Background from './components/Background';
import Button from './components/Button'







export class Profile extends Component {
  constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
        }

    
    }
  componentDidMount(){
    this.props.fetchUser();
  }
  


  
  render() {
    const { currentUser } = this.props;
    
    return (
      <Background>
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
            <Text style={styles.name}>{currentUser.name}</Text>
            <Text></Text>
            <Text></Text>
            <Text style={styles.info}> Email: {currentUser.email}</Text>
              <Text style={styles.description}>Phone Number: {currentUser.phone}</Text>
              <Text></Text>
            <Text></Text>
            <Text></Text>

              
              

              
  
              <Button onPress ={() => firebase.auth().signOut()} title="SignOut" mode="contained" style={styles.name}>Sign Out</Button>
              
              
            </View>
        </View>
      </View>
      </Background>
    );
  }
}
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Profile); 


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00314D",
    height:200,
  },
  heading: {
    fontSize:25,
    color:"orange",
    fontWeight:'500',
    textAlign: 'left'
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:30,
    color:"#FFFFFF",
    fontWeight:'700',
    textAlign: 'center'
  },
  body:{
    marginTop:65,
  },
  bodyContent: {
    flex: 1,
    padding:30,
  },
  info:{
    fontSize:20,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00314D",
  },
});