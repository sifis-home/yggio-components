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

export type {
  Forms,
  ConnectorInputValue,
  UpdateLocationMutation,
};
