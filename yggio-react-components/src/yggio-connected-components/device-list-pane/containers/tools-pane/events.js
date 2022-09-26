/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {handleExit} from './utils';

const onSetConnector = props => async () => {
  const updates = {
    connector: _.get(props, 'formInputs.setConnectorId.value'),
  };

  const updatedDevices = _.map(props.selectedDevices, deviceId => {
    props.updateDevice({deviceId, updates});
  });
  await Promise.all(updatedDevices);
  handleExit(props);
};

export default {
  onSetConnector,
};
