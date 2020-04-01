import counterReducer from './counter'
import loggedReducer from './isLogged'
import {combineReducers} from 'redux';

const rootReducers = combineReducers({
  counter: counterReducer,
  logged: loggedReducer
})

export default rootReducers;