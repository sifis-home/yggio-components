/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {InputOptions} from '../../../../types';

import {LORA_ACTIVATION_TYPES} from '../constants';

const ACTIVATION_TYPE_OPTIONS: InputOptions = [
  {
    label: LORA_ACTIVATION_TYPES.OTAA,
    value: LORA_ACTIVATION_TYPES.OTAA,
  }, {
    label: LORA_ACTIVATION_TYPES.ABP,
    value: LORA_ACTIVATION_TYPES.ABP,
  },
];

const CLASS_TYPE_OPTIONS: InputOptions = [
  {
    value: 'A',
    label: 'A',
  },
  {
    value: 'C',
    label: 'C',
  },
];

const EXTERNAL_JOIN_SERVER_OPTIONS: InputOptions = [
  {
    value: 'yes',
    label: 'Yes',
  },
  {
    value: 'no',
    label: 'No',
  },
];

const DEVICE_PROFILES_OPTIONS: InputOptions = [
  {
    value: 'LORA/GenericA.1.0.2a_ETSI_Rx2-SF12',
    label: 'Class A',
  },
  {
    value: 'LORA/GenericC.1.0.2a_ETSI_Rx2-SF12',
    label: 'Class C',
  },
];

export {
  ACTIVATION_TYPE_OPTIONS,
  CLASS_TYPE_OPTIONS,
  EXTERNAL_JOIN_SERVER_OPTIONS,
  DEVICE_PROFILES_OPTIONS,
};
