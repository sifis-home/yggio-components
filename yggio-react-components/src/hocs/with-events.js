/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import React from 'react';

// need to reduce (evt props) => {...} to (evt) => {...} with
// memoized function instance but replaceable props

const memoizeEventHandler = handler => {
  if (_.isFunction(handler)) {

    // the function that React will see every render
    let memoizedHandler = null;
    // returns the handlerGenerator
    return props => {
      // what gets returned from here IS the prop function
      if (!memoizedHandler) {
        // we need some handle to store & update hte current props in between renders
        let memoizedProps = null;
        // create the function
        memoizedHandler = evt => {
          // evaluates using the latest & updated values
          return handler(memoizedProps)(evt);
        };
        // the mechanism to update the memoizedProps
        memoizedHandler.update = freshProps => {
          memoizedProps = freshProps;
        };
      }
      // mutates underneath the hood
      memoizedHandler.update(props);
      // and done
      return memoizedHandler;
    };
  }
};

const withEvents = handlers => Component => {
  const handlerGenerators = _.mapValues(handlers, memoizeEventHandler);
  const InnerComponent = props => {
    // the generator returns the same memoized function every time
    const handlerProps = _.mapValues(handlerGenerators, gen => gen(props));
    return (
      <Component {...props} {...handlerProps} />
    );
  };
  return InnerComponent;
};

export default withEvents;
