/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {isFormValid} from '../../../../utils/form-wizard';

const onContinue = props => () => {
  if (isFormValid(props.formInputs)) {
    props.incrementCurrentStep();
  } else {
    props.showAllInputValidations();
  }
};

const handleValueChange = props => evt => {
  const {target: {value, name}} = evt;
  props.setInputValue(name, value);
  props.setCurrentPage(1);
};

export default {
  onContinue,
  handleValueChange,
};
