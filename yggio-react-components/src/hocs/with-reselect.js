/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';

const withReselect = (reselectors, {consume} = {}) => Component => {
  const WrappedComponent = props => {
    const survivingProps = _.omit(props, _.concat([], consume));
    const reselectedProps = _.mapValues(reselectors, reselect => {
      return reselect(props);
    });
    return (<Component
      {...survivingProps}
      {...reselectedProps}
            />);
  };

  return WrappedComponent;
};

export default withReselect;
