/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {UseMutationResult} from '@tanstack/react-query';

import {Form, Location} from '../../../types';
import {LORA_CONNECTOR_TYPES} from '../constants';

interface Forms {
  [key: string]: Form;
}

interface ConnectorInputValue {
  deviceId: string;
  type: LORA_CONNECTOR_TYPES;
}

type UpdateLocationMutation = UseMutationResult<Location, unknown, Location, unknown>;

export {
  Forms,
  ConnectorInputValue,
  UpdateLocationMutation,
};
