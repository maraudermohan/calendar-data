import {combineReducers} from 'redux';
import catalog from './courseReducer';

const rootReducer = combineReducers({
  catalog
});

export default rootReducer;