import {generateForm, VALIDATION_VISIBILITY_TYPES, inputValidators} from '../../../../utils/form-wizard';

const formConfig = {
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

const formState = generateForm(formConfig);

export default formState;
