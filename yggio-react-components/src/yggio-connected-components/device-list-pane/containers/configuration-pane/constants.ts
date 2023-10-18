/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const LORA_PRESET_SELECTIONS = {
  // Comfort
  a: {
    fPort: '11',
    data: '0103000022100B000003841B0001518022000000D023000020032A00000000',
    confirmed: false,
  },
  b: {
    fPort: '11',
    data: '0103000022100B00001C201B0001518022000000D023000020032A00000000',
    confirmed: false,
  },
  c: {
    fPort: '11',
    data: '01030000001022000000D00B00000E10',
    confirmed: false,
  },
  d: {
    fPort: '11',
    data: '0103000002100B00001C202200000052',
    confirmed: false,
  },

  // Presence
  e: {
    fPort: '11',
    data: '0103010002002F00000078300000000A3100000E10',
    confirmed: false,
  },
  f: {
    fPort: '11',
    data: '0103030002002E000000782F00000078300000000A3100000E10',
    confirmed: false,
  },

  // Guard
};

const LORA_LABELS: Record<string, string> = {
  a: 'Strips Comfort - Change battery status report interval to 15 minutes',
  b: 'Strips Comfort - Change battery status report interval to 120 minutes',
  c: 'Strips Comfort - Change temperature moisture, lux status report interval to 60 minutes',
  d: 'Strips Comfort - Change temperature, moisture status report interval to 120 minutes',
  e: 'Strips Presence - Standard',
  f: 'Strips Presence - Proximity report',
};

const LORA_PRESETS = [
  {label: LORA_LABELS.a, value: 'a'},
  {label: LORA_LABELS.b, value: 'b'},
  {label: LORA_LABELS.c, value: 'c'},
  {label: LORA_LABELS.d, value: 'd'},
  {label: LORA_LABELS.e, value: 'e'},
  {label: LORA_LABELS.f, value: 'f'},
];

const DEFAULT_CONFIG_OPTIONS = [
  {label: 'Presets', value: 'presets'},
  {label: 'Custom', value: 'custom'},
];

const LORA_TYPES = {
  ChirpStack: 'ChirpStack',
  ActilityThingpark: 'ActilityThingpark',
  Netmore: 'Netmore',
} as const;

const CHIRP_STACK_COMMANDS = {
  loraAppServerQueueDownlink: 'loraAppServerQueueDownlink',
  loraAppServerGetDeviceQueue: 'loraAppServerGetDeviceQueue',
  loraAppServerFlushQueue: 'loraAppServerFlushQueue',
};

export {
  LORA_PRESET_SELECTIONS,
  LORA_LABELS,
  LORA_PRESETS,
  DEFAULT_CONFIG_OPTIONS,
  CHIRP_STACK_COMMANDS,
  LORA_TYPES,
};
