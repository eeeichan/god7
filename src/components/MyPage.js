import React from 'react';
import '../App.css';

import { createStore } from 'redux';
import storeData from '../reducers/Auth';
import { data } from '../actions/Actions';

import authcontainer from '../containers/AuthContainer';

import firebase from 'firebase';
import { firebaseDb } from '../firebase/index';


//const store = createStore(storeData);

const users = firebaseDb.collection('users');

export default class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      name: "",
      image: "",
      game: "",
      streak: "",
      win: "",
      lose: ""
    }
  }

  componentWillMount() {
    this.firebaseGetData(this.props.data.uid);
  }


  firebaseGetData = (userId) => {
    let citiesRef = firebaseDb.collection('users');
    let query = citiesRef.where('uid', '==', userId).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const users = doc.data();
          //this.props.doStateSet(users);
          this.firestoreDataSet(users);
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  firestoreDataSet = (users) => {
      this.setState({
        name: users.name,
        uid: users.uid,
        image: users.image,
        game: users.game,
        streak: users.streak,
        win: users.win,
        lose: users.lose
      });
    this.setState({displayName: users.name});
    this.setState({image: users.image});
  }

  //console.log("mypage uid",uid);
  //console.log("mypage name",displayName);
    render(){
      return(
        <div className="mypage">
          <div className="mypage-top">
            <img src={this.state.image} width="70" height="70" />
            <h3>{this.state.name}</h3>
          </div>
          <ul>
            <DataSet user={this.state} />
          </ul>
        </div>
      );
    }
}

const DataSet = (user) => {
  return (
    <div>
      <li>game:{user.user.game}</li>
      <li>streak:{user.user.streak}</li>
      <li>win:{user.user.win}</li>
      <li>lose:{user.user.lose}</li>
    </div>
  );
}

