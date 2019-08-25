import React from 'react';
import './App.css';

import Connect from './components/App';
import MainContents from './containers/MainContents';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/Auth';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MyPage from './components/MyPage';
import Ranking from './components/Ranking';
import AppMain from './containers/AppMain';

import thunk from 'redux-thunk';


const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
  window.STATE_FROM_SERVER
);



function App() {
  return (
    <AppMain store={store}/>
  );
}


export default App;
