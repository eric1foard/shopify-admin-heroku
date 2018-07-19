import { combineReducers } from 'redux';
import exampleReducer from './reducer_example';

const rootReducer = combineReducers({
  example: exampleReducer
});

export default rootReducer;