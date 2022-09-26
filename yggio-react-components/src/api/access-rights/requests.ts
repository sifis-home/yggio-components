/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {request} from '../request';
import {
  RESOURCE_TYPES,
  HTTP_METHODS,
} from '../../constants';
import {DeviceIdProps, AccessRights} from '../../types';
import {AccessRightCreationTemplate, AccessRightDeletionTemplate} from './types';

const fetchResource = async ({deviceId}: DeviceIdProps) => request<AccessRights>({
  method: HTTP_METHODS.Get,
  URI: `${RESOURCE_TYPES.iotnodes}/${deviceId}/${RESOURCE_TYPES.access}`,
});

interface SubjectIdProps {
  subjectId: string;
}

const fetchSubject = async ({subjectId}: SubjectIdProps) => request({
  method: HTTP_METHODS.Get,
  URI: `${RESOURCE_TYPES.iotnodes}/${RESOURCE_TYPES.access}/${subjectId}`,
});

const create = async ({deviceId, template}: AccessRightCreationTemplate) => request({
  method: HTTP_METHODS.Post,
  URI: `${RESOURCE_TYPES.iotnodes}/${deviceId}/${RESOURCE_TYPES.access}`,
  data: template,
});

const remove = async ({
  deviceId,
  scope,
  userId,
  subjectType,
}: AccessRightDeletionTemplate) => request({
  method: HTTP_METHODS.Delete,
  URI: `${RESOURCE_TYPES.iotnodes}/${deviceId}/${RESOURCE_TYPES.access}`,
  params: {scope, userId, subjectType},
});

export {
  fetchResource,
  fetchSubject,
  create,
  remove,
};
