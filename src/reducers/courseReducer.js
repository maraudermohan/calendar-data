import initialState from './initialState';

export default function courseReducer(state = initialState.catalog, action) {
  switch (action.type) {
    case 'LOAD_CATALOG_FROM_JSON':
    	return state.concat(action.content);

    default:
      return state;
  }
}
