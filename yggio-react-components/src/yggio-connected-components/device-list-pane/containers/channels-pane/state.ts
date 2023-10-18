/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {generateForm, VALIDATION_VISIBILITY_TYPES} from '../../../../utils/form-wizard';
import {FormConfig, InputValue} from '../../../../types';
import {parseDeltaControlsSettings} from '../../../../utils';
import {DEFAULT_DELTA_CONTROLS_SETTINGS} from '../../../../constants';

const channelConfig: FormConfig = {
  name: {
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
              const urlRegex = /^https?:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/;
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
              const UUIDRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
              const mongoIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

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
  connector: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
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

const channelState = generateForm(channelConfig);

export {
  channelState,
};
