/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {createSelector} from 'reselect';

const transformedAvailableTranslatorsSelector = createSelector(
  props => props.availableTranslators,
  availableTranslators => {
    const uniq = _.uniqBy(availableTranslators, translator => {
      return translator.name + translator.username;
    });

    const result = _.map(uniq, translator => {
      return {
        name: translator.name,
        username: translator.username,
        identifier: translator.name + translator.username,
        versions: [],
      };
    });

    _.forEach(availableTranslators, translator => {
      const index = _.findIndex(result, {name: translator.name, username: translator.username});
      result[index].versions.push(translator.version);
    });
    return result;
  }
);

const availableTranslatorsOptionsSelector = createSelector(
  props => props.addedTranslators,
  transformedAvailableTranslatorsSelector,
  (addedTranslators, transformedAvailableTranslators) => {

    const filteredAvailableTranslators = _.filter(transformedAvailableTranslators, item => {
      const isAlreadyAdded = !!_.find(addedTranslators, {name: item.name, username: item.username});
      return !isAlreadyAdded;
    });

    return _.map(filteredAvailableTranslators, (translator, index) => ({
      label: `${translator.name}- ${translator.username}`,
      value: translator.identifier,
      key: index,
    }));
  }
);

export default {
  availableTranslatorsOptions: availableTranslatorsOptionsSelector,
  transformedAvailableTranslators: transformedAvailableTranslatorsSelector,
};
