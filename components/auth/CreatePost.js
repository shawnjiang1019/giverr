import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { component } from 'react';
import { getApps, initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { registerRootComponent } from 'expo';
import { Input, Icon } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { Component } from 'react';
//import firebase from 'react-native-firebase'
import uuid from 'uuid'

class CreatePost extends Component {
    state = {title: '', description: ''}
    onChangeTitle = title => {
        this.setState({ title })

    }
    onChangeDescription = description => {
        this.setState({ description })
    }

    onSubmit = async () => {
        
        const post = {
            title: this.state.title,
            description: this.state.description

        }
        this.props.firebase.uploadPost(post)

        this.setState({
            title: '',
            image: '',
        })

        
    }

    uploadPost = post => {
        let user = firebase.auth().currentUser
        const id = uuid.v4()
        const uploadData = {
            
            postTitle: post.title,
            postDescription: post.description,
            
        }
        return firebase
            .firestore()
            .collection('posts')
            .doc(id)
            .set(uploadData)
    }

    render(){
        return(
            <View>
                <Text>Post Details</Text>
                <Input
                    placeholder='Enter title of the post'
                    value= {this.state.title}
                    onChangeText = {title => this.onChangeTitle(title)}
                />
                 <Input
                    placeholder='Enter description'
                    
                    value={this.state.description}
                    onChangeText={description => this.onChangeDescription(description)}
                />
                <Button
                    status='success'
                    onPress={this.onSubmit}
                    disabled={
                    this.state.title && this.state.description
                        ? false
                        : true
                    }>
                    Add post
                </Button>
                
            </View>
        )
    }

}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(CreatePost); 
