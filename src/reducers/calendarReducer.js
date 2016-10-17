import initialState from './initialState';

export default function calendarReducer(state = initialState.calendarModel, action) {
  switch (action.type) {
    case 'UPDATE_NAME_IN_CALENDAR_MODEL': 
      return Object.assign({},state,{
                  'name' : action.name
                });

    case 'REMOVE_COURSE_FROM_SELECTION':
      var newObj = Object.assign({},state,{
    							'day1' : action.newCalendar.day1,
								'day2' : action.newCalendar.day2,
								'day3' : action.newCalendar.day3,
								'day4' : action.newCalendar.day4,
								'day5' : action.newCalendar.day5
    						});
      //simulateAjaxCall(newObj);
      return newObj;

    case 'ADD_COURSE_TO_SELECTION':
    	var newObj = Object.assign({},state,{
                  'day1' : action.newCalendar.day1,
                'day2' : action.newCalendar.day2,
                'day3' : action.newCalendar.day3,
                'day4' : action.newCalendar.day4,
                'day5' : action.newCalendar.day5
                });
      //simulateAjaxCall(newObj);
      return newObj;

    default:
      return state;
  }
}
function simulateAjaxCall(newObj) {
  var placeholderURL = "/";
  fetch(placeholderURL, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            calendarModel: newObj
          })
        }).then(response => response.json()).then(function(json) {
            console.log(json);
        });
}
