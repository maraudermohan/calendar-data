import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import configureStore from './store/configureStore';
import Header from './components/Header';
import 'reactProjects/bootstrap.min.css';
import './styles/courses-calendar.css';

const CoursesMain = lazy(() => import('./components/CoursesMain'));
const CalendarMain = lazy(() => import('./components/CalendarMain'));

const store = configureStore();

const CoursesCalendar = () => (
  <Provider store={store}>
    <Suspense fallback={<div />} className="page__courses-calendar">
      <main>
        <Header />
        <Switch>
          <Route path="/courses" component={CoursesMain} exact />
          <Route path="/courses/calendar" component={CalendarMain} exact />
        </Switch>
      </main>
    </Suspense>
  </Provider>
);

export default CoursesCalendar;
