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
import { ScrollView } from 'react-native-gesture-handler'

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOrg: true,
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
            location: '',
            Logo_Link: '',
            
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name, phone, website, address, cra, cause, location, service, Logo_Link, money, hear, isOrg} = this.state;
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
                location,
                Logo_Link,
                isOrg,
            })
            console.log(result)
        })        
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <ScrollView>

            
            <View style={styles.background}>
                <Header>Organization Registration</Header>
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
                <TextInput
                    placeholder="Website Link"
                    onChangeText={(website) => this.setState({ website })}
                />
                <TextInput
                    placeholder="Address"
                    onChangeText={(address) => this.setState({ address })}
                />
                <TextInput
                    placeholder="Location"
                    onChangeText={(location) => this.setState({ location })}
                />
                <TextInput
                    placeholder="CRA Number"
                    onChangeText={(cra) => this.setState({ cra })}
                />
                <TextInput
                    placeholder="What Is Your Main Purpose?"
                    onChangeText={(cause) => this.setState({ cause })}
                />
 
                <TextInput
                    placeholder="Do You Serve Out Of The FMWB Region?"
                    onChangeText={(service) => this.setState({ service })}
                />
                <TextInput
                    placeholder="Will The Donations Be Used In FMWB?"
                    onChangeText={(money) => this.setState({ money })}
                />
                <TextInput
                    placeholder="How Did You Hear About Us?"
                    onChangeText={(hear) => this.setState({ hear })}
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
            </View>
            
            </ScrollView>
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