import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {timeConflictCalculator} from './timeConflictCalculator';
import $ from 'jquery';

class PopupModal extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			newCalendar : {}
		}
	}

	componentDidMount() {
		$(".courses-page").css({"top":"-"+$(window).scrollTop()+"px","position":'fixed'});
		$("#popup-modal").css("opacity","1");
		this.setState({newCalendar: timeConflictCalculator(this.props.catalog,this.props.currentSelection)});
	}

	componentWillUnmount() {
		$(".courses-page").css({"top":'',"position":''});
		$("#popup-modal").css("opacity","0");
	}

	composePopupMessage() {
		if(this.props.currentSelection.currentTask === 'Remove') {
			return ['This Course will be removed from your schedule. Are you sure?',
					this.submitHandlerSelectedCourses.bind(this)];
		} else {
			var str = '',
				id1 = this.props.currentSelection.currentCourse.id;
				console.log(this.state.newCalendar);
			/*if(this.state.newCalendar.day1.filter(value => { if(value.id === id1){ return value.leftConflicts.length + value.rightConflicts.length;}}).length) {
				str += 'Monday ';
			} 
			if(this.state.newCalendar.day2.filter(value => { if(value.id === id1){ return value.leftConflicts.length + value.rightConflicts.length;}}).length) {
				str += 'Tuesday ';
			}
			if(this.state.newCalendar.day3.filter(value => { if(value.id === id1){ return value.leftConflicts.length + value.rightConflicts.length;}}).length) {
				str += 'Wednesday ';
			}
			if(this.state.newCalendar.day4.filter(value => { if(value.id === id1){ return value.leftConflicts.length + value.rightConflicts.length;}}).length) {
				str += 'Thursday ';
			}
			if(this.state.newCalendar.day5.filter(value => { if(value.id === id1){ return value.leftConflicts.length + value.rightConflicts.length;}}).length) {
				str += 'Friday ';
			}*/
			if(str.length) {
				str = "Time conflict found on " + str.split(' ').filter(x => !!x).join(', ');
				str += ". Do you still want to add?";
			} else {
				str = 'This course will be added to your schedule. Are you sure?';
			}
			console.log(str);
			return [str, this.submitHandlerAvailableCourses.bind(this)];
		}
	}

	submitHandlerAvailableCourses(event) {
		event.stopPropagation();
		this.props.dispatch(actions.addCourseToSelection(Object.assign({},this.props.currentSelection.currentCourse,{'selected':true}),this.state.newCalendar));
	}

	submitHandlerSelectedCourses(event) {
		event.stopPropagation();
		this.props.dispatch(actions.removeCourseFromSelection(Object.assign({},this.props.currentSelection.currentCourse,{'selected':false}),this.state.newCalendar));
	}

	closePopupModalEvent() {
		this.props.dispatch(actions.pickCourseToSelectOrDeselect('', ''));
	}

	render() {
		var style = {backgroundColor: this.props.currentSelection.currentCourse['bg-color']},
				popupData = this.composePopupMessage();
		return (<div id="popup-modal" className="flex-container" onClick={this.closePopupModalEvent.bind(this)}>
					<div id="message-box" className="flex-container">
						<h3 style={style}>{this.props.currentSelection.currentCourse.name}</h3>
						<p>{popupData[0]}</p>
						<btn className="btn btn-primary" onClick={popupData[1]}>{this.props.currentSelection.currentTask}</btn>
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
