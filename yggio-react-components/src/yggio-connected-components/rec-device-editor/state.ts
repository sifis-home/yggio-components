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
