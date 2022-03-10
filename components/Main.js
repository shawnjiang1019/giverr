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


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'
import { Profile } from './Profile'
import { createBottonTabNavigator} from '@react-navigation/bottom-tabs';
import firebase from 'firebase/compat/app'
import "firebase/firestore";
import Background2 from './components/Background2'
import Swipe from "../components/components/Swipe"
import TopBar from "./components/TopBar"



function idk(){
    const [ allPosts, setPosts] = useState([])

    useEffect(() =>{
        fetchPosts();

    }, [])

    const fetchPosts=async()=>{
        const response = firebase.firestore().collection("posts")
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts");
        const data = await response.get();
        data.docs.forEach(item=>{
            setPosts([...allPosts,item.data()])
        })
    }

    return (
        <View>
      
        
          
            
                <Text>{allPosts.title}</Text>
                <Text>{allPosts.post}</Text>


            
              
            
          
        
      
    </View>
        
    );
}
export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render() {
        const { currentUser } = this.props;
        console.log(currentUser)
        if(currentUser == undefined){
            return(
                <View>Loading</View>
            )
        }
        return(
            <View>
                <Swipe />
            </View>
            
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main); 

  