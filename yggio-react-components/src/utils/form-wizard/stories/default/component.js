/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// form-wizard/default/component.js

import React from 'react';

import {
  getValidationErrorMessage,
  getValidationSuccessMessage,
  isFormValid,
  generateHandleValueChange,
  generateShowInputValidation,
} from '../..';

import Button from '../../../../components/button';
import Select from '../../../../components/select';
import TextField from '../../../../components/text-field';

const BasicFormComponent = props => {
  const onBlur = generateShowInputValidation(props);

  return (
    <>
      <Select
        label="Connector"
        name="connector"
        options={props.connectorOptions || []}
        value={props.formInputs.connector.value}
        onChange={generateHandleValueChange(props, false)}
        validationErrorMessage={getValidationErrorMessage(props.formInputs.connector)}
      />
      <TextField
        label="DevEUI"
        name="devEui"
        value={props.formInputs.devEui.value}
        onChange={generateHandleValueChange(props, true)}
        onBlur={onBlur}
        validationErrorMessage={getValidationErrorMessage(props.formInputs.devEui)}
        validationSuccessMessage={getValidationSuccessMessage(props.formInputs.devEui)}
      />
      <TextField
        label="AppKey"
        name="appKey"
        value={props.formInputs.appKey.value}
        onChange={generateHandleValueChange(props, true)}
        onBlur={onBlur}
        validationErrorMessage={getValidationErrorMessage(props.formInputs.appKey)}
        validationSuccessMessage={getValidationSuccessMessage(props.formInputs.appKey)}
      />
      <Button
        color="green"
        content="Submit"
        onClick={() => {
          if (!isFormValid(props.formInputs)) {
            props.showAllInputValidations();
          }
        }}
        margin="0 0 40px 0"
      />
      <hr />
      {
        isFormValid(props.formInputs)
          ? <p>Currently form is valid. If you press Submit, nothing will happe in this story.</p>
          : (
            <p>
              Currently form is NOT valid.&nbsp;
              If you press Submit, all validation messages will be shown.
            </p>
          )
      }
    </>
  );
};

export default BasicFormComponent;
