import counterReducer from './counter'
import loggedReducer from './isLogged'
import {combinedReducers, combineReducers} from 'redux';

const rootReducers = combineReducers({
  counterReducer,
  loggedReducer
})