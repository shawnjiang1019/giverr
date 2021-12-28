import React, { Component } from 'react'
import { View, Text } from 'react-native'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export class Profile extends Component{

    componentDidMount(){
        this.props.fetchUser();
    }
    render(){
        const { currentUser } = this.props;
        return(
            <View>
                <Text> { currentUser.name }</Text>
            </View>
        )
    }
    
}