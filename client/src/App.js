import React, { Fragment } from 'react';
import './App.css';
import { store, createStore } from 'redux';
import { Route, Link } from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
require('dotenv').config();



const App = () => (
	<Fragment>
		<Route path="/" exact component={Login} />
		<Route path="/dashboard" component={Dashboard} />
	</Fragment>
);

export default App;
