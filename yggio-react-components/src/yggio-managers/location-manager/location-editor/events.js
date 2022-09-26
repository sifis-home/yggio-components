/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';

const handleValueChange = props => evt => {
  const {target: {value, name}} = evt;
  props.setInputValue(name, value);
};

const handleLocationEdit = props => evt => {
  const updates = {
    ...props.currentLocation,
    name: _.get(props, 'formInputs.name.value'),
    description: _.get(props, 'formInputs.description.value'),
  };
  props.updateLocation(updates);
  props.router.push('/locations')
};


export default {
  handleValueChange,
  handleLocationEdit,
};
