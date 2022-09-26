/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// env-constants.ts

const ENV_TYPES = {
  development: 'development',
  production: 'production',
};

const ENV_KEYS = {
  // urls
  REACT_APP_AUTH_MANAGER_URL: 'REACT_APP_AUTH_MANAGER_URL',
  REACT_APP_DEVICE_MANAGER_URL: 'REACT_APP_DEVICE_MANAGER_URL',
  REACT_APP_DEVICE_INSTALLATION_MANAGER_URL: 'REACT_APP_DEVICE_INSTALLATION_MANAGER_URL',
  REACT_APP_LOCATION_MANAGER_URL: 'REACT_APP_LOCATION_MANAGER_URL',
  REACT_APP_ORGANIZATION_MANAGER_URL: 'REACT_APP_ORGANIZATION_MANAGER_URL',
  // ports
  REACT_APP_AUTH_MANAGER_PORT: 'REACT_APP_AUTH_MANAGER_PORT',
  REACT_APP_DEVICE_MANAGER_PORT: 'REACT_APP_DEVICE_MANAGER_PORT',
  REACT_APP_DEVICE_INSTALLATION_MANAGER_PORT: 'REACT_APP_DEVICE_INSTALLATION_MANAGER_PORT',
  REACT_APP_LOCATION_MANAGER_PORT: 'REACT_APP_LOCATION_MANAGER_PORT',
  REACT_APP_ORGANIZATION_MANAGER_PORT: 'REACT_APP_ORGANIZATION_MANAGER_PORT',
};

export {
  ENV_TYPES,
  ENV_KEYS,
};
