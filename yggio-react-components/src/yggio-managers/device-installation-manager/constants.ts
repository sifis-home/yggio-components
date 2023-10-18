const STEP_NOT_FOUND = 'STEP_NOT_FOUND';

// Note: must be kept PascalCase
enum LORA_CONNECTOR_TYPES {
  None = 'None',
  ChirpStack = 'ChirpStack',
  Netmore = 'Netmore',
  ActilityThingpark = 'ActilityThingpark',
}

// Note: must be kept capitalized
enum LORA_ACTIVATION_TYPES {
  OTAA = 'OTAA',
  ABP = 'ABP',
}

export {
  STEP_NOT_FOUND,
  LORA_CONNECTOR_TYPES,
  LORA_ACTIVATION_TYPES,
};
