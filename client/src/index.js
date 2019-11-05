import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store, createStore, applyMiddleware } from 'redux';
import Reducer from './reducers';
import { BrowserRouter as Router } from 'react-router-dom'
import thunk from "redux-thunk";

ReactDOM.render(
    <Provider store={createStore(Reducer, applyMiddleware(thunk))}>
        <Router>
            <App />
        </Router>
    </Provider>
, document.getElementById('root'));
