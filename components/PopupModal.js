import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ExclaimIcon } from 'images/icons';
import * as actions from '../actions';
import timeConflictCalculator from './timeConflictCalculator';

// Container component which calls time-conflict-calculator function to identify time conflicts
class PopupModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      newCalendar: {},
    };
  }

  componentDidMount() {
    const {
      catalog,
      currentSelection,
    } = this.props;
    const coursesPage = document.getElementsByClassName('courses-page');
    if (coursesPage.length) {
      coursesPage[0].style.top = `-${window.pageYOffset}px`;
      coursesPage[0].style.position = 'fixed';
    }
    document.getElementById('popup-modal').style.opacity = 1;
    this.setState({ newCalendar: timeConflictCalculator(catalog, currentSelection) });
  }

  componentWillUnmount() {
    const coursesPage = document.getElementsByClassName('courses-page');
    if (coursesPage.length) {
      coursesPage[0].style.top = '';
      coursesPage[0].style.position = '';
    }
  }

  composePopupMessage() {
    const {
      catalog,
      currentSelection,
    } = this.props;
    let str = '';
    if (currentSelection.currentTask === 'Add') {
      // Calls time-conflict-calculator function, which returns a modified calendar model
      // Modified calendar model contains information about all time conflicts
      const newCalendar = timeConflictCalculator(catalog, currentSelection);
      const id1 = currentSelection.currentCourse.id;
      if (newCalendar.day1.filter((value) => {
        if (value.id === id1) {
          return value.leftConflicts.length + value.rightConflicts.length;
        }
        return null;
      }).length) {
        str += 'Monday ';
      }
      if (newCalendar.day2.filter((value) => {
        if (value.id === id1) {
          return value.leftConflicts.length + value.rightConflicts.length;
        }
        return null;
      }).length) {
        str += 'Tuesday ';
      }
      if (newCalendar.day3.filter((value) => {
        if (value.id === id1) {
          return value.leftConflicts.length + value.rightConflicts.length;
        }
        return null;
      }).length) {
        str += 'Wednesday ';
      }
      if (newCalendar.day4.filter((value) => {
        if (value.id === id1) {
          return value.leftConflicts.length + value.rightConflicts.length;
        }
        return null;
      }).length) {
        str += 'Thursday ';
      }
      if (newCalendar.day5.filter((value) => {
        if (value.id === id1) {
          return value.leftConflicts.length + value.rightConflicts.length;
        }
        return null;
      }).length) {
        str += 'Friday ';
      }
      if (str.length) {
        str = `This course has time conflict(s) on ${str.split(' ').filter((x) => !!x).join(', ')}`;
        return (
          <h4>
            <ExclaimIcon className="glyphicon" />
            <br />
            {`${str}.`}
            <br />
            Do you still want to add?
          </h4>
        );
      }
      str = 'This course will be added to your calendar. Are you sure?';
      return <h4>{str}</h4>;
    }
    if (currentSelection.currentTask === 'Remove') {
      str = 'This course will be removed from your calendar. Are you sure?';
      return <h4>{str}</h4>;
    }
    return (
      <h4>
        Author :
        { currentSelection.currentCourse.author }
        <br />
        <br />
        Days :
        { currentSelection.currentCourse.days.join(', ') }
        <br />
        <br />
        Time :
        { currentSelection.currentCourse.time.join(' - ') }
      </h4>
    );
  }

  assignPopUpBtnHandler() {
    // Button text altered based on the current intended task
    const {
      currentSelection,
    } = this.props;
    if (currentSelection.currentTask === 'Add') {
      return (
        <button type="submit" className="btn btn-primary" onClick={(event) => this.submitHandlerAvailableCourses(event)}>
          Add
        </button>
      );
    }
    return (
      <button type="submit" className="btn btn-primary" onClick={(event) => this.submitHandlerSelectedCourses(event)}>
        Remove
      </button>
    );
  }

  submitHandlerAvailableCourses(event) {
    // Updates REDUX STORE adding the course , setting the 'selected' boolean true
    const {
      dispatch,
      currentSelection,
    } = this.props;
    const {
      newCalendar,
    } = this.state;
    event.stopPropagation();
    // toastr.options = {"positionClass": "toast-bottom-center"}
    // toastr.success("Course successfully added!");
    dispatch(actions.addCourseToSelection({
      ...currentSelection.currentCourse,
      selected: true,
    }, newCalendar));
  }

  submitHandlerSelectedCourses(event) {
    // Updates REDUX STORE removing the course , setting the 'selected' boolean false
    const {
      dispatch,
      currentSelection,
    } = this.props;
    const {
      newCalendar,
    } = this.state;
    event.stopPropagation();
    // toastr.options = {"positionClass": "toast-bottom-center"}
    // toastr.success("Course Removed!");
    dispatch(actions.removeCourseFromSelection({
      ...currentSelection.currentCourse,
      selected: false,
    }, newCalendar));
  }

  closePopupModalEvent() {
    const {
      dispatch,
    } = this.props;
    dispatch(actions.pickCourseToCurrentSelection('', ''));
  }

  render() {
    const {
      currentSelection,
    } = this.props;
    const style = { backgroundColor: currentSelection.currentCourse['bg-color'] };
    const popupData = this.composePopupMessage();
    return (
      <div
        id="popup-modal"
        className="flex-container"
        onClick={(event) => this.closePopupModalEvent(event)}
        role="presentation"
      >
        <div id="message-box" className="flex-container">
          <h3 style={style}>{currentSelection.currentCourse.name}</h3>
          { popupData }
          { this.assignPopUpBtnHandler() }
        </div>
      </div>
    );
  }
}


PopupModal.propTypes = {
  catalog: PropTypes.arrayOf(PropTypes.object),
  currentSelection: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => ({
  catalog: state.catalog,
  currentSelection: state.currentSelection,
});

export default connect(mapStateToProps)(PopupModal);
