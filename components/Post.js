import React, { Component, useState, useEffect } from 'react'
import { View, Text } from 'react-native'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser, fetchUserPosts, getPosts } from '../redux/actions/index'
import { Profile } from './Profile'
import { createBottonTabNavigator} from '@react-navigation/bottom-tabs';
import firebase from 'firebase/compat/app'
import "firebase/firestore";
import Background2 from './components/Background2'
import Swipe from "./components/Swipe"
import TopBar from "./components/TopBar"
import { QuerySnapshot } from 'firebase/firestore'
import { async } from '@firebase/util'

/*
export default function PostList({ navigation }){
    
    const [postList, setPostList] = useState()


    useEffect(()=> {
        getData()
    })

    function getData(){
        getPosts(postsRetrieved)
    }

    function postsRetrieved(postList){
        setPostList(postList)
    }


    return (
        <View style={styles.content}>
                     <FlatList style={styles.flatList}
                        data = {postList}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => 
                        <ListItem item={item}
    /> }
                        />
            
        </View>
    )
}

*/





function Post(props){
    const [posts, setPosts] = useState([]);

}



const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    
    posts: store.usersState.posts,


})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUserPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Post);