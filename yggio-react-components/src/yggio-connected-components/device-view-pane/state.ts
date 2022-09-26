/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';

import {generateForm, VALIDATION_VISIBILITY_TYPES, inputValidators} from '../../utils/form-wizard';
import {InputValue} from '../../types';

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

const box2FormConfig = {
  box2downlink: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
};

const nameForm = {
  name: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Please enter a name'),
        inputValidators.maximumLength(150),
      ]
    },
  },
  isEditing: {
    defaultValue: false,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
    },
  }
};

const descriptionForm = {
  description: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.maximumLength(2000),
      ]
    },
  },
  isEditing: {
    defaultValue: false,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
    },
  }
};

const positionForm = {
  latitude: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
    }
  },
  longitude: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
    }
  },
};

const accessRightsConfig = {
  username: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  }
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

  // desigo cc
  connector: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  desigoObject: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Please enter a desigo object'),
        {
          validate: (value: InputValue) => {
            if (!_.isString(value)) return false; // fix for ts
            const hexPattern = /^[a-zA-Z0-9_:]+$/;
            return hexPattern.test(value);
          },
          message: 'May only contain letters, numbers, colon and underscore',
        },
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

const chartsConfig = {
  field: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
};

const dataConfig = {
  filter: {
    defaultValue: 'values',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  display: {
    defaultValue: 'pretty',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  }
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

const deviceModelNameForm = {
  deviceModelName: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  isEditing: {
    defaultValue: false,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
    },
  }
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

const rulesFormState = generateForm(rulesFormConfig);
const chirpstackDownlinkFormState = generateForm(chirpstackDownlinkFormConfig);
const netmoreDownlinkFormState = generateForm(netmoreDownlinkFormConfig);
const thingparkDownlinkFormState = generateForm(thingparkDownlinkFormConfig);
const box2FormState = generateForm(box2FormConfig);
const calculationFormState = generateForm(calculationFormConfig);
const accessRightsState = generateForm(accessRightsConfig);
const channelState = generateForm(channelConfig);
const contextMapState = generateForm(contextMapConfig);
const chartsState = generateForm(chartsConfig);
const dataState = generateForm(dataConfig);
const reportIntervalData = generateForm(reportIntervalConfig);
const nameFormState = generateForm(nameForm);
const descriptionFormState = generateForm(descriptionForm);
const deviceModelNameFormState = generateForm(deviceModelNameForm);
const positionFormState = generateForm(positionForm);
const translatorFormState = generateForm(translatorForm);
const realEstateCoreFormState = generateForm(realEstateCoreForm);

export {
  nameFormState,
  descriptionFormState,
  chirpstackDownlinkFormState,
  netmoreDownlinkFormState,
  thingparkDownlinkFormState,
  box2FormState,
  calculationFormState,
  accessRightsState,
  channelState,
  contextMapState,
  chartsState,
  dataState,
  reportIntervalData,
  rulesFormState,
  deviceModelNameFormState,
  positionFormState,
  translatorFormState,
  realEstateCoreFormState,
};
