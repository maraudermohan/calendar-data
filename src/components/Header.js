import React from 'react';
import { Link, IndexLink } from 'react-router';

//Presentational component for dynamically changing links without resetting the REDUX store
class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  
  render() {
    return (
      <header className="flex-container">
        <nav>
        	<IndexLink to='/' activeClassName='active'>Courses</IndexLink>
        	<Link to='/calendar' activeClassName='active'>Calendar</Link>
        </nav>
        <h4>My Course-Calendar</h4>
      </header>
    );
  }
}

export default Header;
