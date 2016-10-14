import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        This is from managercourse
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

export default connect(mapStateToProps)(ManageCoursePage);
