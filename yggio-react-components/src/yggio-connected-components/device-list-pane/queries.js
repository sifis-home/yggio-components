/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {devicesApi, accessRightsApi, calculationsApi} from '../../api';
import {
  selectDevData,
  selectAccessRightsData,
  selectCalculationsData,
  selectDevicesData,
} from './selectors';

const useFetchDevices = ({params}) => (
  devicesApi.useDevicesQuery({
    params,
    select: selectDevicesData,
  })
);

const useFetchDeviceItems = ({params, calculations, t}) => (
  devicesApi.useDevicesWithTotalDevicesQuery({
    params,
    select: selectDevData({calculations, t}),
  })
);

const useAccessRightsResult = ({subjectId}) => (
  accessRightsApi.useAccessRightsSubjectQuery({
    subjectId,
    select: selectAccessRightsData,
  })
);

const useCalculationResult = () => (
  calculationsApi.useCalculationsQuery({
    select: selectCalculationsData,
  })
);


export {
  useFetchDevices,
  useFetchDeviceItems,
  useAccessRightsResult,
  useCalculationResult,
};
