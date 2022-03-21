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

export class RegisterUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            phone: '',
            isOrg
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name, phone, isOrg } = this.state;
        this.state.isOrg = false
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) =>{
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
                name,
                email,
                password,
                phone,
                isOrg: false
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
                <TextInput
                    placeholder="Name"
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextInput
                    placeholder="Email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder="Phone Number"
                    onChangeText={(phone) => this.setState({ phone })}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />

                <Button
                    onPress={() => this.onSignUp()}
                    title="Sign Up"
                    mode="contained"
                > Register </Button>
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

export default RegisterUser


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