/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {createSelector} from 'reselect';

import {getDeviceStatus} from '../../utils';
import {FILTER_TAGS_NAMES} from './constants';
import {getDeviceValues} from './utils';
import {getFormValues} from '../../utils/form-wizard';

import type {DecoratedDevice} from './types';
import type {
  FormInputs,
  Translate,
  Device,
  IdKeyedCalculations,
  SubjectAccessRight,
  RuleButton,
  View,
  Organizations,
} from '../../types';

const selectFilterTags = createSelector(
  (props: {formInputs: FormInputs}) => props.formInputs,
  formInputs => {
    const arr = [];

    const formValues = getFormValues(formInputs);

    if (formValues.filterName) {
      arr.push({
        inputName: 'filterName',
        text: `${FILTER_TAGS_NAMES.filterName}: ${formValues.filterName}`,
      });
    }

    if (formValues.filterDeviceModelName) {
      arr.push({
        inputName: 'filterDeviceModelName',
        text: `${FILTER_TAGS_NAMES.filterDeviceModelName}: ${formValues.filterDeviceModelName}`,
      });
    }

    if (formValues.filterType) {
      arr.push({
        inputName: 'filterType',
        text: `${FILTER_TAGS_NAMES.filterType}: ${formValues.filterType}`,
      });
    }

    if (formValues.filterDevEui) {
      arr.push({
        inputName: 'filterDevEui',
        text: `${FILTER_TAGS_NAMES.filterDevEui}: ${formValues.filterDevEui}`,
      });
    }

    if (formValues.filterConnector) {
      const [connectorName] = _.split(formValues.filterConnector as string, '_');
      arr.push({
        inputName: 'filterConnector',
        text: `${FILTER_TAGS_NAMES.filterConnector}: ${connectorName}`,
      });
    }

    if (formValues.filterContextualParameterKey) {
      arr.push({
        inputName: 'filterContextualParameterKey',
        text: `${FILTER_TAGS_NAMES.filterContextualParameter}: ${formValues.filterContextualParameterKey}: ${formValues.filterContextualParameterValue}`,
      });
    }

    if (formValues.filterQ) {
      arr.push({
        inputName: 'filterQ',
        text: `${FILTER_TAGS_NAMES.filterQ}: ${formValues.filterQ}`,
      });
    }

    return arr;
  }
);

const selectPageInfo = createSelector(
  (props: {currentPage: number}) => props.currentPage,
  (props: {pageSize: number}) => props.pageSize,
  (props: {devices: Device[]}) => props.devices,
  (props: {numFilteredDevices: number}) => props.numFilteredDevices,
  (props: {t: Translate}) => props.t,
  (currentPage, pageSize, devices, numFilteredDevices, t) => {
    if (!devices) return '';
    const from = (currentPage - 1) * pageSize + 1;
    const to = from + devices.length - 1;
    return `${_.capitalize(t('titles.showing'))} ${from}-${to} ${t('common.of')} ${numFilteredDevices}`;
  },
);

const selectDecoratedDevices = createSelector(
  (props: {devices: Device[]}) => props.devices,
  (props: {calculations?: IdKeyedCalculations}) => props.calculations,
  (props: {accessRights?: SubjectAccessRight[]}) => props.accessRights,
  (props: {ruleButtons?: RuleButton[]}) => props.ruleButtons,
  (props: {t: Translate}) => props.t,
  (devices, calculations, accessRights, ruleButtons, t) => {

    const idKeyedAccessRights = _.keyBy(accessRights, 'resourceId');
    const groupedRuleButtons = _.groupBy(ruleButtons, 'deviceId');

    const decoratedDevices = _.map<Device, DecoratedDevice>(devices, device => {
      const isCurrentUserOwner = _.includes(idKeyedAccessRights[device._id]?.scope, 'admin');
      return {
        ...device,
        status: getDeviceStatus(t, device, calculations),
        values: getDeviceValues(device, t),
        ruleButtons: groupedRuleButtons[device._id] || [],
        isCurrentUserOwner,
      };
    });
    return decoratedDevices;
  },
);

const selectAvailableViews = createSelector(
  (props: {views: View[]}) => props.views,
  views => {
    return _.map(views, view => ({
      value: view?._id,
      label: view?.name,
    }));
  }
);

const selectOrgs = createSelector(
  (props: {orgs?: Organizations}) => props.orgs,
  orgs => {
    if (orgs) {
      return _.map(orgs, org => ({
        label: org.name,
        value: org._id,
      }));
    }
    return [];
  }
);

export {
  selectPageInfo,
  selectFilterTags,
  selectDecoratedDevices,
  selectAvailableViews,
  selectOrgs,
};
