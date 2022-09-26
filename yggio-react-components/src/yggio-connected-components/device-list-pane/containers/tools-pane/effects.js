/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import React from 'react';

const withRouteCheck = Component => props => {
  if (!_.size(props.selectedDevices)) {
    props.setPage('default');
  }
  return <Component {...props} />;
};

export {
  withRouteCheck,
};
