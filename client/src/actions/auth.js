import React from 'react';
import axios from 'axios'
import { LOG_IN_SUCCEED, LOG_IN_FAILED } from './Types';

export const login = (email) => async dispatch=> {

	await axios
	.post("/api/auth/login", email)
	// if log in success, send user's sheet data
	.then(res=> dispatch({
			type: LOG_IN_SUCCEED,
			payload: res.data
		}))
	//if log in fail
	.catch(err=> {
		console.log(err.message);
		dispatch({
			type: LOG_IN_FAILED
			})
		})
	 }





