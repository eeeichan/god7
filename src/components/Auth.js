import React, { Component } from 'react';
import firebase from 'firebase';
import {firebaseDb} from '../firebase/index';
import authcontainer from '../containers/AuthContainer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from '../reducers/Auth';

const store = createStore(
  todoApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const users = firebaseDb.collection('users');


export default class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      displayName: "",
      users: []
    }
  }

  async componentDidMount() {
    console.log(this.props);
    this.props.refLogin();
    firebase.auth().onAuthStateChanged(user => {
      console.log("onAuth", user);
      this.setState({ displayName: user.displayName });
    });
  }

  handleFirestore = (result) => {
  let citiesRef = firebaseDb.collection('users');
  let query = citiesRef.where('uid', '==', result.user.uid).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        //Firestoreに新規登録
        users.add({
          "uid": result.user.uid,
          "name": result.user.displayName,
          "image": "",
          "game": 0,
          "streak": 0,
          "win": 0,
          "lose": 0,
        });
        return;
      }
  
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        // Reduxに突っ込む処理
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  }

  handleClick(e) {
    e.preventDefault();
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
          console.log(result);
          console.log("ログイン成功");
          this.setState({ displayName: result.user.displayName });
          this.handleFirestore(result);

        }).catch((error) => {
          console.log(error);
        });
  }
  logout = () => {
    firebase.auth().signOut().then(result => {
      console.log(result);
      this.setState({ displayName: "" });
    }).catch(error => {
        console.log(error);
    });
  }
  render() {
    const userName = this.state.displayName;
    return(
      <div>
        {userName == "" ? <button onClick={(e) => this.handleClick(e)}>Twitter Login</button> : <p>Player:{userName}<br /><button onClick={this.logout}>ログアウト</button></p>}
      </div>
    )
  }
}
