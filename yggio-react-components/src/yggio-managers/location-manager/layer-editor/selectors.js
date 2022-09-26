/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import fp from 'lodash/fp';
import {createSelector} from 'reselect';

const layerSelector = createSelector(
  props => _.get(props, 'location.res'),
  props => props.layerId,
  (location, layerId) => {
    if (location) {
      const layers = _.concat(
        _.get(location, 'defaultLayer'),
        _.get(location, 'layers'),
      );
      const layer = _.find(layers, layer => layer._id === layerId);
      return layer;
    }
  }
);

const layerImagesSelector = createSelector(
  props => props.images['blueprints'],
  blueprintImages => (
    fp.map(icon => {
      const label = fp.pipe(
        fp.split('/'),
        fp.last,
        fp.split('.'),
        fp.first,
      )(icon);
      return {label, value: icon};
    }, blueprintImages)
  )
);

export default {
  layer: layerSelector,
  layerImages: layerImagesSelector,
};
