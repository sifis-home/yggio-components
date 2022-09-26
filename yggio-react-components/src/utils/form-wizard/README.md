# Form wizard v.3

This is a lib for simplifying the usage of forms. It takes care of validation- and visibility-logic. It's made of three parts, (1) `gerateForm`-function, (2) a lib with ready-to-use validators and (3) some utils-functions.

## generateForm


`generateForm(formConfig)` creates a form state together with some actions. Use it when creating a raw component:

```js
const formConfig = {...}; // preferably named formConfig

const formState = generateForm(formConfig);

const RawExamplePane = compose(
  withState(formState),
)(BasicExamplePane);

```

### formConfig

formConfig must have the following structure. This data is carefully validated and an error is thrown if it's invalid. Note that if an error occurs the story will not be shown and the error message can be seen in the console.

```js
{
  myInput: {
    defaultValue: [string],
    validation: {
      visibilityType: [string],
      validMessage: [string],
      validators: [
        [Validator],
        ...
      ],
      validator: [Validator]
    }
  },
  ...
}

```

`defaultValue` is the default value of the input.

`visibilityType` is one of the preset visibility types found in `form-wizard/state/validation-visibility-types.js`.

`validMessage` (optional) is the message that will be shown to the user if validation succeeds.

`validators` (optional) is an array of validators that are later used to validate if the input value is valid. The order of the items are essential as the first one is validated first and so on. This property is not required if no validation is wanted, then which it can be an empty array or completely omitted.

`validator` (optional) can be used instead of validators if you only desire one. If both validators and validator are supplied they are merged.

### Validator alt. 1 - validators-lib
form-wizard has a library of predefined validators here: `lib/input-validators`. They can be used like this:
```js
import {
  inputValidators,
} from '../../index';
...
const validator = inputValidators.inputRequired('Please select a connector');
]
```

### Validator alt. 2 - custom validator object

```js
{
  validate: [function],
  message: [string || function]
}
```

`validate` is a function that validates the input's current value. It takes the current input value as a parameter and returns a boolean. Note that the util method inputValidators provides a set of common validators that is ready-to-use.

`message` is the error message which will be shown to the user if the validation fails. If you want to include the current input value in the message you can use a function instead of a string. The function takes the current input value as a parameter and returns a string.

### Validator alt. 3 - custom validator function

You can also create a custom validator function. If an error is thrown the input is resolved as invalid and the `validation.message` is set to the error message. If no error is thrown the input is resolved as valid.

```js
example:

(value) => {
  if (value < 0) { throw Error('cannot be negative') }
  if (value > 10) { throw Error('cannot be larger than 10') }
}

```
## State

The state created by generateForm has the following structure:

```js
{
  formInputs: {
    myInput: {
      value: [string],
      validation: {
        isValid: [boolean],
        isVisible: [boolean],
        message: [string],
      }
    },
  },
  isPopulated: [boolean],
}
```

`formInputs` is an object containing the states of all inputs.

`value` is the current value of the input.

`message` is a message to be shown to the user if the current value is valid or not. The validators are excuted in order and the first one to fail will set the message. If no validator fail the validMessage is used (if this is set).

`isValid` tells whether the current value is valid.

`isVisible` tells wether the message should be shown. When using utils-function for getting message this is required to be true in order to return.

`isPopulated` tells whether the populateInputValues action has ever been called.

### Actions

The form state generated has five actions.
1. `setInputValue`
1. `showInputValidation`
1. `hideInputValidation`
1. `showAllInputValidations`
1. `hideAllInputValidations`

### setInputValue
Sets the value of an input. It requires two parameters: the name of the input (must be the same as the corresponding name in the generateForm input data) and the value of the input. This will automatically trigger a validation and change `isValid`. And also, based on what `visibilityType` is chosen for the field, the `isVisible` will change.

### hide/show
These functions are used to set visibility of input field(s) validation messages. Visibility types are often not enough for getting intended user experience. Common usages are exposed through the generate-functions in utils.

## Util functions

### inputValidators
A collection of common, ready-to-use input validator functions.

### getValidationErrorMessage
Convenience method to get an input's validation error message, if any and if it should be visible.


### getValidationSuccessMessage
Convenience method to get an input's eventual validation success message, if any and if it should be visible.

### isFormValid
Convenience method that checks if all inputs are valid. Commonly used in onSubmit to decide if it should show validation errors or perform some action (e.g. go to another page).

### getFormValues
Convenience method to pick all the values, with proper keys, of the inputs in formInputs.

### getFormShape
Creates the proptype shape for formInputs. Used for setting the proptype in a basic component.

----

## A note on user experience
Below are some guidelines that provides the user with good feedback without interrupting his flow.

### General
Fileds should first show their errors when the user has been there, i.e. onBlur at the latest and onChange at the earliest.

All validation errors should be shown if form is not valid "on submit".

### Complicated fields
Fields that has a lot of requirements, e.g. devEui or passwords, should show their validation message as soon as the user starts typing, i.e. onChange. This is called instant validation.
