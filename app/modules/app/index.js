/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './dashboard';

import reducer from './redux/reducer';
import saga from './redux/saga';

const key = 'app';

export function App({}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {}, []);

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(App);
