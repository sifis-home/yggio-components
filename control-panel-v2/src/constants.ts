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
