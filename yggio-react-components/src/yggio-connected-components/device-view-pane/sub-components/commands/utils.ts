/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {rabbit} from 'yggio-core-constants';
import {InputValue, GenericMqttConnector, Form} from '../../../../types';

const {mqtt: {reservationPrefixes}} = rabbit;

const getGenericMqttConnectorTopic = (connector: GenericMqttConnector | undefined) => {
  if (!connector) {
    return undefined;
  }
  if ('downlink' in connector) {
    return connector.downlink.topic;
  }
  return `${reservationPrefixes.PUSH}/${connector._id}`;
};

const validatePublishMqttMessageForm = (form: Form) => {
  if (form.formInputs.dataType.value === 'raw') {
    return form.formInputs.rawData.validation.isValid;
  }
  if (form.formInputs.dataType.value === 'json') {
    return form.formInputs.jsonData.validation.isValid;
  }
  return true;
};

const extractPublishMqttMessageData = (formValues: Record<string, InputValue>) => {
  const {subTopic, dataType, rawData, jsonData} = formValues;
  const data: {mqttTopic?: string, message?: string | unknown} = {};
  if (!_.isEmpty(subTopic)) {
    data.mqttTopic = subTopic as string;
  }
  if (dataType === 'raw') {
    data.message = rawData as string;
  } else if (dataType === 'json') {
    data.message = jsonData as string;
  } else {
    data.message = '';
  }
  return data;
};

export {
  getGenericMqttConnectorTopic,
  validatePublishMqttMessageForm,
  extractPublishMqttMessageData,
};
