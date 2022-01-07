import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'

export default function Landing({ navigation }) {
    return (
        <Background>
      <Logo />
      <Header>Giverr</Header>
      <Button
      
        mode="contained"
        title="Login"
        onPress={() => navigation.navigate("Login")}
      >
        Login
      </Button>

      <View>
      <Paragraph style={styles.text}>OR</Paragraph>
      </View>
      
      <Button
        title="Register"
        mode="outlined"
        onPress={() => navigation.navigate("Register")}
      >
        Register
      </Button>
      

    </Background>
    )
}





const styles = StyleSheet.create({
  background: {

    backgroundColor: 'grey'
  },
  text: {
    fontWeight: 'bold',
  },
})



