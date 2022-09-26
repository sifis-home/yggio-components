/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {VALIDATION_VISIBILITY_TYPES, generateForm} from '../../utils/form-wizard';

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

const realEstateCoreFormState = generateForm(realEstateCoreForm);

export {
  realEstateCoreFormState,
};
