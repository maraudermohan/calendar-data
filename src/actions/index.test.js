import chai from 'chai';
var expect = chai.expect;
import * as actions from './index.js';

// Test a sync action
describe('Actions', () => {
  describe('trigger all actions successfully', () => {
    it('LOAD_CATALOG_FROM_JSON action triggered', () => {
      const course = {id: 500, name: 'Mocha testing'};
      const expectedAction = {
        type: 'LOAD_CATALOG_FROM_JSON',
		content: course
      };

      const action = actions.loadCatalogFromJSON(course);
      expect(JSON.stringify(action)).to.equal(JSON.stringify(expectedAction));
    });

    it('ADD_COURSE_TO_SELECTION action triggered', () => {
      const course = {id: 500, name: 'Mocha testing', selected:true};
      const expectedAction = {
        type: 'ADD_COURSE_TO_SELECTION',
		content: course,
		newCalendar: {}
      };

      const action = actions.addCourseToSelection(course,{});
      expect(JSON.stringify(action)).to.equal(JSON.stringify(expectedAction));
    });

    it('UPDATE_NAME_IN_CALENDAR_MODEL action triggered', () => {
      const name = 'Also chai testing';
      const expectedAction = {
        type: 'UPDATE_NAME_IN_CALENDAR_MODEL',
		name: name
      };

      const action = actions.updateNameInCalendarModel(name);
      expect(JSON.stringify(action)).to.equal(JSON.stringify(expectedAction));
    });
  });
});

