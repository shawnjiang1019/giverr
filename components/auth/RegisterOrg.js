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
            phone: '',
            website: '',
            address: '',
            cra: '',
            cause: '',
            service: '',
            money: '',
            hear: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name, phone, website, address, cra, cause, service, money, hear, } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) =>{
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
                name,
                email,
                password,
                phone, 
                website, 
                address, 
                cra, 
                cause, 
                service, 
                money, 
                hear,
            })
            console.log(result)
        })        
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <View style={styles.background}>
                <Logo />
                <Header>Create Account</Header>
                <TextInput
                    placeholder="name"
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextInput
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder="phone number"
                    onChangeText={(phone) => this.setState({ phone })}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <TextInput
                    placeholder="website"
                    onChangeText={(website) => this.setState({ website })}
                />
                <TextInput
                    placeholder="address"
                    onChangeText={(address) => this.setState({ address })}
                />
                <TextInput
                    placeholder="CRA number"
                    onChangeText={(cra) => this.setState({ cra })}
                />

                <Picker selectedValue = {this.state.cause} onValueChange = {(cause) => this.setState({ cause })}>
                    <Picker.Item label = "Which Cause Do You Fall Under?" value = {null} />
                    <Picker.Item label = "List" value = "List" />
                    <Picker.Item label = "List1" value = "List1" />
                </Picker>
                <br/>
                <Picker selectedValue = {this.state.service} onValueChange = {(service) => this.setState({ service })}>
                    <Picker.Item label = "Do You Serve Outside the FMWB Region?" value = {null} />
                    <Picker.Item label = "Yes" value = "Yes" />
                    <Picker.Item label = "No" value = "No" />
                </Picker>
                <br/>
                <Picker selectedValue = {this.state.money} onValueChange = {(money) => this.setState({ money })}>
                    <Picker.Item label = "Does the Money Raised Stay Within the FMWB Region?" value = {null} />
                    <Picker.Item label = "Yes" value = "Yes" />
                    <Picker.Item label = "No" value = "No" />
                </Picker>
                <br/>
                <Picker selectedValue = {this.state.hear} onValueChange = {(hear) => this.setState({ hear })}>
                    <Picker.Item label = "How Did You Hear About Us?" value = {null} />
                    <Picker.Item label = "List" value = "List" />
                    <Picker.Item label = "List1" value = "List1" />
                </Picker>
                <Button
                    onPress={() => this.onSignUp()}
                    title="Sign Up"
                    mode="contained"
                > Register </Button>
            </View>
        )
    }
}

export default Register


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#00314D',
    padding: 20,
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center', },

  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
