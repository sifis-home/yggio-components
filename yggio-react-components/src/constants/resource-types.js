const RESOURCE_TYPES = {
  accessRights: 'access-rights',
  auth: 'auth',
  apps: 'apps',
  coreApps: 'coreapps',
  clientApps: 'client-apps',
  authUrl: 'auth/info', // SHOULD GO
  authDetails: 'auth/code', // SHOULD GO
  logoutURL: 'auth/logout', // SHOULD GO
  // devices
  devicesClaim: 'devices/claim', // SHOULD GO
  devicesCommand: 'devices/command', // SHOULD GO
  // and the ones that are under control
  users: 'users',
  iotnodes: 'iotnodes',
  devices: 'devices',
  locations: 'locations',
  organizations: 'organizations',
  version: 'version',
  requestBodySizeLimit: 'request-body-size-limit',
  translators: 'translators',
  images: 'locations/images', // this one should probably have own route in rest-api
  jobs: 'jobs',
  calculations: 'calculations',
  channels: 'channels',
  channel: 'channel',
  rulesActions: 'rules/actions',
  rulesConditions: 'rules/conditions',
  rules: 'rules/rules',
  commands: 'commands',
  logs: 'logs',
  basicCredentialsSets: 'basic-credentials-sets',
  connectors: 'connectors',
};

export {
  RESOURCE_TYPES,
};
