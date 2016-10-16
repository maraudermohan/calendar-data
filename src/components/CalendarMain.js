import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CalendarIndividual from './CalendarIndividual';
import PopupModal from './PopupModal';
import * as actions from '../actions';
import $ from 'jquery';

class CalendarMain extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
	}

	componentDidUpdate() {
	}

	attachEventHandlersCourseContainers() {
		$(".course-container").off('click')
		.on("click","div.course-box",this.assignTaskForPickedCourse.bind(this));
	}

	assignTaskForPickedCourse(event) {
		var task = (event.currentTarget.closest(".selected-courses"))? 'Remove' : 'Add';
		var course = this.props.catalog.find(value => value['id'] == $(event.currentTarget).attr('data-id'));
		this.props.dispatch(actions.pickCourseToSelectOrDeselect(course, task));
	}

	renderPopUpModal() {
		if(this.props.currentSelection.currentTask) {
			return <PopupModal />;
		}
	}

	render() {
		return (
			<div className="calendar-page">
				{this.renderPopUpModal()}
				<div className="week-titles flex-container">
					<li>Monday</li>
					<li>Tuesday</li>
					<li>Wednesday</li>
					<li>Thursday</li>
					<li>Friday</li>
				</div>
				<div className="week-container flex-container">
					<CalendarIndividual dayID="day1" />
					<CalendarIndividual dayID="day2" />
					<CalendarIndividual dayID="day3" />
					<CalendarIndividual dayID="day4" />
					<CalendarIndividual dayID="day5" />
				</div>
			</div>
		);
	}
}

CalendarMain.propTypes = {
	catalog: PropTypes.array.isRequired,
	calendarModel: PropTypes.object.isRequired,
	currentSelection: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    catalog : state.catalog,
    calendarModel : state.calendarModel,
    currentSelection : state.currentSelection
  };
}
export default connect(mapStateToProps)(CalendarMain);
