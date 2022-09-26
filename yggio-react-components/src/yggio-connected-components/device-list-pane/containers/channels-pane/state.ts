/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {generateForm, VALIDATION_VISIBILITY_TYPES} from '../../../../utils/form-wizard';
import {FormConfig, InputValue} from '../../../../types';

const channelConfig: FormConfig = {
  name: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  topic: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  url: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        {
          validate (value: InputValue) {
            if (typeof value === 'string') {
              const urlRegex = new RegExp(/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi);
              return !!value.match(urlRegex);
            }
            return false;
          },
          message: 'Invalid URL - Please enter a valid URL',
        }
      ],
    }
  },
  type: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  recipient: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        {
          validate (value: InputValue) {
            if (typeof value === 'string') {
              const UUIDRegex = new RegExp(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/);
              const mongoIdRegex = new RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i);

              return !!(value.match(UUIDRegex) || value.match(mongoIdRegex));
            }
            return false;
          },
          message: 'Invalid UUID or MongoDB ID - Please enter a valid UUID (keycloakUser) or a valid MongoDB ID (basicCredentialsSet)',
        }
      ],
    }
  },
  protocol: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  connectionString: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
};

const channelState = generateForm(channelConfig);

export {
  channelState,
};
