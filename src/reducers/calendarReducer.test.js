import chai from 'chai';
var expect = chai.expect;
import * as actions from '../actions';
import calendarReducer from './calendarReducer';

// Test a reducer handling the action
describe('Reducers : calendarReducer', () => {
  describe('Update Calendar Model in state', () => {
    it('should update calendar name when UPDATE_NAME_IN_CALENDAR_MODEL action triggered', () => {
      const initialState = {
        'name' : "Mohan's Calendar",
        'day1' : [],
        'day2' : [],
        'day3' : [],
        'day4' : [],
        'day5' : []
        };
      const newName = 'Coursera Calendar';

      const action = actions.updateNameInCalendarModel(newName);
      const newState = calendarReducer(initialState, action);

      expect(newState.name).to.equal(newName);
    });

    it('should update calendar name when REMOVE_COURSE_TO_SELECTION action triggered', () => {
      const initialState = {
        'name' : "Mohan's Calendar",
        'day1' : [],
        'day2' : [],
        'day3' : [],
        'day4' : [],
        'day5' : []
        };
      const modifiedModel = {
        'day1' : [{id:1}],
        'day2' : [{id:2}],
        'day3' : [{id:3}],
        'day4' : [{id:4}],
        'day5' : [{id:5}]
        };

      const action = actions.removeCourseFromSelection({},modifiedModel);
      const newState = calendarReducer(initialState, action);

      expect(newState.name).to.equal("Mohan's Calendar");
      expect(newState.day1).to.equal(modifiedModel.day1);
      expect(newState.day2).to.equal(modifiedModel.day2);
      expect(newState.day3).to.equal(modifiedModel.day3);
      expect(newState.day4).to.equal(modifiedModel.day4);
      expect(newState.day5).to.equal(modifiedModel.day5);
    });

  });
});

