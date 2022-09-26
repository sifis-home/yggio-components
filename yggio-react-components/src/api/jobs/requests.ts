/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {request} from '../request';
import {HTTP_METHODS, RESOURCE_TYPES} from '../../constants';
import {DeviceCommands, Job} from '../../types';

const get = async (jobId: string) => request<Job>({
  method: HTTP_METHODS.Get,
  URI: `${RESOURCE_TYPES.jobs}/${jobId}`,
});

const createDeviceCommandsJob = async (template: DeviceCommands) => request<Job>({
  method: HTTP_METHODS.Post,
  URI: `${RESOURCE_TYPES.jobs}/${RESOURCE_TYPES.iotnodes}/${RESOURCE_TYPES.commands}`,
  data: template,
});

const removeDevicesJob = async (deviceIds: string[]) => request<Job>({
  method: HTTP_METHODS.Delete,
  URI: `${RESOURCE_TYPES.jobs}/${RESOURCE_TYPES.iotnodes}`,
  data: deviceIds,
});

export {
  get,
  createDeviceCommandsJob,
  removeDevicesJob,
};
