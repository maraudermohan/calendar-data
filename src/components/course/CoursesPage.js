import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {

    return (
      <div>
        this is from coursepage
      </div>
    );
  }
}

CoursesPage.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

export default connect(mapStateToProps)(CoursesPage);
