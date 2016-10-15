export const loadCatalogFromJSON = (content) => {
	return { 
		type: 'LOAD_CATALOG_FROM_JSON',
		content
	};
}

export const removeCourseFromSelection = (content) => {
	return {
		type: 'REMOVE_COURSE_FROM_SELECTION',
		content
	};
}

export const addCourseToSelection = (content) => {
	return {
		type: 'ADD_COURSE_TO_SELECTION',
		content
	};
}

export const pickCourseToSelectOrDeselect = (content, task) => {
	return {
		type: 'PICK_COURSE_TO_SELECT_OR_DESELECT',
		content,
		task
	};
}

