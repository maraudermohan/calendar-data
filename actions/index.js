export const removeCourseFromSelection = (content, newCalendar) => ({
  type: 'REMOVE_COURSE_FROM_SELECTION',
  content,
  newCalendar,
});

export const addCourseToSelection = (content, newCalendar) => ({
  type: 'ADD_COURSE_TO_SELECTION',
  content,
  newCalendar,
});

export const pickCourseToCurrentSelection = (currentCourse, currentTask) => ({
  type: 'PICK_COURSE_TO_CURRENT_SELECTION',
  currentCourse,
  currentTask,
});

export const updateNameInCalendarModel = (name) => ({
  type: 'UPDATE_NAME_IN_CALENDAR_MODEL',
  name,
});
