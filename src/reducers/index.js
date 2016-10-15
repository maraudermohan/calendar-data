import {combineReducers} from 'redux';
import catalog from './catalogReducer';
import timeIndex from './timeIndexReducer';

const rootReducer = combineReducers({
  catalog,
  timeIndex
});

export default rootReducer;