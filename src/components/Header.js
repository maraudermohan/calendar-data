import React from 'react';
import { Link, IndexLink } from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <nav>
      	<IndexLink to="/" activeClassName="active">Courses</IndexLink>
      	<Link to="/calendar" activeClassName="active">Calendar</Link>
      </nav>
    );
  }
}

export default Header;
