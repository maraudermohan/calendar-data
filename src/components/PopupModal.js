import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {timeConflictCalculator} from './timeConflictCalculator';
import $ from 'jquery';
import toastr from 'toastr';

//Container component which calls time-conflict-calculator function to identify time conflicts
class PopupModal extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			newCalendar : {}
		}
	}

	componentDidMount() {
		$(".courses-page").css({"top":"-"+$(window).scrollTop()+"px","position":'fixed'});
		$("#popup-modal").animate({opacity:'1'},300);
		this.setState({newCalendar: timeConflictCalculator(this.props.catalog,this.props.currentSelection)});
	}

	componentWillUnmount() {
		$(".courses-page").css({"top":'',"position":''});
	}

	composePopupMessage() {
		if(this.props.currentSelection.currentTask === 'Add') {
			//Calls time-conflict-calculator function, which returns a modified calendar model
			//Modified calendar model contains information about all time conflicts
			var newCalendar = timeConflictCalculator(this.props.catalog,this.props.currentSelection);
			var str = '',
				id1 = this.props.currentSelection.currentCourse.id;
			if(newCalendar.day1.filter(value => { if(value.id === id1){ return value.leftConflicts.length + value.rightConflicts.length;}}).length) {
				str += 'Monday ';
			} 
			if(newCalendar.day2.filter(value => { if(value.id === id1){ return value.leftConflicts.length + value.rightConflicts.length;}}).length) {
				str += 'Tuesday ';
			}
			if(newCalendar.day3.filter(value => { if(value.id === id1){ return value.leftConflicts.length + value.rightConflicts.length;}}).length) {
				str += 'Wednesday ';
			}
			if(newCalendar.day4.filter(value => { if(value.id === id1){ return value.leftConflicts.length + value.rightConflicts.length;}}).length) {
				str += 'Thursday ';
			}
			if(newCalendar.day5.filter(value => { if(value.id === id1){ return value.leftConflicts.length + value.rightConflicts.length;}}).length) {
				str += 'Friday ';
			}
			if(str.length) {
				str = "This course has time conflict(s) on " + str.split(' ').filter(x => !!x).join(', ');
				return <h4><span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><br />{str}.<br />Do you still want to add?</h4>;
			} else {
				str = 'This course will be added to your calendar. Are you sure?';
				return <h4>{str}</h4>;
			}
		} else if(this.props.currentSelection.currentTask === 'Remove') { 
			str = 'This course will be removed from your calendar. Are you sure?';
			return <h4>{str}</h4>;
		} else { 
			return <h4>Author : {this.props.currentSelection.currentCourse.author}<br /><br />
					Days : {this.props.currentSelection.currentCourse.days.join(', ')}<br /><br />
					Time : {this.props.currentSelection.currentCourse.time.join(' - ')}
					</h4>;
		}
	}

	assignPopUpBtnHandler() {
		//Button text altered based on the current intended task
		if(this.props.currentSelection.currentTask === 'Add') {
			return <btn className="btn btn-primary" onClick={this.submitHandlerAvailableCourses.bind(this)}>
			Add</btn>;
		} else {
			return <btn className="btn btn-primary" onClick={this.submitHandlerSelectedCourses.bind(this)}>
			Remove</btn>;
		}
	}

	submitHandlerAvailableCourses(event) {
		//Updates REDUX STORE adding the course , setting the 'selected' boolean true
		event.stopPropagation();
		toastr.options = {"positionClass": "toast-bottom-center"}
		toastr.success("Course successfully added!");
		this.props.dispatch(actions.addCourseToSelection(Object.assign({},this.props.currentSelection.currentCourse,{'selected':true}),this.state.newCalendar));
	}

	submitHandlerSelectedCourses(event) {
		//Updates REDUX STORE removing the course , setting the 'selected' boolean false
		event.stopPropagation();
		toastr.options = {"positionClass": "toast-bottom-center"}
		toastr.success("Course Removed!");
		this.props.dispatch(actions.removeCourseFromSelection(Object.assign({},this.props.currentSelection.currentCourse,{'selected':false}),this.state.newCalendar));
	}

	closePopupModalEvent() {
		this.props.dispatch(actions.pickCourseToCurrentSelection('', ''));
	}

	render() {
		var style = {backgroundColor: this.props.currentSelection.currentCourse['bg-color']},
				popupData = this.composePopupMessage();
		return (<div id="popup-modal" className="flex-container" onClick={this.closePopupModalEvent.bind(this)}>
					<div id="message-box" className="flex-container">
						<h3 style={style}>{this.props.currentSelection.currentCourse.name}</h3>
						{this.composePopupMessage()}
						{this.assignPopUpBtnHandler()}
						<p>(Click anywhere else to cancel)</p>
					</div>
				</div>);
	}
}


PopupModal.propTypes = {
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
export default connect(mapStateToProps)(PopupModal);
