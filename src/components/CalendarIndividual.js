import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import PopupModal from './PopupModal';
import * as actions from '../actions';
import $ from 'jquery';

//Presentational component which renders all selected course-blocks in a single day
class CalendarIndividual extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			cssArray: []
		}	
	}

	componentDidMount() {
		this.calculateCSSleftAndWidth();
	}

	componentWillReceiveProps() {
		this.calculateCSSleftAndWidth();
	}

	calculateCSSleftAndWidth() {
		//Called from : Mount & receieve props lifecycle methods
		//Creates and updates cssArray
		var cssArray=[];
		var dayArray = this.props.calendarModel[this.props.dayID];
		for(var x in dayArray){
			var left = 0, width = 100;
			if(dayArray[x].leftConflicts.length) {
				//css 'left' decided by course-blocks with conflicts on leftside 
				left = Math.max(...cssArray.map((value,index) => {
						if((index<x)&&(dayArray[x].leftConflicts.includes(index))) return value[2]})
						.filter(value => !!value));
			}
			//css 'width' decided by course-blocks with conflicts on rightside
			width = (100 - left) / (dayArray[x].rightConflicts.length + 1);
			cssArray.push([left,width, left+width]);
		}
		this.setState({cssArray});
	}

	renderCourseBlocks(value,index) {
		if(this.state.cssArray.length) {
			var offsetFactor = 10;
			var courseData = this.props.catalog.find(x => x.id === value.id);
			var style = {
				//css 'top' & 'height' calculated by start time & duration
				top: ((value.time[0] > 13)?(7+value.time[0]%7):(value.time[0]%7))*offsetFactor+'%',
				height: 'calc('+ ((value.time[1] - value.time[0]) * offsetFactor) +'% - 4px)',
	    		left: this.state.cssArray[index][0]+"%",
	    		width: 'calc('+ this.state.cssArray[index][1] + '% - 4px)',
	    		backgroundColor: courseData['bg-color'] }
			return <div key={value.id} className='course-in-calendar' data-id={courseData.id} style={style}>{courseData.name}</div>
		}
	}

	render() {
		return (
			<div className="calendar-individual">
				<ul className='flex-container'>
					<li className="clock7"></li>
					<li className="clock8"></li>
					<li className="clock9"></li>
					<li className="clock10"></li>
					<li className="clock11"></li>
					<li className="clock12"></li>
					<li className="clock13"></li>
					<li className="clock14"></li>
					<li className="clock15"></li>
					<li className="clock16"></li>
				</ul>
				{this.props.calendarModel[this.props.dayID].map(this.renderCourseBlocks.bind(this))}
			</div>
		);
	}
}

CalendarIndividual.propTypes = {
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
export default connect(mapStateToProps)(CalendarIndividual);
