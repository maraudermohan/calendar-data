import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class CourseIndividual extends React.Component {
  render() {
    return (
      <div>
      <h1>{this.props.courseData['name']}</h1>
      <h3>{this.props.courseData['author']}</h3>
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
