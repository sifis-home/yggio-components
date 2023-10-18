import _ from 'lodash';

import {parseDeltaControlsSettings} from '../../../../utils';
import {getFormValues} from '../../../../utils/form-wizard';
import {FormInputs} from '../../../../types';

const validateChannel = (formInputs: FormInputs) => {
  const protocol = formInputs.protocol.value as string;
  const isValidMQTTProtocol = _.every([
    _.eq(protocol, 'mqtt'),
    formInputs.type.value,
    formInputs.recipient.value,
  ]);
  const isValidHTTPProtocol = _.every([
    _.eq(protocol, 'http'),
    formInputs.url.value,
    formInputs.url.validation.isValid,
  ]);
  const isValidAzureIotHubProtocol = _.every([
    _.eq(protocol, 'azureIotHub'),
    formInputs.connectionString.value,
  ]);
  const isValidDeltaControlsProtocol = _.every([
    _.eq(protocol, 'deltaControls'),
    formInputs.connector.value,
    formInputs.deltaControlsSettings.validation.isValid,
  ]);

  const isValidProtocol = _.some([
    isValidMQTTProtocol,
    isValidHTTPProtocol,
    isValidAzureIotHubProtocol,
    isValidDeltaControlsProtocol,
  ]);

  return _.every([
    formInputs.name.value,
    isValidProtocol,
  ]);
};

const createProtocolData = (formInputs: FormInputs) => {
  const formValues = getFormValues(formInputs);
  const {
    protocol,
    url,
    type,
    recipient,
    connectionString,
    connector,
    deltaControlsSettings,
  } = formValues;

  if (protocol === 'http') {
    return {
      url
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

  if (protocol === 'deltaControls') {
    return {
      connectorId: connector,
      mappings: parseDeltaControlsSettings(deltaControlsSettings),
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
