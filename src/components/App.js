import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from './Header'

class App extends React.Component {
  componentDidMount() {
    fetch("/catalog").then(response => response.json()).then(function(json) {
        console.log(json);
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

export default connect(mapStateToProps)(App);
