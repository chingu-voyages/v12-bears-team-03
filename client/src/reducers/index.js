import React from 'react'
import authReducer from './authReducer'

const initialState = '';
const CombinedReducer = (state = initialState, action) => {
    return {
        surveyData: authReducer 
    }
}

export default CombinedReducer
