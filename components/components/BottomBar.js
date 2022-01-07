import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Background from '../components/Background'


export default function BottomBar({ handleLikePress, handlePassPress }) {
  return (
    
    <View style={styles.container}>
<TouchableOpacity style={styles.button} onPress={handlePassPress}>
<FontAwesome name="times" size={27} color="red"></FontAwesome>
</TouchableOpacity>

<TouchableOpacity style={styles.button}>
  <FontAwesome name="heart" size={27} color="green" onPress={handleLikePress}></FontAwesome>
</TouchableOpacity>
    </View>
 
  )
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,

  },

  button: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.46,
    elevation: 9,
  },
})

