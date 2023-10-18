/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

type Parameter = 'name'
| 'description'
| 'location'
| 'realEstateCore'
| 'contextualParameters';


interface ParametersState {
  parameters: {
    name: boolean;
    description: boolean;
    location: boolean;
    realEstateCore: boolean;
    contextualParameters: boolean;
  }
  toggleParameter: (parameters: Parameter) => void;
}

interface Step {
  label: string;
  value: string;
}

export type {
  Parameter,
  ParametersState,
  Step,
};
