/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// routing-constants.ts

const YGGIO_APPS = {
  deviceManager: 'deviceManager',
  deviceInstallationManager: 'deviceInstallationManager',
  locationManager: 'locationManager',
  organizationManager: 'organizationManager',
  imageManager: 'imageManager',
};

const LOCAL_APP_DOMAIN = 'dev.local.yggio';

const DEFAULT_APP_URLS = {
  [YGGIO_APPS.deviceManager]: 'device-manager',
  [YGGIO_APPS.deviceInstallationManager]: 'device-installation-manager',
  [YGGIO_APPS.locationManager]: 'location-manager-2',
  [YGGIO_APPS.organizationManager]: 'organization-manager',
  [YGGIO_APPS.imageManager]: 'image-manager',
};

const LOCAL_APP_PORTS = {
  [YGGIO_APPS.deviceManager]: '8036',
  [YGGIO_APPS.deviceInstallationManager]: '8037',
  [YGGIO_APPS.locationManager]: '8035',
  [YGGIO_APPS.organizationManager]: '8034',
  [YGGIO_APPS.imageManager]: '8037',
};

const YGGIO_APP_KEY = 'yggioApp';

const ROUTE_TRIMMED_CHARS = ['/', ' '].join(''); // to get route parts cleanly

const INTER_HISTORY_TYPES = {
  sameTab: 'sameTab',
  newTab: 'newTab',
};

export {
  YGGIO_APPS,
  YGGIO_APP_KEY,
  LOCAL_APP_DOMAIN,
  DEFAULT_APP_URLS,
  LOCAL_APP_PORTS,
  ROUTE_TRIMMED_CHARS,
  INTER_HISTORY_TYPES,
};
