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
