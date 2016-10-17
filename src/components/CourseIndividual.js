import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

//Presentational component - which displays the current course data
class CourseIndividual extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderCourseName() {
    var style = (this.props.selected)? {backgroundColor: this.props.bgColor} : {};
    return <div className="flex-container" style={style}>
              <h2>{this.props.courseData.name}</h2>
            </div>;
  }

  renderGlyphiconContainer() {
    var className = (this.props.selected)? 'glyphicon glyphicon-remove' : 'glyphicon glyphicon-ok';
    return <div className="glyphicon-container">
              <span className={className} aria-hidden="true"></span>
            </div>;
  }

  render() {
  	var style = {
  		backgroundColor: this.props.bgColor
  	};
    return (
      <div className="course-box flex-container" data-id={this.props.courseData.id}>
        <div className="for-bg-color" style={style}></div>
        <div className="course-box-content">
        	{this.renderCourseName()}
        	<div className="flex-container">
        		<p className="author-text">{this.props.courseData.author}</p>
        		<p className="day-text">{this.props.courseData.days.join(', ')}&nbsp;&nbsp;</p>
  	      	<p className="time-text">&nbsp;&nbsp;{this.props.courseData.time.join(' - ')}</p>
        	</div>
        </div>
        {this.renderGlyphiconContainer()}
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
