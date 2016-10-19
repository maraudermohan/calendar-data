import chai from 'chai';
var expect = chai.expect;
import * as actions from '../actions';
import currentSelectionReducer from './currentSelectionReducer';

// Test a reducer handling the action
describe('Reducers : currentSelection Reducer', () => {
  describe('Update State to hold the currently interacted course', () => {
    it('should update course details when PICK_COURSE_TO_CURRENT_SELECTION action triggered', () => {
      const initialState = {
        currentTask: '',
        currentCourse:''
      };
      const modifiedModel = {
        currentCourse: {id:500, name: 'Mocha testing'},
        currentTask: 'REMOVE'        
      };

      const action = actions.pickCourseToCurrentSelection({id:500, name: 'Mocha testing'},'REMOVE');
      const newState = currentSelectionReducer(initialState, action);

      expect(JSON.stringify(newState)).to.equal(JSON.stringify(modifiedModel));
    });

  });
});