import React, { Component } from 'react'
import { View, Text } from 'react-native'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'
import { Profile } from './main/Profile'
import { createBottonTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottonTabNavigator();

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
            <Tab.Navigator>
                <Tab.Screen name="Profile" component={Profile} />
                
            </Tab.Navigator>
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main);