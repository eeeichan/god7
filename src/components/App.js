import React, { Component } from 'react';

//import UserInfoContainer from '../containers/UserInfoContainer'
import AuthContainer from '../containers/AuthContainer';
//import AppContainer from '../containers/AppContainer';
import { firebaseApp } from '../firebase';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from '../reducers/Auth';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const store = createStore(todoApp)


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: ""
    }
    console.log(this.props.match);
  }
  
  componentDidMount = () => {
    //console.log("store.." + store.getState().displayName);
    //this.handleClick();
  }

  handleClick = () => {
    console.log(store.getState());
  }

  render() {
    return (
      <div className="header-menu">
        <div className="ranking-space">
          <Link to="/ranking/"><p>ランキング</p></Link>
        </div>
        <div className="logo-space">
          <Link to="/"><h1>GOD7</h1></Link>
        </div>
        <div className="login-space">
          <AuthContainer />
        </div>
      </div>
    )
  }
}
