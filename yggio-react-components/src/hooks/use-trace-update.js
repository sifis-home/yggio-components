/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';

// for debugging purpose
const useTraceUpdate = props => {
  const prev = React.useRef(props);
  React.useEffect(() => {
    const changedProps = _.reduce(props, (acc, val, key) => {
      if (prev.current[key] !== val) {
        acc[key] = [prev.current[key], val];
      }
      return acc;
    }, {});
    const changedKeys = _.keys(changedProps);
    if (_.size(changedKeys)) {
      console.info('%cChanged props:', `color: #00FFFF;`, changedProps);
    }
    prev.current = props;
  });
};

export default useTraceUpdate;
