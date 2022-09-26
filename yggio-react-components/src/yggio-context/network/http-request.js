/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import axios from 'axios';
import {getConfig} from '../../yggio-config';

const Bottleneck = require('bottleneck');

const limiter = new Bottleneck({
  minTime: 100
});

const request = ({token, method, URI, data, params}, options) => {
  const isNonApiRoute = _.get(options, 'isNonApiRoute');
  const headers = token ? {Authorization: `Bearer ${token}`} : {};
  const requestConfig = {
    headers,
    timeout: 15000,
    withCredentials: true,
    responseType: 'text', // Note: 'json' resulted in text responses not working
    url: `${getConfig().baseRequestUrl}/${URI}`,
    method,
    data,
    params,
  };
  return limiter.schedule(() => axios(requestConfig)
    .then(res => {
      if (_.eq(_.get(params, 'options'), 'count')) {
        return {data: res.data, headers: res.headers};
      }
      return res.data;
    }));
};

export default request;
