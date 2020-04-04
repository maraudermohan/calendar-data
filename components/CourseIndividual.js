import React from 'react';
import PropTypes from 'prop-types';

import {
  CloseIcon,
  CheckCircleIcon,
} from 'images/icons';

// Presentational component - which displays the current course data
class CourseIndividual extends React.Component {
  renderCourseName() {
    const {
      selected,
      bgColor,
      courseData,
    } = this.props;
    const styles = selected ? { backgroundColor: bgColor } : {};
    return (
      <div className="flex-container" style={styles}>
        <h2>{courseData.name}</h2>
      </div>
    );
  }

  renderGlyphiconContainer() {
    const {
      selected,
    } = this.props;
    const Icon = selected ? CloseIcon : CheckCircleIcon;
    return (
      <div className="glyphicon-container">
        <Icon className="glyphicon" />
      </div>
    );
  }

  render() {
    const {
      courseData,
      bgColor,
    } = this.props;
    const style = {
      backgroundColor: bgColor,
    };
    return (
      <div className="course-box flex-container" data-id={courseData.id}>
        <div className="for-bg-color" style={style} />
        <div className="course-box-content">
          { this.renderCourseName() }
          <div className="flex-container">
            <p className="author-text">{courseData.author}</p>
            <p className="day-text-for-mobile">
              { courseData.days.map((value) => value[0] + value[1]).join(', ') }
              &nbsp;:
            </p>
            <p className="time-text">
              &nbsp;
              { courseData.time.join(' - ') }
            </p>
          </div>
        </div>
        {this.renderGlyphiconContainer()}
      </div>
    );
  }
}

CourseIndividual.propTypes = {
  courseData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
    PropTypes.bool,
  ])),
  bgColor: PropTypes.string,
  selected: PropTypes.bool,
};

export default CourseIndividual;
