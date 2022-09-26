/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';

interface YggioConfig {
  baseRequestUrl: string;
  socketHostname: string;
  socketPort: string;
  restUrl: string;
  isFiware: boolean;
  domain: string;
  nodeEnv: string;
  version: string;
}

const generateConfig = (configObj: YggioConfig): YggioConfig => {
  const cfg = <YggioConfig>{};
  cfg.baseRequestUrl = _.get(configObj, 'REACT_APP_BACKEND_URL', 'https://dev.local.yggio') as string;
  cfg.socketHostname = _.get(configObj, 'REACT_APP_YGGIO_WEBSOCKET_HOSTNAME', 'dev.local.yggio') as string;
  cfg.socketPort = _.get(configObj, 'REACT_APP_YGGIO_WEBSOCKET_PORT', '15676') as string;
  cfg.restUrl = _.get(configObj, 'REACT_APP_YGGIO_REST_API_URL', 'https://dev.local.yggio/api') as string;
  cfg.isFiware = _.get(configObj, 'REACT_APP_IS_FIWARE', false) as boolean;

  // the domain controls access to yggio cookies
  cfg.domain = _.get(configObj, 'REACT_APP_DOMAIN', 'dev.local.yggio') as string;

  // other stuff
  cfg.nodeEnv = _.get(configObj, 'NODE_ENV', 'development') as string;
  cfg.version = _.get(configObj, 'YGGIO_VERSION') as string;
  return cfg;
};

let CONFIG = generateConfig({} as YggioConfig);

const setConfig = (
  {config, setAppReady}: {config: YggioConfig, setAppReady(arg: boolean): void}
) => {
  if (setAppReady) {
    CONFIG = generateConfig(config);
    setAppReady(true);
  }
};

const getConfig = () => CONFIG;

export {
  setConfig,
  getConfig
};
