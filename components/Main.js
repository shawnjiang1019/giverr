/*import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Background2 from './components/Background2'
import Swipe from "../components/components/Swipe"
import TopBar from "./components/TopBar"


export class Main extends Component {
    render() {
        
        return(
            <Background2>
                <TopBar />
                <Swipe />
            </Background2>
            
        )
    }
}


export default (Main);


*/


import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'
import { Profile } from './main/Profile'
import { createBottonTabNavigator} from '@react-navigation/bottom-tabs';
import firebase from 'firebase/compat/app'
import "firebase/firestore";
import Button from './components/Button'


const Tab = createBottomTabNavigator();

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render() {
        const { currentUser } = this.props;
        console.log(currentUser)
        if(currentUser == undefined){
            return(
                <View></View>
            )
        }
        return(
            <View>
                {currentUser.name} is logged in, {currentUser.email} is your email, your password is: {currentUser.password}
                <Button onPress ={() => firebase.auth().signOut()} title="SignOut" mode="contained">Sign out</Button>
            </View>
            
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main); 

  