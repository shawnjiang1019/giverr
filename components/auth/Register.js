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
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) =>{
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
                name,
                email,
                password,
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
                <Button title="Login" mode="contained"
                onPress={() => navigation.navigate("RegisterOrg")}>
                Register As A User </Button>
                <br/>
                <Button title="RegisterOrg" mode="contained"
                onclick="window.location='http://www.website.com';">
                Register An Organization </Button>

                <View style={styles.row}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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