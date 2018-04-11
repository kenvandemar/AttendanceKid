import { createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


import appReducer from '../reducers/appReducer';
const middleware = applyMiddleware(thunk, logger);

export default (data = {}) => {
  const rootReducer = combineReducers({
    appReducer: appReducer,
  })

    return createStore(
        rootReducer,
        data,
        middleware
    )
}