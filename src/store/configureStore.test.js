import chai from 'chai';
var expect = chai.expect;
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import * as actions from '../actions';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

//Test the store initiation
describe('Store initiation', function() {
  it('Should handle loading course data from JSON', function() {
    const store = createStore(rootReducer);
    const catalog = [{
      "id":500,
      "name":"Introduction to Mocha Testing",
      "author":"Mohan"
    }];

    const action = actions.loadCatalogFromJSON(catalog);
    store.dispatch(action);

    const actualCatalog = store.getState().catalog;
    const expectedCatalog = [{
      "id":500,
      "name":"Introduction to Mocha Testing",
      "author":"Mohan"
    }];

    const actualCalendar = store.getState().calendarModel;
    const expectedCalendar = {
        'name' : "Mohan's Calendar",
        'day1' : [],
        'day2' : [],
        'day3' : [],
        'day4' : [],
        'day5' : []
        }; 

    const actualCurrentSelection = store.getState().currentSelection;
    const expectedCurrentSelection = {
        currentTask: '',
        currentCourse:''
      };

    expect(actualCatalog.id).to.equal(expectedCatalog.id);
    expect(actualCatalog.name).to.equal(expectedCatalog.name);
    expect(actualCatalog.author).to.equal(expectedCatalog.author);
    expect(JSON.stringify(actualCalendar)).to.equal(JSON.stringify(expectedCalendar));
    expect(JSON.stringify(actualCurrentSelection)).to.equal(JSON.stringify(expectedCurrentSelection));
  });
});