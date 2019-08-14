import React, { Component } from 'react'

//import UserInfoContainer from '../containers/UserInfoContainer'
import AuthContainer from '../containers/AuthContainer'
//import AppContainer from '../containers/AppContainer';
import { firebaseApp } from '../firebase'

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import todoApp from '../reducers/Auth'
const store = createStore(todoApp)


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: ""
    }
  }
  
  componentDidMount = () => {
    console.log("update..");
    //console.log("store.." + store.getState().displayName);
    //this.handleClick();
  }

  handleClick = () => {
    console.log(store.getState());
    let userName = store.getState().displayName;
    this.setState({ displayName: userName});
  }

  render() {
    return (
      <Provider store={store}>
        <div className="login-space">
          <AuthContainer />
        </div>
      </Provider>
    )
  }
}
