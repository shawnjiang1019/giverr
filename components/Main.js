/*import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Background2 from './components/Background2'
import Swipe from "../components/components/Swipe"
import TopBar from "./components/TopBar"


export class Main extends Component {
    render() {
        
        return(
            <Background2>
                <TopBar />
                <Swipe />
            </Background2>
            
        )
    }
}


export default (Main);


*/


import React, { Component, useState, useEffect } from 'react'
import { View, Text } from 'react-native'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserPosts } from '../redux/actions/index'
import { Profile } from './Profile'
import { createBottonTabNavigator} from '@react-navigation/bottom-tabs';
import firebase from 'firebase/compat/app'
import "firebase/firestore";
import Background2 from './components/Background2'
import Swipe from "../components/components/Swipe"
import TopBar from "./components/TopBar"
import { QuerySnapshot } from 'firebase/firestore'
import { async } from '@firebase/util'


function idk(){
    const [ allPosts, setPosts] = useState([])

    useEffect(() =>{
        fetchPosts();

    }, [])

    const fetchPosts=async()=>{
        const response = firebase.firestore().collection("posts")
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts");
        const data = await response.get();
        data.docs.forEach(item=>{
            setPosts([...allPosts,item.data()])
        })
    }

    return (
        <View>
      
        
          
            
                <Text>{allPosts.title}</Text>
                <Text>{allPosts.post}</Text>


            
              
            
          
        
      
    </View>
        
    );
}


export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
        
    }
    render() {
        const { currentUser, posts } = this.props;

        

       

        firebase
        .firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .get()
        .then((QuerySnapshot) => {
            QuerySnapshot.forEach(snapshot => {
                let data = snapshot.data();
                console.log(data);
            })
        })
            
        
        console.log(currentUser)
        if(currentUser == undefined){
            return(
                <View>Loading</View>
            )
        }

        
        return(
            <View>
                <Text>{currentUser.name} is logged in, {currentUser.email} is your email, your password is: {currentUser.password}</Text>
                <button onClick={() => firebase.auth()
                    .signOut()
                    .then(() => console.log('User signed out!'))}>Sign out</button>
                <Swipe />
                <idk/>
                

                
            </View>
            
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main); 

  