import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Logo1 from '../components/Logo1'

export default function TopBar() {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name="user" size={27} color="#5c5c5c" />
        </TouchableOpacity>
        <Logo1 />
        <TouchableOpacity>
          <FontAwesome name="send" size={27} color="#5c5c5c" />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet. create({
  container: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 35,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: '100%',
      height: '2%',
    },
    shadowOpacity: 0.12,
    shadowRadius: 5.46,
    elevation: 9,
  },
  button: {
      
  }
})