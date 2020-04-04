import initialState from './initialState';

export default function catalogReducer(state = initialState.catalog, action) {
  switch (action.type) {
    case 'REMOVE_COURSE_FROM_SELECTION':
      return Array.from(state, (value) => {
        if (value.id === action.content.id) {
          return action.content;
        }
        return value;
      });

    case 'ADD_COURSE_TO_SELECTION':
      return Array.from(state, (value) => {
        if (value.id === action.content.id) {
          return action.content;
        }
        return value;
      });

    default:
      return state;
  }
}
