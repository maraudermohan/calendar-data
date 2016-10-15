import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class CourseIndividual extends React.Component {
  render() {
  	var style = {
  		backgroundColor: this.props.bgColor
  	};
    return (
      <div className="course-box" data-id={this.props.courseData.id}>
      	<div className="flex-container" style={style}>
      		<h2>{this.props.courseData.name}</h2>
      	</div>
      	<div className="flex-container">
      		<p className="author-text">{this.props.courseData.author}</p>
      		<p className="day-text">{this.props.courseData.days.join(', ')}&nbsp;&nbsp;</p>
	      	<p className="time-text">&nbsp;&nbsp;{this.props.courseData.time.join(' - ')}</p>
      	</div>
      </div>
    );
  }
}

CourseIndividual.propTypes = {
	catalog: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    catalog : state.catalog
  };
}
export default connect(mapStateToProps)(CourseIndividual);
