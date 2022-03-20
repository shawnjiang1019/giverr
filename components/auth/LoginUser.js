import React, { Component } from 'react'
import { View } from 'react-native'
import Background from '../components/Background'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Logo from '../components/Logo'
import Header from '../components/Header'
import RegisterScreen from "./Register"

import { TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'



import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { ScreenContainer } from 'react-native-screens'

import firebase from 'firebase/compat/app'
import "firebase/firestore";

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',

        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) =>{
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

                <Header>User Login</Header>
                <TextInput
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <View style={styles.forgotPassword}>
                    <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
                
                        <Text style={styles.forgot}>Forgot your password?</Text>

                    </TouchableOpacity>
                </View>

                <Button onPress={() => this.onSignUp()} title="Login" mode="contained"> Login </Button>

                <View style={styles.row}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.link}>Register</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        )
    }
}

export default Login



const styles = StyleSheet.create({
    background: {
  
      backgroundColor: '#00314D'
    },
    forgotPassword: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
      color: 'orange'
    },
    forgot: {
      fontSize: 13,
      color: theme.colors.secondary,
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
  })
  