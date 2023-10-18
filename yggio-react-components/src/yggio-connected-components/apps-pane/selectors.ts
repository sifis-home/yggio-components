import _ from 'lodash';
import Fuse from 'fuse.js';
import {createSelector} from 'reselect';

import type {AppTypes} from 'yggio-models';

import {getStaticApps, getYggioApps} from '../../constants/apps';
import {App, Form} from '../../types';
import {CategorizedApps} from './types';

const selectCategorizedApps = createSelector(
  (props: {appsQueryData?: AppTypes.AppWithId[]}) => props.appsQueryData,
  appsQueryData => {
    const apps = _.map(appsQueryData, app => {
      const formatted = {
        ...app,
        id: app._id,
        name: app.name,
        withAccess: true,
      };
      return formatted;
    });
    return {
      yggioApps: getYggioApps(),
      staticApps: getStaticApps(),
      apps,
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

  const yggioApps = filterApps(apps.yggioApps, nameInput, tagsInput);
  const staticApps = filterApps(apps.staticApps, nameInput, tagsInput);

  return {
    yggioApps,
    staticApps,
  };
};

export {
  selectCategorizedApps,
  selectFilteredApps,
};
