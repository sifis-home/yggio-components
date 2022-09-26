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

const handleLayerEdit = props => evt => {
  const location = _.get(props, 'location.res');
  const name = _.get(props, 'formInputs.name.value') || _.get(props, 'layer.name');
  const image = _.get(props, 'formInputs.image.value') || _.get(props, 'layer.image');
  const updates = {name, image};
  if (props.layer._id === _.get(location, 'defaultLayer._id')) {
    props.updateLocation({...location, defaultLayer: {..._.get(location, 'defaultLayer'), ...updates}});
  } else {
    const layerIndex = _.findIndex(location.layers, {_id: props.layer._id});
    const layers = location.layers.slice();
    layers[layerIndex] = {...layers[layerIndex], ...updates};
    props.updateLocation({...location, layers});
  }
  props.router.push(`/locations/${props.locationId}/${props.layerId}`)
};


export default {
  handleValueChange,
  handleLayerEdit,
};
