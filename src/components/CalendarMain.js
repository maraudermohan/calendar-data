import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CalendarIndividual from './CalendarIndividual';
import CourseIndividual from './CourseIndividual';
import PopupModal from './PopupModal';
import * as actions from '../actions';
import $ from 'jquery';
import toastr from 'toastr';

//Container component which serves the calender model and lets user remove courses
class CalendarMain extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		$('.calendar-page').animate({right:'0%'},250);
		this.attachEventHandlersCourseContainers();
		//Updates the Input value to Calendar's name
		$(".input-calendar-name").val(this.props.calendarModel.name);
	}

	componentWillReceiveProps() {
		this.attachEventHandlersCourseContainers();	
	}

	attachEventHandlersCourseContainers() {
		var _this = this;
		$(".course-container").off('click')
		.on("click","div.course-box",this.assignTaskForCurrentSelection.bind(this,'Remove'));
		$(".week-container").off('click')
		.on("click","div.course-in-calendar",this.assignTaskForCurrentSelection.bind(this,'RemoveAll'));
		$(".input-calendar-name").on("blur keyup",(event) => {
					if((event.type === 'blur')||(event.which === 13)) {	
						event.currentTarget.blur();
						toastr.options = {"positionClass": "toast-bottom-center",
							"preventDuplicates": true};
						toastr.success("Calendar name updated!");
						_this.props.dispatch(actions.updateNameInCalendarModel(event.currentTarget.value));
					}});
		//calendar name's updated in REDUX-STORE onBlur & Enter keyup
	}

	assignTaskForCurrentSelection(str,event) {
		//Click event handler for clicking course boxes
		//updating REDUX STORE to temporarily save course data in currentSelection
		var course = this.props.catalog.find(value => value['id'] == $(event.currentTarget).attr('data-id'));
		this.props.dispatch(actions.pickCourseToCurrentSelection(course, str));
	}

	renderPopUpModal() {
		if(this.props.currentSelection.currentTask) {
			return <PopupModal />;
		}
	}

	renderSelectedCoursesContainer() {
		if(this.props.catalog.filter(value => value.selected).length) {
			return 	<div className="course-container selected-courses">
						<div className="flex-container">
				    		{this.props.catalog.map(this.renderSelectedCourses)}
				    	</div>
				  	</div>;
		}
	}

	renderSelectedCourses(value, index) {
		if(value.selected) {
			return <CourseIndividual key={index} courseData={value} selected={true} bgColor={value['bg-color']} />
		}
	}

	render() {
		return (
			<div className="calendar-page flex-container">
				{this.renderPopUpModal()}
				<div className="calendar-left">
					<div className="calendar-title flex-container">
						<input type="text"
							className="input-calendar-name" />
						<span className='glyphicon glyphicon-pencil' aria-hidden='true'>
						</span>
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
						<li>7:00</li><li>8:00</li><li>9:00</li>
						<li>12:00</li><li>11:00</li><li>12:00</li>
						<li>1:00</li><li>2:00</li><li>3:00</li>
						<li>4:00</li></ul>
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
