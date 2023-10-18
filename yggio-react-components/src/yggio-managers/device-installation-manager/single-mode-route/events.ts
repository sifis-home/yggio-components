/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {Form} from '../../../types';

type Evt = React.ChangeEvent<HTMLInputElement> |
React.ChangeEvent<HTMLSelectElement> |
React.ChangeEvent<HTMLTextAreaElement>;

const onInputChange = (form: Form, evt: Evt) => {
  const {target: {value, name}} = evt;
  form.setInputValue(name, value);
  form.showInputValidation(name);
};

const onInputBlur = (form: Form, evt: Evt) => {
  const {target: {name}} = evt;
  form.showInputValidation(name);
};

const onInputChangeUpperCase = (form: Form, evt: Evt) => {
  const {target: {value, name}} = evt;
  const val = _.isString(value) ? value.toUpperCase() : value;
  form.setInputValue(name, val);
  form.showInputValidation(name);
};

export {
  onInputChange,
  onInputChangeUpperCase,
  onInputBlur,
};
