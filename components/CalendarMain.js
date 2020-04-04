import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PencilIcon } from 'images/icons';
import CalendarIndividual from './CalendarIndividual';
import CourseIndividual from './CourseIndividual';
import PopupModal from './PopupModal';
import * as actions from '../actions';

// Container component which serves the calender model and lets user remove courses
class CalendarMain extends React.Component {
  componentDidMount() {
    const {
      calendarModel,
    } = this.props;
    setTimeout(() => { document.getElementsByClassName('calendar-page')[0].style.right = '0%'; }, 200);
    this.attachEventHandlersCourseContainers();
    // Updates the Input value to Calendar's name
    document.getElementsByClassName('input-calendar-name')[0].value = calendarModel.name;
  }

  componentDidUpdate(prevProps) {
    const {
      currentSelection,
      catalog,
      calendarModel,
    } = this.props;
    if (JSON.stringify(currentSelection) !== JSON.stringify(prevProps.currentSelection)
      || JSON.stringify(catalog) !== JSON.stringify(prevProps.catalog)
      || JSON.stringify(calendarModel) !== JSON.stringify(prevProps.calendarModel)) {
      this.attachEventHandlersCourseContainers();
    }
  }

  attachEventHandlersCourseContainers() {
    const {
      dispatch,
    } = this.props;
    const courseContainers = document.getElementsByClassName('course-container');
    const weekContainers = document.getElementsByClassName('week-container');
    if (courseContainers.length) {
      courseContainers[0].removeEventListener('click', () => {});
      courseContainers[0].addEventListener('click', (event) => {
        event.stopPropagation();
        event.stopImmediatePropagation();
        if (event.target.closest('.course-box')) {
          this.assignTaskForCurrentSelection(event.target.closest('.course-box'), 'Remove');
        }
      });
    }
    weekContainers[0].removeEventListener('click', () => {});
    weekContainers[0].addEventListener('click', (event) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
      if (event.target.closest('.course-in-calendar')) {
        this.assignTaskForCurrentSelection(event.target.closest('.course-in-calendar'), 'RemoveAll');
      }
    });
    document.getElementsByClassName('input-calendar-name')[0]
      .addEventListener('blur keyup', (event) => {
        if (event.type === 'blur' || event.which === 13) {
          event.currentTarget.blur();
          // toastr.options = {"positionClass": "toast-bottom-center",
          // "preventDuplicates": true};
          // toastr.success("Calendar name updated!");
          dispatch(actions.updateNameInCalendarModel(event.currentTarget.value));
        }
      });
    // calendar name's updated in REDUX-STORE onBlur & Enter keyup
  }

  assignTaskForCurrentSelection(target, str) {
    // Click event handler for clicking course boxes
    // updating REDUX STORE to temporarily save course data in currentSelection
    const {
      catalog,
      dispatch,
    } = this.props;
    const course = catalog.find((value) => value.id === +target.dataset.id);
    dispatch(actions.pickCourseToCurrentSelection(course, str));
  }

  renderPopUpModal() {
    const {
      currentSelection,
    } = this.props;
    if (currentSelection.currentTask) {
      return <PopupModal />;
    }
    return null;
  }

  renderSelectedCoursesContainer() {
    const {
      catalog,
    } = this.props;
    if (catalog.filter((value) => value.selected).length) {
      return (
        <div className="course-container selected-courses">
          <div className="flex-container">
            { catalog.map(CalendarMain.renderSelectedCourses) }
          </div>
        </div>
      );
    }
    return (
      <div className="course-container selected-courses">
        <h3 style={{ textAlign: 'center' }}>
          Course list is empty.
          <br />
          Please start by selecting desired courses!
        </h3>
      </div>
    );
  }

  static renderSelectedCourses(value, index) {
    if (value.selected) {
      return <CourseIndividual key={index} courseData={value} selected bgColor={value['bg-color']} />;
    }
    return null;
  }

  render() {
    const styles = {
      height: window.innerHeight - 65,
    };
    return (
      <div
        className="calendar-page flex-container"
        style={styles}
      >
        {this.renderPopUpModal()}
        <div className="calendar-left">
          <div className="calendar-title flex-container">
            <input type="text" className="input-calendar-name" />
            <PencilIcon className="glyphicon" />
          </div>
          <hr />
          {this.renderSelectedCoursesContainer()}
        </div>
        <div>
          <div className="week-titles flex-container">
            <li>Monday</li>
            <li>Tuesday</li>
            <li>Wednesday</li>
            <li>Thursday</li>
            <li>Friday</li>
          </div>
          <div className="week-container flex-container">
            <ul className="timeslot-names flex-container">
              <li>7:00</li>
              <li>8:00</li>
              <li>9:00</li>
              <li>10:00</li>
              <li>11:00</li>
              <li>12:00</li>
              <li>1:00</li>
              <li>2:00</li>
              <li>3:00</li>
              <li>4:00</li>
            </ul>
            <CalendarIndividual dayID="day1" />
            <CalendarIndividual dayID="day2" />
            <CalendarIndividual dayID="day3" />
            <CalendarIndividual dayID="day4" />
            <CalendarIndividual dayID="day5" />
          </div>
        </div>
      </div>
    );
  }
}

CalendarMain.propTypes = {
  catalog: PropTypes.arrayOf(PropTypes.object),
  calendarModel: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
    PropTypes.bool,
  ])),
  currentSelection: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => ({
  catalog: state.catalog,
  calendarModel: state.calendarModel,
  currentSelection: state.currentSelection,
});

export default connect(mapStateToProps)(CalendarMain);
