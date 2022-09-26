/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {map} from 'lodash/fp';
import {createSelector} from 'reselect';

const deviceModelNameOptionsSelector = createSelector(
  props => props.getDeviceModelNamesRequest,
  request => map(modelName => ({
    value: modelName.value,
    label: modelName.displayName,
  }), request.res)
);

const translatorOptionsSelector = createSelector(
  props => props.translators,
  translators => map(trans => ({
    value: trans._id,
    label: trans.name,
  }), translators)
);

export default {
  deviceModelOptions: deviceModelNameOptionsSelector,
  translatorOptions: translatorOptionsSelector,
};
