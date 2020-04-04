import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  ChevronDownIcon,
  ChevronUpIcon,
} from 'images/icons';
import CourseIndividual from './CourseIndividual';
import PopupModal from './PopupModal';
import * as actions from '../actions';

// Container component which acts as the main entry page
// Serves the course catalog and allows user to add or remove courses
class CoursesMain extends React.Component {
  static toggleHeightCourseTitle(target) {
    if (target.classList.contains('closed')) {
      if (target.nextSibling.classList.contains('selected-courses')) {
        document.getElementsByClassName('selected-courses')[0].classList.add('open');
      } else {
        document.getElementsByClassName('available-courses')[0].classList.add('open');
      }
      target.getElementsByClassName('glyphicon down')[0].classList.remove('open');
      target.getElementsByClassName('glyphicon up')[0].classList.add('open');
      target.classList.remove('closed');
    } else {
      if (target.nextSibling.classList.contains('selected-courses')) {
        document.getElementsByClassName('selected-courses')[0].classList.remove('open');
      } else {
        document.getElementsByClassName('available-courses')[0].classList.remove('open');
      }
      target.getElementsByClassName('glyphicon up')[0].classList.remove('open');
      target.getElementsByClassName('glyphicon down')[0].classList.add('open');
      target.classList.add('closed');
    }
    return null;
  }

  componentDidMount() {
    setTimeout(() => { document.getElementsByClassName('courses-page')[0].style.left = '0%'; }, 200);
    this.calcCourseContainerWidth();
    this.attachEventHandlersCourseContainers();
  }

  componentDidUpdate() {
    this.calcCourseContainerWidth();
    this.attachEventHandlersCourseContainers();
  }

  componentWillUnmount() {
    document.getElementsByClassName('courses-page')[0].style.left = '-100%';
    document.getElementsByClassName('selected-available-container')[0].removeEventListener('click', () => {});
  }

  attachEventHandlersCourseContainers() {
    // Attach handlers to all course-box
    // Also for Expanding - contracting catalog list
    document.getElementsByClassName('selected-available-container')[0].removeEventListener('click', () => {});
    document.getElementsByClassName('selected-available-container')[0].addEventListener('click', (event) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
      if (event.target.closest('.course-box')) {
        this.assignTaskForCurrentSelection(event);
      } else if (event.target.closest('.course-title')) {
        CoursesMain.toggleHeightCourseTitle(event.target);
      }
    });
  }

  calcCourseContainerWidth() {
    // Calculate the horizontal overflow:scroll for the Courses-selected section
    const {
      catalog,
    } = this.props;
    const numOfSelected = catalog.filter((value) => value.selected);
    const str = numOfSelected.length > 2 ? `${numOfSelected.length * 40}%` : '100%';
    if (document.getElementsByClassName('course-container selected-courses').length) {
      const selected = document.getElementsByClassName('course-container selected-courses')[0];
      selected.getElementsByClassName('flex-container')[0].style.width = str;
    }
    if (numOfSelected.length) {
      document.getElementsByClassName('courses-page')[0].classList.add('selected');
    }
  }

  assignTaskForCurrentSelection(event) {
    // Click event handler for clicking course boxes
    // updating REDUX STORE to temporarily save course data in currentSelection
    const {
      catalog,
      dispatch,
    } = this.props;
    const currentTarget = event.target.closest('.course-box');
    const task = event.target.closest('.selected-courses') ? 'Remove' : 'Add';
    const course = catalog.find((value) => value.id === +currentTarget.dataset.id);
    dispatch(actions.pickCourseToCurrentSelection(course, task));
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

  static renderIndividualUpcomingCourse(value, index) {
    if (index < 3) {
      let dayText;
      switch (value[1]) {
        case 1: dayText = 'Monday'; break;
        case 2: dayText = 'Tuesday'; break;
        case 3: dayText = 'Wednesday'; break;
        case 4: dayText = 'Thursday'; break;
        case 5: dayText = 'Friday'; break;
        default: dayText = '';
      }
      return (
        <div key={index} className="upcoming-session flex-container">
          <h3>{value[0].name}</h3>
          <p>{dayText}</p>
          <h4>{value[0].time[0]}</h4>
        </div>
      );
    }
    return null;
  }

  renderUpcomingCourses() {
    // Use current day & time to calculate the closest 3 courses
    // Filtered from the selected-courses list
    const {
      catalog,
    } = this.props;
    if (catalog.filter((value) => value.selected).length) {
      const date = new Date();
      let day = date.getDay();
      let hour = date.getHours() + 1;
      if (hour < 7) {
        hour = 7;
      } else if (hour > 14) {
        hour = 7;
        day += 1;
      }
      if (day === 0 || day === 6) {
        day = 1;
        hour = 7;
      }
      let dayItr = day;
      let hourItr = hour;
      let is3selected = false;
      const arr = [];
      while (arr.length < 3 && !is3selected) {
        // Iterate through every hour and day till first 3 courses are found
        let temp = [];
        /* eslint-disable */
        temp = catalog.map((value) => {
          if (value.dayIndex.includes(dayItr)
            && value.timeIndex[0] === hourItr
            && value.selected) {
            return [value, dayItr];
          }
          return null;
        }).filter((value) => !!value);
        /* eslint-enable */
        if (temp.length) arr.push(...temp);
        hourItr += 1;
        if (hourItr === 17) {
          hourItr = 7;
          dayItr += 1;
          if (dayItr === 6) dayItr = 1;
        }
        if (dayItr === day && hourItr === hour) is3selected = true;
      }
      return (
        <aside className="flex-container d-none d-md-block">
          <h2 className="day-title">Upcoming Session(s)</h2>
          { arr.map(CoursesMain.renderIndividualUpcomingCourse) }
        </aside>
      );
    }
    return null;
  }

  renderSelectedCoursesContainer() {
    const {
      catalog,
    } = this.props;
    if (catalog.filter((value) => value.selected).length) {
      // Render this section only if there is at least one course selected
      return (
        <>
          <h2 className="course-title">
            Courses Selected
            <ChevronDownIcon className="glyphicon down" />
            <ChevronUpIcon className="glyphicon up open" />
          </h2>
          <div className="course-container selected-courses open">
            <div className="flex-container">
              { catalog.map(CoursesMain.renderSelectedCourses) }
            </div>
          </div>
        </>
      );
    }
    return null;
  }

  static renderSelectedCourses(value, index) {
    if (value.selected) {
      return <CourseIndividual key={index} courseData={value} selected bgColor={value['bg-color']} />;
    }
    return null;
  }

  static renderAvailableCourses(value, index) {
    if (!value.selected) {
      return <CourseIndividual key={index} courseData={value} selected={false} bgColor={value['bg-color']} />;
    }
    return null;
  }

  render() {
    const {
      catalog,
    } = this.props;
    return (
      <div className="courses-page">
        {this.renderPopUpModal()}
        <div className="selected-available-container">
          {this.renderSelectedCoursesContainer()}
          <h2 className="course-title">
            Courses Available
            <ChevronDownIcon className="glyphicon down" />
            <ChevronUpIcon className="glyphicon up open" />
          </h2>
          <div className="course-container available-courses open">
            { catalog.map(CoursesMain.renderAvailableCourses) }
          </div>
        </div>
        { this.renderUpcomingCourses() }
      </div>
    );
  }
}

CoursesMain.propTypes = {
  catalog: PropTypes.arrayOf(PropTypes.object),
  currentSelection: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => ({
  catalog: state.catalog,
  currentSelection: state.currentSelection,
});

export default connect(mapStateToProps)(CoursesMain);
