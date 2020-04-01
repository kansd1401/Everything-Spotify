import counterReducer from './counter'
import loggedReducer from './isLogged'
import {combineReducers} from 'redux';

const rootReducers = combineReducers({
  counterReducer,
  loggedReducer
})

export default rootReducers;