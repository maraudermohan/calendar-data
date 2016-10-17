import initialState from './initialState';

export default function timeIndexReducer(state = initialState.currentSelection, action) {
  switch (action.type) {
  	case 'PICK_COURSE_TO_CURRENT_SELECTION':
    	return action;

    case 'REMOVE_COURSE_FROM_SELECTION':
    	return {
  							currentCourse : '',
  							currentTask : ''
  						};

    case 'ADD_COURSE_TO_SELECTION':
    	return {
                currentCourse : '',
                currentTask : ''
              };

    default:
      return state;
  }
}
