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

import TextField from '../../../../components/text-field';

const BasicFormComponent = props => {
  const onChange = generateHandleValueChange(props);
  const onBlur = generateShowInputValidation(props);
  return (
    <>
      <TextField
        label="always"
        name="always"
        value={props.formInputs.always.value}
        onChange={onChange}
        onBlur={onBlur}
        validationErrorMessage={getValidationErrorMessage(props.formInputs.always)}
        validationSuccessMessage={getValidationSuccessMessage(props.formInputs.always)}
      />
      <TextField
        label="never"
        name="never"
        value={props.formInputs.never.value}
        onChange={onChange}
        onBlur={onBlur}
        validationErrorMessage={getValidationErrorMessage(props.formInputs.never)}
        validationSuccessMessage={getValidationSuccessMessage(props.formInputs.never)}
      />
      <TextField
        label="optIn"
        name="optIn"
        value={props.formInputs.optIn.value}
        onChange={onChange}
        onBlur={onBlur}
        validationErrorMessage={getValidationErrorMessage(props.formInputs.optIn)}
        validationSuccessMessage={getValidationSuccessMessage(props.formInputs.optIn)}
      />
      <TextField
        label="manual"
        name="manual"
        value={props.formInputs.manual.value}
        onChange={onChange}
        onBlur={onBlur}
        validationErrorMessage={getValidationErrorMessage(props.formInputs.manual)}
        validationSuccessMessage={getValidationSuccessMessage(props.formInputs.manual)}
      />
      <hr />
      {isFormValid(props.formInputs)
        ? <p>Currently form is valid.</p>
        : <p>Currently form is NOT valid.</p>}
    </>
  );
};

export default BasicFormComponent;
