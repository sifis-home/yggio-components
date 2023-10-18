/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const STEP_NOT_FOUND = 'STEP_NOT_FOUND';

// Note: must be kept PascalCase
enum LORA_CONNECTOR_TYPES {
  None = 'None',
  ChirpStack = 'ChirpStack',
  Netmore = 'Netmore',
  ActilityThingpark = 'ActilityThingpark',
}

// Note: must be kept capitalized
enum LORA_ACTIVATION_TYPES {
  OTAA = 'OTAA',
  ABP = 'ABP',
}

export {
  STEP_NOT_FOUND,
  LORA_CONNECTOR_TYPES,
  LORA_ACTIVATION_TYPES,
};
