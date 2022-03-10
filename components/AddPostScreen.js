import React, { Component } from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from './components/Background';
import Logo from '../components/components/Logo'
import Header from '../components/components/Header'
import TextInput from '../components/components/TextInput'
//import BackButton from '../components/BackButton'
import { theme } from '../components/core/theme'
import Button from './components/Button';
import firebase from 'firebase/compat/app'
import "firebase/firestore";
import DropDownPicker from 'react-native-dropdown-picker';





export class AddPostScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
            Title: '',
            Description: '',
            Image_Link: '',
        }

        this.onSubmitPost = this.onSubmitPost.bind(this)

    }


    onSubmitPost(){
        const {Title, Description, Image_Link } = this.state;
        
        firebase
        .firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .add({
            
            Title: post,
            Description: title,
            Image_Link: time,


        })
    }

    render() {
        return (
            <Background>
            <Logo />
                <Header>Create Post</Header>
                <TextInput
                    placeholder="Title"
                    onChangeText={(Title) => this.setState({ Title })}
                />
                <TextInput
                    placeholder="Description"
                    onChangeText={(Description) => this.setState({ Description })}
                />
                <TextInput
                    placeholder="Image Link"
                    onChangeText={(Image_Link) => this.setState({ Image_Link })}
                />

                <Button
                    onPress={() => this.onSubmitPost()}
                    title="Create Post"
                    mode="contained"
                > Create </Button>

            
        </Background>
        )
        
    }

}

export default AddPostScreen
