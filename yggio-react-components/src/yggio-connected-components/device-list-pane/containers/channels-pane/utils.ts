/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';

interface ChannelData {
  protocol: string;
  url: {value: string, validation: {message: string, isValid: boolean}};
  name: string;
  connectionString: string;
  type: string;
  recipient: string;
}

const validateChannel = ({
  protocol,
  url,
  name,
  connectionString,
  type,
  recipient,
}: ChannelData) => {
  const isValidMQTTProtocol = _.every([
    _.eq(protocol, 'mqtt'),
    type,
    recipient,
  ]);
  const isValidHTTPProtocol = _.every([
    _.eq(protocol, 'http'),
    url?.value,
    url?.validation?.isValid,
  ]);
  const isValidAzureIotHubProtocol = _.every([
    _.eq(protocol, 'azureIotHub'),
    connectionString,
  ]);

  const isValidProtocol = _.some([
    isValidMQTTProtocol,
    isValidHTTPProtocol,
    isValidAzureIotHubProtocol,
  ]);

  return _.every([
    name,
    isValidProtocol,
  ]);
};

const createProtocolData = ({
  protocol,
  url,
  connectionString,
  type,
  recipient,
}: Omit<ChannelData, 'name'>) => {
  if (protocol === 'http') {
    return {
      url,
    };
  }

  if (protocol === 'mqtt') {
    return {
      type,
      recipient,
    };
  }

  if (protocol === 'azureIotHub') {
    return {
      connectionString,
    };
  }
};

const setMostCommonError = (errors: Record<string, string>[]) => {
  const errorMessages = _.map(errors, err => {
    const [message] = _.values(err);
    return message;
  });
  const check = (a: string[][]) => _.maxBy(a, res => _.tail(res));
  const res = _.flow(
    _.countBy,
    _.toPairs,
    check,
    _.head
  )(errorMessages) as string;
  return res;
};

export {
  setMostCommonError,
  validateChannel,
  createProtocolData,
};
