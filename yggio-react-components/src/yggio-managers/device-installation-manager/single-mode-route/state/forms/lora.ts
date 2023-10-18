/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
  generateForm,
  inputValidators,
  VALIDATION_VISIBILITY_TYPES,
} from '../../../../../utils/form-wizard';
import {LORA_INPUTS} from '../../constants';
import {InputValue} from '../../../../../types';
import {ConnectorInputValue} from '../../types';

const patterns = {
  hex8: {
    pattern: /^[A-F0-9]{8}$/,
    message: 'Must be 8 characters, numbers and A-F letters only',
  },
  hex16: {
    pattern: /^[A-F0-9]{16}$/,
    message: 'Must be 16 characters, numbers and A-F letters only',
  },
  hex32: {
    pattern: /^[A-F0-9]{32}$/,
    message: 'Must be 32 characters, numbers and A-F letters only',
  },
};

const formConfig = {
  [LORA_INPUTS.connector.name]: {
    defaultValue: {
      deviceId: null,
      type: null,
    },
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        {
          validate: (value: InputValue) => {
            const val = value as ConnectorInputValue;
            return !!val.deviceId;
          },
          message: 'Please select a connector',
        }
      ],
    }
  },
  [LORA_INPUTS.activationType.name]: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please select an activation type.'),
      ],
    }
  },
  [LORA_INPUTS.devEui.name]: {
    defaultValue: '',
    validation: {
      validMessage: `Valid`,
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Please enter a DevEUI'),
        {
          validate: (value: InputValue) => patterns.hex16.pattern.test(value as string),
          message: patterns.hex16.message,
        }
      ],
    }
  },
  [LORA_INPUTS.appKey.name]: {
    defaultValue: '',
    validation: {
      validMessage: `Valid`,
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Please enter a AppKey'),
        {
          validate: (value: InputValue) => patterns.hex32.pattern.test(value as string),
          message: patterns.hex32.message,
        }
      ],
    }
  },
  [LORA_INPUTS.devAddr.name]: {
    defaultValue: '',
    validation: {
      validMessage: `Valid`,
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Please enter a DevAddr'),
        {
          validate: (value: InputValue) => patterns.hex8.pattern.test(value as string),
          message: patterns.hex8.message,
        }
      ],
    }
  },
  [LORA_INPUTS.appEui.name]: {
    defaultValue: '',
    validation: {
      validMessage: `Valid`,
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Please enter a AppEUI'),
        {
          validate: (value: InputValue) => patterns.hex16.pattern.test(value as string),
          message: patterns.hex16.message,
        }
      ],
    }
  },
  [LORA_INPUTS.classType.name]: {
    defaultValue: 'A',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Please select a class type'),
      ],
    }
  },
  [LORA_INPUTS.priceModel.name]: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Please select a price model'),
      ],
    }
  },
  [LORA_INPUTS.netmoreLorawanVersion.name]: {
    defaultValue: 'V103@SENSOR_COMMON',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
    }
  },
  [LORA_INPUTS.thingParkLorawanVersion.name]: {
    defaultValue: '1.0.3',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
    }
  },
  [LORA_INPUTS.externalJoinServer.name]: {
    defaultValue: 'no',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Please select an option'),
      ],
    }
  },
  [LORA_INPUTS.nwkSKey.name]: {
    defaultValue: '',
    validation: {
      validMessage: `Valid`,
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Please enter a nwkSKey'),
        {
          validate: (value: InputValue) => patterns.hex32.pattern.test(value as string),
          message: patterns.hex32.message,
        }
      ],
    }
  },
  [LORA_INPUTS.appSKey.name]: {
    defaultValue: '',
    validation: {
      validMessage: `Valid`,
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Please enter a appSKey'),
        {
          validate: (value: InputValue) => patterns.hex32.pattern.test(value as string),
          message: patterns.hex32.message,
        }
      ],
    }
  },
  [LORA_INPUTS.connectivityPlan.name]: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a connectivity plan'),
      ],
    }
  },
};

const {actions, reducer} = generateForm(formConfig);

export default {
  actions,
  reducer,
};
