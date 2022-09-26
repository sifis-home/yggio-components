/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import React from 'react';

import {isFormValid} from '../../../../utils/form-wizard';
import {Form, FormInputs} from '../../../../types';
import {ConnectorOption} from './types';

const onConnectorChange = (
  connectorOptions: ConnectorOption[],
  evt: React.ChangeEvent<HTMLInputElement>,
  setInputValue: Form['setInputValue']
) => {
  const selectedOption = _.find(connectorOptions, {value: evt.target.value});
  if (!selectedOption) throw new Error('DevErr: connector not found');
  const connector = {
    deviceId: selectedOption.value,
    type: selectedOption.type,
  };
  setInputValue(evt.target.name, connector);
};

const onContinue = (
  formInputs: FormInputs,
  activeLoraInputs: string[],
  incrementCurrentStep: () => void,
  showAllInputValidations:
  Form['showAllInputValidations']
) => {
  const inputsToValidate = _.pick(formInputs, activeLoraInputs);
  if (isFormValid(inputsToValidate)) {
    incrementCurrentStep();
  } else {
    showAllInputValidations();
  }
};

export {
  onConnectorChange,
  onContinue,
};
