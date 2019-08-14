import React from 'react';

import App from '../components/App';

import firebase from 'firebase';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  console.log("AppContainer )" + state.auth.uid)
  return {
    uid: state.auth.uid,
    displayName: state.auth.displayName,
  }
}

const AppContainer = connect(
  mapStateToProps
)(App)

export default AppContainer
