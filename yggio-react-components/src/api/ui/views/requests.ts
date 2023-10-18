import {request} from '../../request';
import {HTTP_METHODS} from '../../../constants';

import type {ViewCreation, ViewIdQuery, ViewUpdateQuery, ViewQuery} from '../../../types';

const URI = 'ui';
const isNextAPI = true;

const get = async <T>({type, orgId}: ViewQuery) => request<T>({
  method: HTTP_METHODS.get,
  URI: `${URI}/views`,
  params: {
    type,
    orgId,
  },
  isNextAPI,
});

const create = async (data: ViewCreation) => request({
  method: HTTP_METHODS.post,
  URI: `${URI}/views`,
  data,
  isNextAPI,
});

const update = async ({_id, data}: ViewUpdateQuery) => request({
  method: HTTP_METHODS.put,
  URI: `${URI}/views/${_id}`,
  data,
  isNextAPI,
});

const remove = async ({_id}: ViewIdQuery) => request({
  method: HTTP_METHODS.delete,
  URI: `${URI}/views/${_id}`,
  isNextAPI,
});

export {
  get,
  create,
  update,
  remove,
};
