/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import Fuse from 'fuse.js';
import {createSelector} from 'reselect';

import {getStaticApps, getYggioApps} from '../../constants/apps';
import {ClientApp, App, Form} from '../../types';
import {CategorizedApps} from './types';

const selectCategorizedApps = createSelector(
  (props: {clientAppsQueryData?: ClientApp[]}) => props.clientAppsQueryData,
  clientAppsQueryData => {

    const clientApps = _.map(clientAppsQueryData, clientApp => {
      const formatted: App = {
        id: clientApp._id,
        name: clientApp.client_id,
        tagline: clientApp.info,
        url: clientApp.redirect_uri[0],
      };
      return formatted;
    });

    return {
      yggioApps: getYggioApps(),
      staticApps: getStaticApps(),
      clientApps,
    };
  }
);

const filterApps = (apps: App[], nameInput: string, tagsInput: string[]) => {
  let filteredApps = apps;

  // Filter with tags
  if (!_.isEmpty(tagsInput)) {
    filteredApps = _.filter(filteredApps, app => {
      const foundTags = _.intersection(app.tags, tagsInput);
      return foundTags.length === tagsInput.length;
    });
  }

  // Filter with name
  if (nameInput) {
    const fuse = new Fuse(filteredApps, {keys: ['name'], threshold: 0.5});
    const result = fuse.search(nameInput);
    filteredApps = _.map(result, 'item');
  }

  return filteredApps;
};


const selectFilteredApps = (apps: CategorizedApps, form: Form): CategorizedApps => {
  const nameInput = form.formInputs.name.value as string;
  const tagsInput = form.formInputs.tags.value as string[];

  const clientApps = filterApps(apps.clientApps, nameInput, tagsInput);
  const yggioApps = filterApps(apps.yggioApps, nameInput, tagsInput);
  const staticApps = filterApps(apps.staticApps, nameInput, tagsInput);

  return {
    yggioApps,
    staticApps,
    clientApps,
  };
};

export {
  selectCategorizedApps,
  selectFilteredApps,
};
