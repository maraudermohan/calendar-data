import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// Presentational component for dynamically changing links without resetting the REDUX store
const Header = ({
  location: {
    pathname = '',
  },
}) => (
  <header className="flex-container">
    <nav>
      <Link to="/courses" className={pathname === '/courses' ? 'active' : ''}>Courses</Link>
      <Link to="/courses/calendar" className={pathname === '/courses/calendar' ? 'active' : ''}>Calendar</Link>
    </nav>
    <h4>My Course-Calendar</h4>
  </header>
);

Header.propTypes = {
  location: PropTypes.objectOf(PropTypes.string),
};

export default withRouter(Header);
