import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Presentational component which renders all selected course-blocks in a single day
class CalendarIndividual extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      cssArray: [],
    };
    this.renderCourseBlocks = this.renderCourseBlocks.bind(this);
  }

  componentDidMount() {
    this.calculateCSSleftAndWidth();
  }

  componentDidUpdate(prevProps) {
    const {
      catalog,
      calendarModel,
      dayID,
    } = this.props;
    if (prevProps.dayID !== dayID
      || JSON.stringify(prevProps.calendarModel) !== JSON.stringify(calendarModel)
      || JSON.stringify(prevProps.catalog) !== JSON.stringify(catalog)) {
      this.calculateCSSleftAndWidth();
    }
  }

  calculateCSSleftAndWidth() {
    // Called from : Mount & receieve props lifecycle methods
    // Creates and updates cssArray
    const {
      calendarModel,
      dayID,
    } = this.props;
    const cssArray = [];
    const dayArray = calendarModel[dayID];
    for (let x = 0; x < dayArray.length; x += 1) {
      let left = 0;
      let width = 100;
      if (dayArray[x].leftConflicts.length) {
        // css 'left' decided by course-blocks with conflicts on leftside
        left = Math.max(...cssArray.map((value, index) => {
          if (index < x && dayArray[x].leftConflicts.includes(index)) {
            return value[2];
          }
          return null;
        }).filter((value) => !!value));
      }
      // css 'width' decided by course-blocks with conflicts on rightside
      width = (100 - left) / (dayArray[x].rightConflicts.length + 1);
      cssArray.push([left, width, left + width]);
    }
    this.setState({ cssArray });
  }

  renderCourseBlocks(value, index) {
    const {
      cssArray,
    } = this.state;
    const {
      catalog,
    } = this.props;
    if (cssArray.length) {
      const offsetFactor = 10;
      const courseData = catalog.find((x) => x.id === value.id);
      const style = {
        // css 'top' & 'height' calculated by start time & duration
        top: `${(value.time[0] > 13 ? (7 + (value.time[0] % 7)) : value.time[0] % 7) * offsetFactor}%`,
        height: `calc(${(value.time[1] - value.time[0]) * offsetFactor}% - 4px)`,
        left: `${cssArray[index][0]}%`,
        width: `calc(${cssArray[index][1]}% - 4px)`,
        backgroundColor: courseData['bg-color'],
      };
      return (
        <div
          key={value.id}
          className="course-in-calendar"
          data-id={courseData.id}
          style={style}
        >
          {courseData.name}
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      calendarModel,
      dayID,
    } = this.props;
    return (
      <div className="calendar-individual">
        <ul className="flex-container">
          <li className="clock7" />
          <li className="clock8" />
          <li className="clock9" />
          <li className="clock10" />
          <li className="clock11" />
          <li className="clock12" />
          <li className="clock13" />
          <li className="clock14" />
          <li className="clock15" />
          <li className="clock16" />
        </ul>
        { calendarModel[dayID].map(this.renderCourseBlocks) }
      </div>
    );
  }
}

CalendarIndividual.propTypes = {
  catalog: PropTypes.arrayOf(PropTypes.object),
  calendarModel: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
    PropTypes.bool,
  ])),
  dayID: PropTypes.string,
};

const mapStateToProps = (state) => ({
  catalog: state.catalog,
  calendarModel: state.calendarModel,
});

export default connect(mapStateToProps)(CalendarIndividual);
