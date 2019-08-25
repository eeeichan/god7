import React from 'react';
import '../App.css';
import PropTypes from 'prop-types'

import Connect from '../components/App';
import MainContents from './MainContents';

import { Provider } from 'react-redux';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MyPage from '../components/MyPage';
import Ranking from '../components/Ranking';
import { deflate } from 'zlib';


const AppMain = ({store}) => {
  return(
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="App-header">
            <Connect />
          </header>
          <Route exact path="/" 
            render={() => <MainContents data={store.getState()} /> } 
          />
          <Route path="/mypage"
            render={() => <MyPage data={store.getState()} /> } 
          />
          <Route path="/ranking" component={Ranking} />
        </div>
      </Router>
    </Provider>
  )
}

export default AppMain;