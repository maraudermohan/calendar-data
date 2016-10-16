import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CourseIndividual from './CourseIndividual';
import PopupModal from './PopupModal';
import * as actions from '../actions';
import $ from 'jquery';

class CoursesMain extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		this.calcCourseContainerWidth();
		this.attachEventHandlersCourseContainers();
	}

	componentDidUpdate() {
		this.calcCourseContainerWidth();
		this.attachEventHandlersCourseContainers();
	}

	attachEventHandlersCourseContainers() {
		$(".course-container").off('click')
		.on("click","div.course-box",this.assignTaskForPickedCourse.bind(this));
	}

	calcCourseContainerWidth() {
		var numOfSelected = this.props.catalog.filter(value => value['selected']);
		var str = (numOfSelected.length > 2)? numOfSelected.length*40 + "%" :'100%';
		$(".course-container.selected-courses > .flex-container").css("width",str);
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

	renderSelectedCourses(value, index) {
		if(value.selected) {
			return <CourseIndividual key={index} courseData={value} bgColor={value['bg-color']}/>
		}
	}

	renderAvailableCourses(value, index) {
		if(!value.selected) {
			return <CourseIndividual key={index} courseData={value} />
		}
	}

	render() {
		return (
			<div className="courses-page">
				{this.renderPopUpModal()}
				<h2>Courses Selected</h2>
				<div className="course-container selected-courses">
					<div className="flex-container">
			    		{this.props.catalog.map(this.renderSelectedCourses)}
			    	</div>
			  	</div>
			  	<h2>Courses Available</h2> 
			  	<div className="course-container available-courses">
			    	{this.props.catalog.map(this.renderAvailableCourses)}
				</div>
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
