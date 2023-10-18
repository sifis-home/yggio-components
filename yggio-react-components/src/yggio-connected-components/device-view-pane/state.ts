/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';

import {generateForm, VALIDATION_VISIBILITY_TYPES, inputValidators} from '../../utils/form-wizard';
import {InputValue} from '../../types';
import {DEFAULT_DELTA_CONTROLS_SETTINGS} from '../../constants';
import {parseDeltaControlsSettings} from '../../utils';

const chirpstackDownlinkFormConfig = {
  fPort: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a fPort'),
        inputValidators.numberBetween(1, 223),
      ]
    }
  },
  data: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a data string'),
        inputValidators.hexString,
      ]
    }
  },
  reference: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  confirmed: {
    defaultValue: false,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
};

const netmoreDownlinkFormConfig = {
  fPort: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a fPort'),
        inputValidators.numberBetween(1, 999),
      ]
    }
  },
  payloadHex: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a data string'),
        inputValidators.hexString,
      ]
    }
  },
};

const thingparkDownlinkFormConfig = {
  targetPorts: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a fPort'),
        inputValidators.numberBetween(1, 999),
      ]
    }
  },
  payloadHex: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a data string'),
        inputValidators.hexString,
      ]
    }
  },
  confirmDownlink: {
    defaultValue: false,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  flushDownlinkQueue: {
    defaultValue: false,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
};

const calculationFormConfig = {
  selectedCalculation: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
};

const channelConfig = {
  name: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  protocol: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },

  // protocol specifics
  // mqtt
  type: {
    defaultValue: 'keycloakUser',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  recipient: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },

  // http
  url: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },

  // azure iot hub
  connectionString: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },

  // for desigo cc and delta controls
  connector: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },

  // desigo cc
  desigoObject: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Please enter a desigo object'),
        {
          validate: (value: InputValue) => {
            if (!_.isString(value)) return false; // fix for ts
            const validObject = /^[a-zA-Z0-9_:-]+$/;
            return validObject.test(value);
          },
          message: 'May only contain letters, numbers, colon, hyphen and underscore',
        },
      ]
    },
  },

  // delta controls
  deltaControlsSettings: {
    defaultValue: DEFAULT_DELTA_CONTROLS_SETTINGS,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        parseDeltaControlsSettings,
      ]
    },
  },
};

const editChannelConfig = {
  deltaControlsSettings: {
    defaultValue: DEFAULT_DELTA_CONTROLS_SETTINGS,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Please enter a desigo object'),
        parseDeltaControlsSettings,
      ]
    },
  },
};

const contextMapConfig = {
  contextMapKey: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a key'),
        {
          validate: (value: InputValue) => {
            if (!_.isString(value)) return false; // fix for ts
            const alphanumericPattern = /^[a-zA-Z0-9]*$/; // only alphanumeric
            return alphanumericPattern.test(value);
          },
          message: 'Key must be alphanumeric',
        },
      ],
    }
  },
  contextMapValue: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a value'),
      ]
    }
  },
};

const reportIntervalConfig = {
  hours: {
    defaultValue: 0,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  minutes: {
    defaultValue: 0,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  seconds: {
    defaultValue: 0,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
};

const rulesFormConfig = {
  rulesAction: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
};

const translatorForm = {
  translators: {
    defaultValue: {},
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
    },
  },
};

const realEstateCoreForm = {
  connector: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
    },
  },
  realEstate: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
    },
  },
  building: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
    },
  },
  storey: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
    },
  },
  room: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
    },
  },
  project: {
    defaultValue: 'region',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
    },
  }
};

const publishMQTTMessageForm = {
  connectorId: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
    },
  },
  subTopic: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
    },
  },
  dataType: {
    defaultValue: 'none',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
    },
  },
  rawData: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Please enter raw data'),
      ],
    },
  },
  jsonData: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.validJson,
      ],
      validMessage: 'Valid JSON',
    },
  },
};

const rulesFormState = generateForm(rulesFormConfig);
const chirpstackDownlinkFormState = generateForm(chirpstackDownlinkFormConfig);
const netmoreDownlinkFormState = generateForm(netmoreDownlinkFormConfig);
const thingparkDownlinkFormState = generateForm(thingparkDownlinkFormConfig);
const calculationFormState = generateForm(calculationFormConfig);
const channelState = generateForm(channelConfig);
const editChannelState = generateForm(editChannelConfig);
const contextMapState = generateForm(contextMapConfig);
const reportIntervalData = generateForm(reportIntervalConfig);
const translatorFormState = generateForm(translatorForm);
const realEstateCoreFormState = generateForm(realEstateCoreForm);
const publishMQTTMessageFormState = generateForm(publishMQTTMessageForm);

export {
  chirpstackDownlinkFormState,
  netmoreDownlinkFormState,
  thingparkDownlinkFormState,
  calculationFormState,
  channelState,
  editChannelState,
  contextMapState,
  reportIntervalData,
  rulesFormState,
  translatorFormState,
  realEstateCoreFormState,
  publishMQTTMessageFormState,
};
