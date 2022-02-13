import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { component } from 'react';
import { getApps, initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { registerRootComponent } from 'expo';


function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />

    </Tab.Navigator>
  );
}
const store = createStore(rootReducer, applyMiddleware(thunk))
// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBd0fhDkhGV30FMB-1-Ltq4b6yM-_G8bSo",
  authDomain: "giverrapp-e1241.firebaseapp.com",
  projectId: "giverrapp-e1241",
  storageBucket: "giverrapp-e1241.appspot.com",
  messagingSenderId: "941802088292",
  appId: "1:941802088292:web:f1dc55003607251c8d7c71",
  measurementId: "G-72YEBJP808"
};

if (firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}


// Initialize Firebase


import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login';
import { Component } from 'react/cjs/react.production.min';
import MainScreen, { Main } from './components/Main'
import ProfileScreen, {Profile} from './components/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text> Loading </Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Landing">
            <Stack.Screen name = "Landing" component = {LandingScreen} options = {{ headerShown: false}}/>
            <Stack.Screen name = "Register" component = {RegisterScreen} options = {{ headerShown: false}}/>
            <Stack.Screen name = "Login" component = {LoginScreen} options = {{ headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
        
      );
    }


    return(
      <Provider store={store}>
        
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </Provider>
        
      
        
      )
    
  }
}
registerRootComponent(App);

export default App


/*

import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Home from './containers/Home';

const App = () => {
  return (
    <View style={styles.pageContainer}>
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default App;
*/