/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

const withAddDefaultTimeInterval = Component => props => {
  React.useEffect(() => {
    if (props.defaultValue) {
      const newHour = props.defaultValue / 3600000;

      /* eslint-disable radix */
      const hours = parseInt(newHour);
      const moduloMinute = props.defaultValue % 3600000;
      const newMinute = moduloMinute / 60000;
      const minutes = parseInt(newMinute);
      const moduloSecond = moduloMinute % 60000;
      const newSecond = moduloSecond / 1000;
      const seconds = parseInt(newSecond);
      /* eslint-enable radix */

      props.setInputValue('hours', hours);
      props.setInputValue('minutes', minutes);
      props.setInputValue('seconds', seconds);
    } else {
      console.info('something went wrong');
    }
  }, []);
  return <Component {...props} />;
};


export {
  withAddDefaultTimeInterval,
};
