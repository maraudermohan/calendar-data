import initialState from './initialState';

export default function catalogReducer(state = initialState.catalog, action) {
  switch (action.type) {
    case 'LOAD_CATALOG_FROM_JSON':
    	return state.concat(action.content.map(value => {
					    		value['bg-color'] = getRandomColor();
					    		return value; 
					    	}));

    case 'REMOVE_COURSE_FROM_SELECTION':
    	return Array.from(state,value => {
				    		if(value.id === action.content.id) {
				    			return action.content
				    		}
				    		return value;
				    	});

    case 'ADD_COURSE_TO_SELECTION':
    	return Array.from(state,value => {
				    		if(value.id === action.content.id) {
				    			return action.content
				    		}
				    		return value;
				    	});

    default:
      return state;
  }
}

//A random color generator to save a unique color for each course 
const getRandomColor = () => {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
