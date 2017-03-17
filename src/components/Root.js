import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './App';

// v4 react-router no longer support browserHistory, use this instead
const history = createBrowserHistory();
const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;
