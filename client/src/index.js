import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store, createStore } from 'redux';
import Reducer from './reducers';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
<Provider store = { createStore(Reducer) }> 
	<Router>
        <App />
    </Router>
</Provider>
, document.getElementById('root'));
