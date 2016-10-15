import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CourseIndividual from './CourseIndividual';

class CoursesMain extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	renderIndividualCourses(value, index) {
		return <CourseIndividual key={index} courseData={value} />
	}

	render() {
		return (
		  <div>
		    {this.props.catalog.map(this.renderIndividualCourses)}
		  </div>
		);
	}
}

CoursesMain.propTypes = {
	catalog: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    catalog : state.catalog
  };
}
export default connect(mapStateToProps)(CoursesMain);
