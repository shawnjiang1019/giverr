import React, { Component } from 'react'
import { 
	View, 
	Animated,
	PanResponder,
	Dimensions,
	LayoutAnimation,
	UIManager,
    Text
} from 'react-native'
import firebase from 'firebase/compat/app'

import "firebase/firestore";
import { documentId, QuerySnapshot } from 'firebase/firestore';
const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../../../redux/actions/index'


export const array = []
export const dbArray = []
class Deck extends Component {
	
	static defaultProps = {
		onSwipeLeft: (item) => {
            firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .update({
                likedPosts: firebase.firestore.FieldValue.arrayUnion(item)
            })
			array.push(item)
			console.log(array)
        },
        
		onSwipeRight: () => {}
	}
	constructor(props) {
		super(props);

		const position = new Animated.ValueXY();
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {
				position.setValue({x: gesture.dx, y: gesture.dy});
			},
			onPanResponderRelease: (event, gesture) => {
				if (gesture.dx > SWIPE_THRESHOLD) {
					this.forceSwipe('right')
				} else if (gesture.dx < -SWIPE_THRESHOLD) {
					this.forceSwipe('left')
				} else {
					this.resetPosition();
				}
			}
		});

		this.state = { panResponder, position, index: 0 };
	}

    componentDidMount(){
        this.props.fetchUser();
    }

    componentDidUpdate(){
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
		LayoutAnimation.spring();
        firebase.firestore().collection('posts').get().then(querySnapshot => {
            console.log('Total posts: ', querySnapshot.size);
            querySnapshot.forEach(documentSnapshot => {
              console.log('Posts : ', documentSnapshot.data());
              
              posts.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id
              })
      
              console.log('Post titles: ', posts[0].title);
            });
          })
		  firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('likedPosts').get().then(querySnapshot => {
			console.log('Total posts: ', querySnapshot.size);
			querySnapshot.forEach(documentSnapshot => {
			  console.log('Liked Posts for reall this time : ', documentSnapshot.data());
			  
			  theseposts.push({
				...documentSnapshot.data(),
				key: documentSnapshot.id
			  })
	  
			  
	  
			  
			});
		  })
    }
    

	componentWillReceiveProps(nextProps) {
		if (nextProps.data != this.props.data) {
			this.setState({index: 0});
		}
	}



	forceSwipe(direction) {
		const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
		Animated.timing(this.state.position, {
			toValue: {x, y: 0},
			duration: SWIPE_OUT_DURATION
		}).start(() => this.onSwipeComplete(direction))
	}


	onSwipeComplete(direction) {
		const {onSwipeLeft, onSwipeRight, data} = this.props
		const item = data[this.state.index]
		direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)
		this.state.position.setValue({x: 0, y: 0})
		this.setState({ index: this.state.index + 1})

        
	}

	resetPosition() {
		Animated.spring(this.state.position, {
			toValue: {x: 0, y: 0}
		}).start();
	}

	getCardStyle() {
		const { position } = this.state;
		const rotate = position.x.interpolate({
			inputRange: [-SCREEN_WIDTH * 2.0, 0, SCREEN_WIDTH * 2.0],
			outputRange: ['-120deg', '0deg', '120deg']
		});

		return {
			...position.getLayout(),
			transform : [{rotate}]
		}
	}

	renderCards() {


		if (this.state.index >= this.props.data.length) {
			return this.props.renderNoMoreCards();
		}

        

		return this.props.data.map((item,i) => {
		if ( i < this.state.index) { return null; }

		if ( i == this.state.index) {
				return (
					<Animated.View 
						key={item.uid}
						style={[this.getCardStyle(), styles.cardStyle]}
						{...this.state.panResponder.panHandlers}
					>
						{this.props.renderCard(item)}
                        
					</Animated.View>
				);
		}
			return (
				<Animated.View 
				 	key={item.id} 
				 	style={[styles.cardStyle, { top: 5 * (i - this.state.index) }]}
					>
					{this.props.renderCard(item)}
                    
				</Animated.View>
				);
		}).reverse();
	}

	render() {
        const { currentUser } = this.props;
		return (
			<View>
				{this.renderCards()}
                
			</View>
		); 
	}
}

const styles = {
	cardStyle : {
		position: 'absolute',
		width: SCREEN_WIDTH,
		justifyContent: 'center'
	}
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
  })
  const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)
  
  export default connect(mapStateToProps, mapDispatchProps)(Deck); 

  