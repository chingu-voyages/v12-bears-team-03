import { LOG_IN_SUCCEED , LOG_IN_FAILED} from "../actions/Types"

const INITIALSTATE = ''

const authReducer = ({state=INITIALSTATE, action}) =>{
    const {type, payload} = action
    switch (type){
        case LOG_IN_SUCCEED:
            return {...state, data:payload}
        case LOG_IN_FAILED:
            return INITIALSTATE

    }

}

export default authReducer