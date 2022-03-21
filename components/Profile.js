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
      
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              
              <Text style={styles.info}>UX Designer / Mobile developer</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
              <Text style={styles.name}>Location: {currentUser.name}</Text>
              

              
              <TouchableOpacity style={styles.buttonContainer} onPress ={() => firebase.auth().signOut()} title="SignOut" mode="contained">
              <Text style={styles.name}>{currentUser.name}</Text>
                
              </TouchableOpacity>
              <Text >{currentUser.name}</Text>
              <TouchableOpacity><Text style={styles.name}>{currentUser.name}</Text></TouchableOpacity>
              
            </View>
        </View>
      </View>
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
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
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
