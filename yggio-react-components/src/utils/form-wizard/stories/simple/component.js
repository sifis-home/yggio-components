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
        label="Name"
        name="name"
        value={props.formInputs.name.value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <hr />
      {isFormValid(props.formInputs)
        ? <p>Currently form is valid.</p>
        : <p>Currently form is NOT valid.</p>}
    </>
  );
};

export default BasicFormComponent;
