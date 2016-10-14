import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import CoursesMain from './components/CoursesMain';
import CalendarMain from './components/CalendarMain';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={CoursesMain} />
    <Route path="calendar" component={CalendarMain} />
  </Route>
);
