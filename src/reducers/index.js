import { combineReducers } from 'redux';
import initialState from './initialState';

const appReducer = combineReducers({
});

const resetStore = appReducer(initialState);

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = resetStore
  }

  return appReducer(state, action)
}

export default rootReducer;