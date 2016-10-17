import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadCatalogFromJSON} from './actions';
import './styles/styles.less'; 
import '../node_modules/bootstrap/less/bootstrap.less';
import '../node_modules/toastr/toastr.less';

const store = configureStore();
//Ajax calls to load the catalog JSON into REDUX STORE, when the app initiates
fetch("/catalog").then(response => response.json()).then(function(json) {
	store.dispatch(loadCatalogFromJSON(json.courses));
});
fetch("/bigcatalog").then(response => response.json()).then(function(json) {
	console.log("Store Initiated");
	store.dispatch(loadCatalogFromJSON(json.courses));
});

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
