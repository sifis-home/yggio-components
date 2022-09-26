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

const clearForm = props => evt => {
  props.resetForm();
};

const handleLayerCreation = props => evt => {
  const location = _.get(props, 'location.res');
  const name = _.get(props, 'formInputs.name.value');
  const updates = {...location, layers: _.concat(location.layers, {name})};

  props.updateLocation(updates);
  props.router.push(`/locations/${props.locationId}/${props.layerId}`)
};
export default {
  handleValueChange,
  clearForm,
  handleLayerCreation,
}