/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {createSelector} from 'reselect';
import {jobTypes} from 'yggio-types';

const installationErrorsSelector = createSelector(
  (props: {job: jobTypes.Job}) => props.job,
  (props: {items: Record<string, string>[]}) => props.items,
  (job, items) => {
    const acc: Record<string, string>[] = [];
    const errors = _.reduce(items, (result, item, index) => {
      const jobItem = job.items[index];
      if (jobItem.status === 'failed') {
        result.push({...item, error: jobItem.errorMessage!});
      }
      return result;
    }, acc);
    return errors;
  }
);

const topInstallationErrorsSelector = createSelector(
  (props: {installationErrors: Record<string, string>[]}) => props.installationErrors,
  errors => {
    if (!errors) return [];
    const acc: Record<string, number> = {};
    const errorTypes = _.reduce(errors, (result, err) => ({
      ...result,
      [err.error]: (result[err.error] || 0) + 1
    }), acc);
    const sortable = Object.entries(errorTypes);
    sortable.sort((a, b) => b[1] - a[1]);
    const topErrorsArray = sortable.slice(0, 3);
    const topErrors = _.map(topErrorsArray, err => ({
      error: err[0],
      occurences: err[1],
    }));
    return topErrors;
  }
);

export {
  installationErrorsSelector,
  topInstallationErrorsSelector,
};
