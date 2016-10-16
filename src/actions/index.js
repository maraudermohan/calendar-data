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

export const pickCourseToSelectOrDeselect = (currentCourse, currentTask) => {
	return {
		type: 'PICK_COURSE_TO_SELECT_OR_DESELECT',
		currentCourse,
		currentTask
	};
}

