import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import $ from 'jquery';

class PopupModal extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		$(".courses-page").css({"top":"-"+$(window).scrollTop()+"px","position":'fixed'});
		$("#popup-modal").css("opacity","1");
	}

	componentWillUnmount() {
		console.log("unmore");
		$(".courses-page").css({"top":'',"position":''});
		$("#popup-modal").css("opacity","0");
	}

	composePopupMessage() {
		if(this.props.timeIndex.currentTask === 'Remove') {
			return ['This Course will be removed from your schedule. Are you sure?',
					this.submitHandlerSelectedCourses.bind(this)];
		} else {
			return ['This Course will be added to your schedule. Are you sure?',
					this.submitHandlerAvailableCourses.bind(this)];
		}
	}

	submitHandlerAvailableCourses() {
		this.props.dispatch(actions.addCourseToSelection(Object.assign({},this.props.timeIndex.currentCourse,{'selected':true})));
	}

	submitHandlerSelectedCourses(id) {
		this.props.dispatch(actions.removeCourseFromSelection(Object.assign({},this.props.timeIndex.currentCourse,{'selected':false})));
	}

	closePopupModalEvent() {
		this.props.dispatch(actions.pickCourseToSelectOrDeselect('', ''));
	}

	render() {
		var style = {backgroundColor: this.props.timeIndex.currentCourse['bg-color']},
				popupData = this.composePopupMessage();
		return (<div id="popup-modal" className="flex-container" onClick={this.closePopupModalEvent.bind(this)}>
					<div id="message-box" className="flex-container">
						<h3 style={style}>{this.props.timeIndex.currentCourse.name}</h3>
						<p>{popupData[0]}</p>
						<btn className="btn btn-primary" onClick={popupData[1]}>{this.props.timeIndex.currentTask}</btn>
					</div>
				</div>);
	}
}

PopupModal.propTypes = {
	catalog: PropTypes.array.isRequired,
	timeIndex: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    catalog : state.catalog,
    timeIndex : state.timeIndex
  };
}
export default connect(mapStateToProps)(PopupModal);
