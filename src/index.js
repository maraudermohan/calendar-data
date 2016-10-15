import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadCatalogFromJSON} from './actions';
import './styles/styles.css'; 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();
fetch("/bigcatalog").then(response => response.json()).then(function(json) {
	store.dispatch(loadCatalogFromJSON(json.courses));
});
fetch("/catalog").then(response => response.json()).then(function(json) {
	console.log("Store Initiated");
	store.dispatch(loadCatalogFromJSON(json.courses));
});

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
