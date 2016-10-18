import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CourseIndividual from './CourseIndividual';
import PopupModal from './PopupModal';
import * as actions from '../actions';
import $ from 'jquery';
import toastr from 'toastr';

//Container component which acts as the main entry page
//Serves the course catalog and allows user to add or remove courses
class CoursesMain extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		$('.courses-page').animate({left:'0%'},250);
		this.calcCourseContainerWidth();
		this.attachEventHandlersCourseContainers();
	}

	componentDidUpdate() {
		this.calcCourseContainerWidth();
		this.attachEventHandlersCourseContainers();
	}

	attachEventHandlersCourseContainers() {
		//Attach handlers to all course-box
		//Also for Expanding - contracting catalog list
		$(".course-container").off('click')
		.on("click","div.course-box",this.assignTaskForCurrentSelection.bind(this));
		$(".courses-page > div > h2").off('click').on("click", function(event) {
				var _this = $(event.currentTarget);
				if(_this.hasClass("closed")) {
					(_this.siblings(".selected-courses").length)? 
						_this.siblings(".selected-courses").slideDown(750) : 
						_this.siblings(".available-courses").slideDown(400);
					_this.find(".glyphicon").toggleClass("glyphicon-chevron-down").toggleClass("glyphicon-chevron-up");
					_this.removeClass("closed");
				}
				else {
					(_this.siblings(".selected-courses").length)? 
						_this.siblings(".selected-courses").slideUp(750) : 
						_this.siblings(".available-courses").slideUp(400);
					_this.find(".glyphicon").toggleClass("glyphicon-chevron-down").toggleClass("glyphicon-chevron-up");
					_this.addClass("closed");
				}
				
			});
	}

	calcCourseContainerWidth() {
		//Calculate the horizontal overflow:scroll for the Courses-selected section
		var numOfSelected = this.props.catalog.filter(value => value['selected']);
		var str = (numOfSelected.length > 2)? numOfSelected.length*40 + "%" :'100%';
		$(".course-container.selected-courses > .flex-container").css("width",str);
		if(numOfSelected.length) $(".courses-page").addClass("selected");
	}

	assignTaskForCurrentSelection(event) {
		//Click event handler for clicking course boxes
		//updating REDUX STORE to temporarily save course data in currentSelection
		var task = (event.currentTarget.closest(".selected-courses"))? 'Remove' : 'Add';
		var course = this.props.catalog.find(value => value['id'] == $(event.currentTarget).attr('data-id'));
		this.props.dispatch(actions.pickCourseToCurrentSelection(course, task));
	}

	renderPopUpModal() {
		if(this.props.currentSelection.currentTask) {
			return <PopupModal />;
		}
	}

	renderIndividualUpcomingCourse(value, index) {
		if(index < 3) {
			var dayText;
			switch(value[1]) {
				case 1: dayText =  'Monday'; break;
				case 2: dayText =  'Tuesday'; break;
				case 3: dayText =  'Wednesday'; break;
				case 4: dayText =  'Thursday'; break;
				case 5: dayText =  'Friday'; break;
			}
			return <div key={index} className="upcoming-session flex-container">
					<h3>{value[0].name}</h3><h4>{dayText}</h4>
					<h3>{value[0].time[0]}</h3></div>;
		}
	}

	renderUpcomingCourses() {
		//Use current day & time to calculate the closest 3 courses
		//Filtered from the selected-courses list
		if(this.props.catalog.filter(value => value.selected).length) {
			var _date = new Date();
			var _day = _date.getDay();
			var _hour = _date.getHours()+1;
			if(_hour < 7) {
				_hour = 7;
			} else if (_hour > 14) {
				_hour = 7;
				_day++;
			}
			if((_day ==0)||(_day==6)) {
				_day = 1;
				_hour = 7;
			}
			var dayItr = _day, hourItr = _hour, bool = true, arr=[];
			while((arr.length < 3)&&(bool)) {
				//Iterate through every hour and day till first 3 courses are found
				var temp = [];
				temp = this.props.catalog.map(value => {
								if((value['dayIndex'].includes(dayItr))&&(value['timeIndex'][0] === hourItr)&&(value.selected)) {
									return [value,dayItr];
								} }).filter(value => !!value);
				if(temp.length) arr.push(...temp);
				hourItr++;
				if(hourItr == 17) {
					hourItr = 7;
					dayItr++;
					if(dayItr ==6) dayItr = 1;
				}
				if((dayItr == _day)&&(hourItr == _hour)) bool = false;
			}
			return <aside className="flex-container hidden-xs hidden-sm">
						<h3 className="day-title">Upcoming Session(s)</h3>
						{arr.map(this.renderIndividualUpcomingCourse)}
					</aside>;
		}
	}

	renderSelectedCoursesContainer() {
		if(this.props.catalog.filter(value => value.selected).length) {
			//Render this section only if there is at least one course selected
			return <div><h2>Courses Selected<span className='glyphicon glyphicon-chevron-down' aria-hidden='true'>
					</span></h2>
					<div className="course-container selected-courses">
						<div className="flex-container">
				    		{this.props.catalog.map(this.renderSelectedCourses)}
				    	</div>
				  	</div></div>;
		} else {
			toastr.options = {"positionClass": "toast-bottom-center",
							"preventDuplicates": true};
						toastr.success("Course list is empty. Please select one!");
		}
	}

	renderSelectedCourses(value, index) {
		if(value.selected) {
			return <CourseIndividual key={index} courseData={value} selected={true} bgColor={value['bg-color']} />
		}
	}

	renderAvailableCourses(value, index) {
		if(!value.selected) {
			return <CourseIndividual key={index} courseData={value} selected={false} bgColor={value['bg-color']} />
		}
	}

	render() {
		return (
			<div className="courses-page">
				{this.renderPopUpModal()}
				{this.renderSelectedCoursesContainer()}
				<div>
				  	<h2>Courses Available<span className='glyphicon glyphicon-chevron-down' aria-hidden='true'></span></h2> 
				  	<div className="course-container available-courses">
				    	{this.props.catalog.map(this.renderAvailableCourses)}
					</div>
				</div>
				{this.renderUpcomingCourses()}
			</div>
		);
	}
}

CoursesMain.propTypes = {
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
export default connect(mapStateToProps)(CoursesMain);
