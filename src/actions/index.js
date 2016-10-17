export const loadCatalogFromJSON = (content) => {
	return { 
		type: 'LOAD_CATALOG_FROM_JSON',
		content
	};
}

export const removeCourseFromSelection = (content, newCalendar) => {
	return {
		type: 'REMOVE_COURSE_FROM_SELECTION',
		content,
		newCalendar
	};
}

export const addCourseToSelection = (content, newCalendar) => {
	return {
		type: 'ADD_COURSE_TO_SELECTION',
		content, 
		newCalendar
	};
}

export const pickCourseToCurrentSelection = (currentCourse, currentTask) => {
	return {
		type: 'PICK_COURSE_TO_CURRENT_SELECTION',
		currentCourse,
		currentTask
	};
}

export const updateNameInCalendarModel = (name) => {
	return {
		type: 'UPDATE_NAME_IN_CALENDAR_MODEL',
		name
	};
}

