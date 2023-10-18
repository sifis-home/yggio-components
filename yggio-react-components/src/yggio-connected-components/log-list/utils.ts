/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {formatDistance, parseISO, differenceInDays, format} from 'date-fns';

import {LogTypes} from 'yggio-models';
import {getFormValues} from '../../utils/form-wizard';
import {Form} from '../../types';
import {
  VERIFIED_FILTER_VALUES,
} from './constants';

interface Params {
  type?: string;
  priority?: string;
  category?: LogTypes.LogCategory;
  message?: LogTypes.LogMessage;
  isVerified?: LogTypes.LogIsVerified;
}

const extractFilterParams = (filterForm: Form) => {
  const filters = getFormValues(filterForm.formInputs);
  const typeFilter = filters.typeFilter as LogTypes.LogType[];
  const priorityFilter = filters.priorityFilter as LogTypes.LogCategory[];
  const categoryFilter = filters.categoryFilter as LogTypes.LogCategory;
  const messageFilter = filters.messageFilter as string;
  const verifiedFilter = filters.verifiedFilter as string;

  const params: Params = {};
  if (!_.isEmpty(typeFilter)) {
    params.type = _.join(typeFilter, ',');
  }
  if (!_.isEmpty(priorityFilter)) {
    params.priority = _.join(priorityFilter, ',');
  }
  if (!_.isEmpty(categoryFilter)) {
    params.category = categoryFilter;
  }
  if (!_.isEmpty(messageFilter)) {
    params.message = _.trim(messageFilter);
  }
  if (!_.isEmpty(verifiedFilter)) {
    params.isVerified = verifiedFilter === VERIFIED_FILTER_VALUES.verified;
  }
  return params;
};

const checkAlarmsFilterIsActive = (filterForm: Form) => {
  const filters = getFormValues(filterForm.formInputs);
  const isActive = _.every([
    _.isEmpty(filters.typeFilter),
    _.isEmpty(filters.categoryFilter),
    _.isEmpty(filters.messageFilter),
    filters.verifiedFilter === 'unverified',
    _.isEqual((filters.priorityFilter as string[]).sort(), ['high', 'severe']),
  ]);
  return isActive;
};

const formatTime = (time: string) => {
  const logDate = parseISO(time);
  const now = new Date();
  const diff = differenceInDays(now, logDate);
  if (diff > 5) {
    return format(logDate, 'dd/MM yyyy');
  }
  return `${formatDistance(now, logDate)} ago`;
};

const formatFullTime = (time: string) => {
  const logDate = parseISO(time);
  return format(logDate, 'dd/MM yyyy hh:mm');
};

export {
  extractFilterParams,
  formatTime,
  formatFullTime,
  checkAlarmsFilterIsActive,
};
