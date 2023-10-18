/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import Fuse from 'fuse.js';
import {createSelector} from 'reselect';

import {getConfig} from '../../yggio-config';
import {TranslatorPreference, Translators, Users} from '../../types';
import {GroupedTranslator} from './types';

const selectIdKeyedUsernames = createSelector(
  (props: {users?: Users}) => props.users,
  users => {
    const config = getConfig();

    // Add yggio-core-user (and rename it Sensative)
    const acc: Record<string, string> = {
      [config.yggioCoreUser]: 'Sensative'
    };

    const idKeyedUsernames = _.reduce(users, (result, user) => {
      result[user._id] = user.username;
      return result;
    }, acc);

    return idKeyedUsernames;
  }
);

const selectFormattedTranslatorPreferences = createSelector(
  (props: {translatorPreferences: TranslatorPreference[]}) => props.translatorPreferences,
  (props: {idKeyedUsernames: Record<string, string>}) => props.idKeyedUsernames,
  (props: {groupedTranslators: GroupedTranslator[]}) => props.groupedTranslators,
  (translatorPreferences, idKeyedUsernames, groupedTranslators) => {
    const formatted = _.map(translatorPreferences, tp => {
      const identifier = `${tp.name}-${tp.userId}`;
      const groupedTranslator = _.find(groupedTranslators, {identifier});
      return {
        name: tp.name,
        identifier,
        username: idKeyedUsernames[tp.userId],
        version: tp.version,
        upgradePolicy: tp.upgradePolicy,
        availableVersions: groupedTranslator?.versions,
      };
    });
    return formatted;
  }
);

const selectGroupedTranslators = createSelector(
  (props: {idKeyedUsernames: Record<string, string>}) => props.idKeyedUsernames,
  (props: {translators?: Translators}) => props.translators,
  (idKeyedUsernames, translators) => {
    const groupedTranslators: GroupedTranslator[] = [];
    _.forEach(translators, translator => {
      const index = _.findIndex(groupedTranslators, {
        name: translator.name,
        userId: translator.userId,
      });
      if (index === -1) {
        groupedTranslators.push({
          name: translator.name,
          userId: translator.userId,
          identifier: `${translator.name}-${translator.userId}`,
          username: idKeyedUsernames[translator.userId],
          versions: [translator.version],
        });
      } else {
        groupedTranslators[index].versions.push(translator.version);
      }
    });
    return groupedTranslators;
  }
);

const selectFilteredGroupedTranslators = createSelector(
  (props: {groupedTranslators: GroupedTranslator[]}) => props.groupedTranslators,
  (props: {name: string}) => props.name,
  (props: {addedTranslators: TranslatorPreference[]}) => props.addedTranslators,
  (groupedTranslators, name, addedTranslators) => {

    if (_.isEmpty(groupedTranslators)) return [];

    let result = _.cloneDeep(groupedTranslators);

    // Flag already added translators
    _.forEach(result, group => {
      const isAdded = _.some(addedTranslators, addedTrans => {
        return addedTrans.name === group.name && group.userId === addedTrans.userId;
      });
      group.isAdded = isAdded;
    });

    // Filter wih name
    if (!_.isEmpty(name)) {
      const fuse = new Fuse(result, {keys: ['name'], threshold: 0.5});
      const searchResult = fuse.search(name);
      result = _.map(searchResult, 'item');
    }

    return result;
  }
);

export {
  selectIdKeyedUsernames,
  selectFormattedTranslatorPreferences,
  selectGroupedTranslators,
  selectFilteredGroupedTranslators,
};
