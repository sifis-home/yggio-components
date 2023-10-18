import {jobTypes} from 'yggio-types';
import {request} from '../request';
import {HTTP_METHODS, RESOURCE_TYPES} from '../../constants';
import {DeviceCommands} from '../../types';

const get = async (jobId: string) => request<jobTypes.Job>({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.jobs}/${jobId}`,
});

const createDevicesJob = async (data: Record<string, string>[]) => request<jobTypes.Job>({
  method: HTTP_METHODS.post,
  URI: `${RESOURCE_TYPES.jobs}/${RESOURCE_TYPES.iotnodes}`,
  data,
});

const createDeviceCommandsJob = async (template: DeviceCommands) => request<jobTypes.Job>({
  method: HTTP_METHODS.post,
  URI: `${RESOURCE_TYPES.jobs}/${RESOURCE_TYPES.iotnodes}/${RESOURCE_TYPES.commands}`,
  data: template,
});

const removeDevicesJob = async (deviceIds: string[]) => request<jobTypes.Job>({
  method: HTTP_METHODS.delete,
  URI: `${RESOURCE_TYPES.jobs}/${RESOURCE_TYPES.iotnodes}`,
  data: deviceIds,
});

export {
  get,
  createDevicesJob,
  createDeviceCommandsJob,
  removeDevicesJob,
};
