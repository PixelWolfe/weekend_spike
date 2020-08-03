import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

//position
const setPosition = (state = [{id:0, name:'test', x:1, y:10, color:'green'},{id:1, name:'box2', x:50, y:100, color:'red'},{id:3, name:'id 3', x:1, y:10, color:'yellow'},{id:2, name:'I\'m also a test', x:50, y:100, color:'blue'}], action) => {
  switch (action.type) {
      case 'SET_POSITION':
          return action.payload;
      default:
          return state;
  }
}

const store = createStore(
  combineReducers({setPosition}), 
  applyMiddleware(logger));


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
