import initialState from './initialState';

export default function calendarReducer(state = initialState.calendarModel, action) {
  let newObj = state;
  switch (action.type) {
    case 'UPDATE_NAME_IN_CALENDAR_MODEL':
      return { ...state, name: action.name };

    case 'REMOVE_COURSE_FROM_SELECTION':
      newObj = {
        ...state,
        day1: action.newCalendar.day1,
        day2: action.newCalendar.day2,
        day3: action.newCalendar.day3,
        day4: action.newCalendar.day4,
        day5: action.newCalendar.day5,
      };
      return newObj;

    case 'ADD_COURSE_TO_SELECTION':
      newObj = {
        ...state,
        day1: action.newCalendar.day1,
        day2: action.newCalendar.day2,
        day3: action.newCalendar.day3,
        day4: action.newCalendar.day4,
        day5: action.newCalendar.day5,
      };
      return newObj;

    default:
      return state;
  }
}
