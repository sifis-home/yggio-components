/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {getFormValues} from '../../../utils/form-wizard';

const handleValueChange = props => evt => {
  const {target: {value, name}} = evt;
  props.setInputValue(name, value);
};

const clearForm = props => evt => {
  props.resetForm();
};

const handleCreateLocation = props => evt => {
  const template = getFormValues(props.formInputs);
  props.createLocation(template);
  props.router.push('/locations')
};

export default {
  handleValueChange,
  clearForm,
  handleCreateLocation,
}