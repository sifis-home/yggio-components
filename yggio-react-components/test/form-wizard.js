/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const assert = require('assert').strict;

const {validateInputValue} = require('../src/utils/form-wizard/state/validation');
const {VALIDATION_VISIBILITY_TYPES} = require('../src/utils/form-wizard/state/constants');
const {validateConfig} = require('../src/utils/form-wizard/config-validator');

describe('form-wizard', () => {

  describe('validateConfig', () => {

    const PREFIX = 'generateForm dev error:';

    it('throw error when input is not a object', () => {
      const input = 'hello';
      const expectedErrorMessage = `${PREFIX} config must be an object`;
      assert.throws(() => validateConfig(input), {message: expectedErrorMessage});
    });

    it('throw error when input is a empty object', () => {
      const input = {};
      const expectedErrorMessage = `${PREFIX} config must not be an empty object`;
      assert.throws(() => validateConfig(input), {message: expectedErrorMessage});
    });

    it('throw error when a field is not an object', () => {
      const input = {
        myField: 'hello'
      };
      const expectedErrorMessage = `${PREFIX} myField must be an object`;
      assert.throws(() => validateConfig(input), {message: expectedErrorMessage});
    });

    it('throw error when a field does not include defaultValue', () => {
      const input = {
        myField: {
          validation: {

          },
        },
      };
      const expectedErrorMessage = `${PREFIX} myField.defaultValue must be included`;
      assert.throws(() => validateConfig(input), {message: expectedErrorMessage});
    });

    it('throw error when validMessage is not a string ', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
            validMessage: 5,
          },
        },
      };
      const expectedErrorMessage = `${PREFIX} myField.validation.validMessage must be a string`;
      assert.throws(() => validateConfig(input), {message: expectedErrorMessage});
    });

    it('throw error when a field does not include validation', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
        },
      };
      assert.throws(() => validateConfig(input));
    });

    it('do not throw error when a field does not include validation.validators', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
          },
        },
      };
      assert.doesNotThrow(() => validateConfig(input));
    });

    // Validator (single)

    it('throw error when a fields validator (singular) is not an object or function', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
            validator: '',
          },
        },
      };
      const expectedErrorMessage = `${PREFIX} myField.validation.validator must be an object or function`;
      assert.throws(() => validateConfig(input), {message: expectedErrorMessage});
    });

    it('throw error when a fields validator (singular) does not include a validate property', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
            validator: {},
          },
        },
      };
      const expectedErrorMessage = `${PREFIX} myField.validation.validator must have a validate property`;
      assert.throws(() => validateConfig(input), {message: expectedErrorMessage});
    });

    it('throw error when a fields validator (singular) has a validate property that is not an array', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
            validator: {
              validate: 'hello',
            },
          },
        },
      };
      const expectedErrorMessage = `${PREFIX} myField.validation.validator validate must be a function`;
      assert.throws(() => validateConfig(input), {message: expectedErrorMessage});
    });

    it('throw error when a fields validator (singular) has no message property', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
            validator: {
              validate: () => true,
            },
          },
        },
      };
      const expectedErrorMessage = `${PREFIX} myField.validation.validator must have a message property`;
      assert.throws(() => validateConfig(input), {message: expectedErrorMessage});
    });

    it('throw error when a fields validator (singular) message is not a string', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
            validator: {
              validate: () => true,
              message: 5,
            },
          },
        },
      };
      const expectedErrorMessage = `${PREFIX} myField.validation.validator message must be a string or a function`;
      assert.throws(() => validateConfig(input), {message: expectedErrorMessage});
    });

    it('do not throw error when a fields validator (singular) is a valid object validator', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
            validator: {
              validate: () => true,
              message: 'hello',
            },
          },
        },
      };
      assert.doesNotThrow(() => validateConfig(input));
    });

    it('do not throw error when a fields validator (singular) is a valid function validator', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
            validator: () => true,
          },
        },
      };
      assert.doesNotThrow(() => validateConfig(input));
    });

    // Validators (array)

    it('throw error when a fields validators is not an array', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
            validators: 'hello',
          },
        },
      };
      const expectedErrorMessage = `${PREFIX} myField.validation.validators must be an array`;
      assert.throws(() => validateConfig(input), {message: expectedErrorMessage});
    });

    it('do not throw error when a fields validators is an empty array', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
            validators: [],
          },
        },
      };
      assert.doesNotThrow(() => validateConfig(input));
    });

    it('throw error when a fields validator (in array) is not an object or function', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
            validators: [
              'hello',
            ],
          },
        },
      };
      const expectedErrorMessage = `${PREFIX} myField.validation.validators[0] must be an object or function`;
      assert.throws(() => validateConfig(input), {message: expectedErrorMessage});
    });

    it('throw error when a fields validator (in array) does not include a validate property', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
            validators: [
              {},
            ],
          },
        },
      };
      const expectedErrorMessage = `${PREFIX} myField.validation.validators[0] must have a validate property`;
      assert.throws(() => validateConfig(input), {message: expectedErrorMessage});
    });

    it('throw error when a fields validator (in array) has a validate property that is not an array', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
            validators: [
              {
                validate: 'hello',
              },
            ],
          },
        },
      };
      const expectedErrorMessage = `${PREFIX} myField.validation.validators[0] validate must be a function`;
      assert.throws(() => validateConfig(input), {message: expectedErrorMessage});
    });

    it('throw error when a fields validator (in array) has no message property', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
            validators: [
              {
                validate: () => true,
              },
            ],
          },
        },
      };
      const expectedErrorMessage = `${PREFIX} myField.validation.validators[0] must have a message property`;
      assert.throws(() => validateConfig(input), {message: expectedErrorMessage});
    });

    it('throw error when a fields validator (in array) message is not a string', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
            validators: [
              {
                validate: () => true,
                message: 5,
              },
            ],
          },
        },
      };
      const expectedErrorMessage = `${PREFIX} myField.validation.validators[0] message must be a string or a function`;
      assert.throws(() => validateConfig(input), {message: expectedErrorMessage});
    });

    it('', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
            validators: [
              () => true,
            ],
          },
        },
      };
      assert.doesNotThrow(() => validateConfig(input));
    });

    it('do not throw error when everything is present and correct', () => {
      const input = {
        myField: {
          defaultValue: 'hello',
          validation: {
            visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
            validMessage: 'hello',
            validators: [
              {
                validate: () => true,
                message: '',
              },
              {
                validate: () => true,
                message: () => 'hello',
              }
            ],
          },
        },
      };
      assert.doesNotThrow(() => validateConfig(input));
    });

  });

  describe('validateInput', () => {
    it('Valid if no validators are supplied', () => {
      const res = validateInputValue({validation: {}}, 'hello');
      const expectedResult = {isValid: true, message: null};
      assert.deepStrictEqual(res, expectedResult);
    });
    it('Valid with a object validator', () => {
      const input = {
        validation: {
          visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
          validators: [
            {
              validate: value => value === 'hello',
              message: 'error',
            }
          ],
        },
      };
      const res = validateInputValue(input, 'hello');
      const expectedResult = {isValid: true, message: null};
      assert.deepStrictEqual(res, expectedResult);
    });
    it('Invalid with a object validator', () => {
      const input = {
        validation: {
          visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
          validators: [
            {
              validate: value => value === 'hello',
              message: 'error',
            }
          ],
        },
      };
      const res = validateInputValue(input, 'hi');
      const expectedResult = {isValid: false, message: 'error'};
      assert.deepStrictEqual(res, expectedResult);
    });
    it('Invalid with a object validator with message function', () => {
      const input = {
        validation: {
          visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
          validators: [
            {
              validate: value => value === 'hello',
              message: value => `${value} is not the correct value`,
            }
          ],
        },
      };
      const res = validateInputValue(input, 'hi');
      const expectedResult = {isValid: false, message: 'hi is not the correct value'};
      assert.deepStrictEqual(res, expectedResult);
    });
    it('Valid with a function validator', () => {
      const input = {
        validation: {
          visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
          validators: [
            value => {
              if (value !== 'hello') { throw Error('error'); }
            }
          ]
        },
      };
      const res = validateInputValue(input, 'hello');
      const expectedResult = {isValid: true, message: null};
      assert.deepStrictEqual(res, expectedResult);
    });
    it('Invalid with a function validator', () => {
      const input = {
        validation: {
          visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
          validators: [
            value => {
              if (value !== 'hello') { throw Error('error'); }
            }
          ]
        },
      };
      const res = validateInputValue(input, 'hi');
      const expectedResult = {isValid: false, message: 'error'};
      assert.deepStrictEqual(res, expectedResult);
    });
    it('Valid with a function validator', () => {
      const input = {
        validation: {
          visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
          validators: [
            value => {
              if (value !== 'hello') { throw Error('error'); }
            }
          ]
        },
      };
      const res = validateInputValue(input, 'hello');
      const expectedResult = {isValid: true, message: null};
      assert.deepStrictEqual(res, expectedResult);
    });
    it('Valid with a valid message', () => {
      const input = {
        validation: {
          visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
          validMessage: 'success',
          validators: [
            {
              validate: value => value === 'hello',
              message: 'error',
            }
          ],
        },
      };
      const res = validateInputValue(input, 'hello');
      const expectedResult = {isValid: true, message: 'success'};
      assert.deepStrictEqual(res, expectedResult);
    });
  });

});
