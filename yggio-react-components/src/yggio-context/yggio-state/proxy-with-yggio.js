/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// proxy-with-yggio.js

// NOT WORKING!!!!

// import withYggio from './with-yggio';
import _ from 'lodash';
import React from 'react';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';

import {
  reducer as yggioReducer,
  actions as yggioActions,
} from '.';

const middlewares = [thunk];
const appliedMiddlewares = compose(applyMiddleware(...middlewares));

/* eslint-disable import/no-mutable-exports */
let store = null;
/* eslint-enable import/no-mutable-exports */

// /////
//  The main guy
// ////

const withYggio = yggioMappings => Component => {

  // these should be validated
  const {
    mapYggioStateToProps,
    mapYggioActionsToProps,
    // mapYggioActionsToEffects,
  } = yggioMappings;

  // the store is a singleton!
  if (!store) {
    store = createStore(yggioReducer, appliedMiddlewares);
  }

  // return connect(mapYggioStateToProps, mapDispatchToProps)()
  const WrappedComponent = props => {
    const mapStateToProps = state => {
      // empty if mapYggioActionsToProps not specified
      if (!_.isFunction(mapYggioStateToProps)) {
        return {};
      }
      // this one is trivial (at least for now)
      // this might change if we mutate redux-state
      // compared to what is visible. probably not though
      const yggioStateProps = mapYggioStateToProps(state);
      return yggioStateProps;
    };
    const mapDispatchToProps = dispatch => {
      // empty if mapYggioActionsToProps not specified
      if (!_.isFunction(mapYggioActionsToProps)) {
        return {};
      }
      // otherwise extract the projection
      const actionProps = mapYggioActionsToProps(yggioActions);
      // ///////
      // distribute the dispatch
      const recursiveDispatcher = (actionItem, itemKey) => {
        if (_.isFunction(actionItem)) {
          // wrap it up -- this works for both sync & async actions
          return (...args) => actionItem(...args)(dispatch);
        }
        if (_.isObject(actionItem)) {
          // nested objects get recursed
          return _.mapValues(actionItem, (subItem, key) => recursiveDispatcher(subItem, key));
        }
        // if we got here then there is a mistake
        throw new Error(`DevErr: Invalid yggio actionItem: ${itemKey}`);
      };
      const yggioDispatchActions = recursiveDispatcher(actionProps);
      return yggioDispatchActions;
    };

    // and connect to redux - wrap again for effects
    // Would it be better to do this with subclassing?
    const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Component);
    return (
      <Provider store={store}>
        <ConnectedComponent {...props} />
      </Provider>
    );
  };
  // and done
  return WrappedComponent;
};


export default withYggio;
export {
  store,
};
