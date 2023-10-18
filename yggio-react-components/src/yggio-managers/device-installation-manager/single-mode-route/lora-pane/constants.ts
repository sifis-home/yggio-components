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

const NETMORE_LORAWAN_VERSION_OPTIONS: InputOptions = [
  {
    value: 'V100@SENSOR_COMMON',
    label: '1.0.0',
  },
  {
    value: 'V101@SENSOR_COMMON',
    label: '1.0.1',
  },
  {
    value: 'V102@SENSOR_COMMON',
    label: '1.0.2',
  },
  {
    value: 'V103@SENSOR_COMMON',
    label: '1.0.3',
  },
];

const THINGPARK_LORAWAN_VERSION_OPTIONS: InputOptions = [
  {
    value: '1.0.2',
    label: '1.0.2',
  },
  {
    value: '1.0.3',
    label: '1.0.3',
  },
  {
    value: '1.0.4',
    label: '1.0.4',
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

export {
  ACTIVATION_TYPE_OPTIONS,
  CLASS_TYPE_OPTIONS,
  NETMORE_LORAWAN_VERSION_OPTIONS,
  THINGPARK_LORAWAN_VERSION_OPTIONS,
  EXTERNAL_JOIN_SERVER_OPTIONS,
};
