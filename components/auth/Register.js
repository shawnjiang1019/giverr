import React, { Component } from 'react'
import { View, Picker } from 'react-native'

import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import Button from '../components/Button'
import firebase from 'firebase/compat/app'
import "firebase/firestore";

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            location: '',
            likedPosts: []
            

            
            
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name, location, likedPosts } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) =>{
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
                name,
                email,
                password,
                location,
                likedPosts
                
                
            })
            
            console.log(result)
        })        
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        
        return (
            <Background>
                <Logo />
                <Header>Create Account</Header>
                <Button title="RegisterOrg" mode="contained" onPress={() => this.props.navigation.navigate('RegisterOrg')}>Register An Organization</Button>
               <Button title="RegisterUser" mode="contained" onPress={() => this.props.navigation.navigate('RegisterUser')}>Register As A User </Button>

                <View style={styles.row}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        )
        
    }
}

export default Register


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },

  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})