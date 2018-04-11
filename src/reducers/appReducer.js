import {
    GET_LANG_DATA,
    RUN_APP,
} from '../actions/constants';

const initialState = {
    langData: null,
    runApp: {},
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LANG_DATA:
            return {
                langData: null
            }
        case RUN_APP: 
            return {
                runApp: action.app
            }
        default:
           return state;
    }
}