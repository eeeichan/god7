import * as React from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';

import Auth from '../components/Auth';
import { loginOk, data } from '../actions/Actions';


const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doStateSet: (user) => {
        dispatch(data(user))
    },
    doLogin: () => {
      let provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    refLogin: () => {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          return
        }
        dispatch(loginOk(user))
      })
    }
  }
}

const AuthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)

export default AuthContainer
