/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {channelTypes} from 'yggio-types';
import {request} from '../request';

import {
  HTTP_METHODS,
  RESOURCE_TYPES,
} from '../../constants';

interface CreateManyChannelsResult {
  inserted: channelTypes.Channel[];
  errors: Record<string, string>[];
}

const create = async (channel: Omit<channelTypes.Channel, '_id' | 'readableFormat'>) => request({
  method: HTTP_METHODS.post,
  URI: `${RESOURCE_TYPES.channels}`,
  data: channel,
});

const createMany = async (channels: Omit<channelTypes.Channel, '_id' | 'readableFormat'>[]) => request<CreateManyChannelsResult>({
  method: HTTP_METHODS.post,
  URI: `${RESOURCE_TYPES.channels}/batch`,
  data: channels,
});

const update = async (channelId: string, updates: Partial<channelTypes.Channel>) => request<channelTypes.Channel>({
  method: HTTP_METHODS.put,
  URI: `${RESOURCE_TYPES.channels}/${channelId}`,
  data: updates,
});

const get = async (deviceId: string) => request<channelTypes.Channel[]>({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.channels}`,
  params: {
    iotnode: deviceId,
    formatReadable: true,
  }
});

const remove = async (channelId: string) => request({
  method: HTTP_METHODS.delete,
  URI: `${RESOURCE_TYPES.channels}/${channelId}`,
});

export {
  get,
  create,
  createMany,
  update,
  remove,
};
