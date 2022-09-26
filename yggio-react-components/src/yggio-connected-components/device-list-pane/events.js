/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {getFormValues} from '../../utils/form-wizard';

const handleTypeCheckbox = props => type => evt => {
  const {target: {name, checked}} = evt;
  const updates = {
    ...getFormValues(props.formInputs)[name],
    [type]: checked,
  };
  props.setInputValue(name, updates);
  props.setCurrentPage(1);
};

const setDeviceSelected = props => ({deviceId, selected}) => {
  if (selected) {
    const updates = _.concat(props.selectedDevices, deviceId);
    props.setSelectedDevices(updates);
  } else {
    const updates = _.without(props.selectedDevices, deviceId);
    props.setSelectedDevices(updates);
  }
};

export default {
  setDeviceSelected,
  handleTypeCheckbox,
};
