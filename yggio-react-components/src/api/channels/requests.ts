/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {request} from '../request';

import {
  HTTP_METHODS,
  RESOURCE_TYPES,
} from '../../constants';
import {Channel, Channels} from '../../types';

interface CreateManyChannelsResult {
  inserted: Channels;
  errors: Record<string, string>[];
}

const create = async (channel: Omit<Channel, '_id'>) => request({
  method: HTTP_METHODS.Post,
  URI: `${RESOURCE_TYPES.channels}`,
  data: channel,
});

const createMany = async (channels: Omit<Channel, '_id'>[]) => request<CreateManyChannelsResult>({
  method: HTTP_METHODS.Post,
  URI: `${RESOURCE_TYPES.channels}/batch`,
  data: channels,
});

const get = async (deviceId: string) => request<Channels>({
  method: HTTP_METHODS.Get,
  URI: `${RESOURCE_TYPES.channels}`,
  params: {
    iotnode: deviceId,
    formatReadable: true,
  }
});

const remove = async (channelId: string) => request({
  method: HTTP_METHODS.Delete,
  URI: `${RESOURCE_TYPES.channels}/${channelId}`,
});

export {
  get,
  create,
  createMany,
  remove,
};
