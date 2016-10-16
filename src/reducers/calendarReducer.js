import initialState from './initialState';

export default function timeIndexReducer(state = initialState.calendarModel, action) {
  switch (action.type) {
    case 'REMOVE_COURSE_FROM_SELECTION':
    	return Object.assign({},state,{
    							'day1' : action.newCalendar.day1,
								'day2' : action.newCalendar.day2,
								'day3' : action.newCalendar.day3,
								'day4' : action.newCalendar.day4,
								'day5' : action.newCalendar.day5
    						});

    case 'ADD_COURSE_TO_SELECTION':
    	return Object.assign({},state,{
    							'day1' : action.newCalendar.day1,
								'day2' : action.newCalendar.day2,
								'day3' : action.newCalendar.day3,
								'day4' : action.newCalendar.day4,
								'day5' : action.newCalendar.day5
    						});

    default:
      return state;
  }
}
