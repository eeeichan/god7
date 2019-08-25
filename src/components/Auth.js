import React, { Component } from 'react';
import firebase from 'firebase';
import {firebaseDb} from '../firebase/index';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const users = firebaseDb.collection('users');


export default class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      displayName: ""
    }
  }

  async componentDidMount() {
    //console.log(this.props);
    this.props.refLogin();
    firebase.auth().onAuthStateChanged(user => {
      //console.log("onAuth", user);
      if (user) {
        this.setState({ displayName: user.displayName });
      } else {
        this.setState({ displayName: "" });
      }
    });
  }

  handleFirestore = (result) => {
  let citiesRef = firebaseDb.collection('users');
  let query = citiesRef.where('uid', '==', result.user.uid).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        //Firestoreに新規登録
        console.log("result", result);
        console.log("snap",snapshot);
        users.add({
          "uid": result.user.uid,
          "name": result.user.displayName,
          "image": result.user.photoURL,
          "game": 0,
          "streak": 0,
          "win": 0,
          "lose": 0,
        });
        return;
      }
  
      snapshot.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        const users = doc.data();
        //console.log(users);
        // Reduxに突っ込む処理
        this.props.doStateSet(users);
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  }


  handleClick = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
          //console.log(result);
          console.log("Login Done");
          this.setState({ displayName: result.user.displayName });
          this.handleFirestore(result);
        }).catch((error) => {
          console.log(error);
        });
  }
  logout = () => {
    firebase.auth().signOut().then(result => {
      //console.log(result);
      console.log("Logout Done");
      this.setState({ displayName: "" });
    }).catch(error => {
      console.log(error);
    });
  }
  render() {
    const userName = this.state.displayName;
    return(
      <div>
        {userName == "" ? 
          <button onClick={(e) => this.handleClick(e)}>Twitter<br />ログイン</button> : <p><Link to="/mypage/">Player:{userName}</Link><br /><button onClick={this.logout}>ログアウト</button></p>}
      </div>
    )
  }
}
