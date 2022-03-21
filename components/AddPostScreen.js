import React, { Component } from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from './components/Background';
import Logo from '../components/components/Logo'
import Header from '../components/components/Header'
import TextInput from '../components/components/TextInput'
//import BackButton from '../components/BackButton'
import { theme } from '../components/core/theme'
import Button from './components/Button';
import firebase from 'firebase/compat/app'
import "firebase/firestore";
import DropDownPicker from 'react-native-dropdown-picker';
import { user } from '../redux/reducers/user';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'




export class AddPostScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
            post: '',
            title: '',
            time: '',
            website: '',
            user:'',
            isOrg:'',
            imageLink: ''
        }

        this.onSubmitPost = this.onSubmitPost.bind(this)

    }

    componentDidMount(){
        this.props.fetchUser();
      }


    onSubmitPost(){
        const {post, title, time, website, user, imageLink } = this.state;
        
        firebase
        .firestore()
        .collection('posts')
        .add({
            
            post: post,
            title: title,
            time: time,
            website: website,
            user: firebase.auth().currentUser.uid,
            imageLink: imageLink
        })

        firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('myPosts')
        .add({
            post: post,
            title: title,
            time: time,
            website: website,
            imageLink: imageLink

        })
    }

    
    render() {

        const { currentUser } = this.props;

        if (firebase.auth().currentUser.isOrg === "false"){
            return(
                <View><Text>Create an organization account to post</Text></View>
            )
        }
        else{
            return (
            <Background>
            <Logo />
                <Header>Create Post</Header>
                <TextInput
                    placeholder="Title"
                    onChangeText={(title) => this.setState({ title })}
                />

                <TextInput
                    placeholder="Caption"
                    onChangeText={(post) => this.setState({ post })}
                />
                
                <TextInput
                    placeholder="Input Image URL"
                    onChangeText={(imageLink) => this.setState({ imageLink })}
                />

                <TextInput
                    placeholder="Input SimplyK URL"
                    onChangeText={(website) => this.setState({ website })}
                />

                

                <Button
                    onPress={() => {this.onSubmitPost(); this.props.navigation.navigate('My Posts');}}
                    title="Create Post"
                    mode="contained"
                > Create </Button>

            
        </Background>
        )
        }
        
        
    }

}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(AddPostScreen); 