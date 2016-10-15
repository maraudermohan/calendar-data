import React from 'react';
import { Link, IndexLink } from 'react-router';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  
  render() {
    return (
      <nav>
      	<IndexLink to='/' activeClassName='active'>Courses</IndexLink>
      	<Link to='/calendar' activeClassName='active'>Calendar</Link>
      	My Courses
      </nav>
    );
  }
}

export default Header;
