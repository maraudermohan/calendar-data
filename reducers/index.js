import { combineReducers } from 'redux';
import catalog from './catalogReducer';
import calendarModel from './calendarReducer';
import currentSelection from './currentSelectionReducer';

const rootReducer = combineReducers({
  catalog,
  calendarModel,
  currentSelection,
});

export default rootReducer;
