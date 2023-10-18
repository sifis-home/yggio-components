/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import module from '../package.json';

const {name: SERVICE} = module;

const COLLECTION_NAMES = {
  themes: 'themes',
  ruleButtons: 'ruleButtons',
  views: 'views',
} as const;

const REQUEST_METHODS = {
  get: 'get',
  put: 'put',
  post: 'post',
  delete: 'delete',
} as const;

const ERROR_CONTEXTS = {
  commandHandler: 'Control Panel V2 command handler',
};

export {
  COLLECTION_NAMES,
  REQUEST_METHODS,
  ERROR_CONTEXTS,
  SERVICE,
};
