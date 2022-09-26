/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

const withFetchDeviceModelNames = Component => props => {
  React.useEffect(() => {
    props.getDeviceModelNames();
  }, []);
  return <Component {...props} />;
};

const withOnDeviceModelNameSelected = Component => props => {
  React.useEffect(() => {
    if (props.formInputs.deviceModelName.value) {
      props.fetchTranslators(props.formInputs.deviceModelName.value);
    }
  }, [props.formInputs.deviceModelName.value]);

  return <Component {...props} />;
};

export {
  withFetchDeviceModelNames,
  withOnDeviceModelNameSelected,
};
