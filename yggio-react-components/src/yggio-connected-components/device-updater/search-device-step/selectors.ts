/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {Form} from '../../../types';
import {getFormValues} from '../../../utils/form-wizard';

const selectMatchPattern = (form: Form) => {
  const formValues = getFormValues(form.formInputs);
  const searchField = formValues.searchField as string;
  const value = formValues[searchField];
  if (!value) return undefined;
  return {[searchField]: value};
};

export {
  selectMatchPattern,
};
