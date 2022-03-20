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
import { user } from '../redux/reducers/user';





export class AddPostScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
            description: '',
            title: '',
            image: '',
            user:'',
            link: '',
        }

        this.onSubmitPost = this.onSubmitPost.bind(this)

    }


    onSubmitPost(){
        const {description, title, image, user, link} = this.state;
        
        firebase
        .firestore()
        .collection('posts')
        .add({
            
            description: description,
            title: title,
            image: image,
            link: link,
            user: firebase.auth().currentUser.uid



        })
    }

    render() {
        return (
            <Background>
            <Logo />
                <Header>Create Post</Header>
                <TextInput
                    placeholder="Title"
                    onChangeText={(title) => this.setState({ title })}
                />
                <TextInput
                    placeholder="Caption"
                    onChangeText={(description) => this.setState({ description })}
                />

                <TextInput
                    placeholder="Upload Image"
                    onChangeText={(image) => this.setState({ image })}
                />

                <TextInput
                    placeholder="SimplyK Donate Link"
                    onChangeText={(link) => this.setState({ link })}
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