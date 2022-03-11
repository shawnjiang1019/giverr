//Fetch and save users
import firebase from "firebase/compat/app"
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE } from "../constants/index"

export function fetchUser(){
    return((dispatch) => {
        firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) =>{
            if (snapshot.exists){
                console.log(snapshot.data())
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
            }
            else{
                console.log('does not exist')
            }
        })
    })
}

export function fetchUserPosts1() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("posts")
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .orderBy("creation", "desc")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: USER_POSTS_STATE_CHANGE, posts: snapshot.data() })
            })
    })
}

export function fetchUserPosts() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("posts")
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .orderBy("creation", "desc")
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                dispatch({ type: USER_POSTS_STATE_CHANGE, posts })
            })
    })
}

export async function getPosts(postsRetrieved){
    var postList = []
    var snapshot = await firebase
                            .firestore()
                            .collection("posts")
                            .orderBy("title")
                            .get()
    snapshot.forEach((doc) => {
        const postDoc = doc.data()
        postDoc.id = doc.id
        postList.push(postDoc)
    })
    postsRetrieved(postList)

    return postList;
}

