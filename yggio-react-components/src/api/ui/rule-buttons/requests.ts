import {request} from '../../request';
import {HTTP_METHODS} from '../../../constants';

import type {RuleButton} from '../../../types';
import type {
  RuleButtonsQuery,
  RuleButtonCreation,
  RuleButtonDeletion,
} from './types';

const URI = 'ui';
const isNextAPI = true;

const get = async ({owner, deviceId}: RuleButtonsQuery) => request<RuleButton[]>({
  method: HTTP_METHODS.get,
  URI: `${URI}/rule-buttons`,
  params: {
    owner,
    deviceId,
  },
  isNextAPI,
});

const create = async ({data}: RuleButtonCreation) => request({
  method: HTTP_METHODS.post,
  URI: `${URI}/rule-buttons`,
  data,
  isNextAPI,
});

const remove = async ({data}: RuleButtonDeletion) => request({
  method: HTTP_METHODS.delete,
  URI: `${URI}/rule-buttons`,
  data,
  isNextAPI,
});

export {
  get,
  create,
  remove,
};
