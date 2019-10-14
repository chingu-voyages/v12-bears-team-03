import React, {Fragment} from 'react';
import './App.css'
import { store, createStore } from 'redux';
import { Route, Link } from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import Voyageboard from './components/dashboard/Voyageboard';
import Surveyboard from './components/dashboard/Surveyboard';

const App =()=>
	<Fragment>
		<div>ForSight</div>
		<Route path="/login" component={Login}/>
		<Route path="/dashboard" component= {Dashboard}/>
		<Route path="/survey" component={ Surveyboard }/>
		<Route path="/voyage" component=  { Voyageboard}/>
	</Fragment>
 
export default App;
