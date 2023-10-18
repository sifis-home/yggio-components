enum ACTION_TYPES {
  setInputValue = 'setInputValue',
  showInputValidation = 'showInputValidation',
  hideInputValidation = 'hideInputValidation',
  showAllInputValidations = 'showAllInputValidations',
  hideAllInputValidations = 'hideAllInputValidations',
  populateInputValues = 'populateInputValues',
  resetForm = 'resetForm',
}


enum VALIDATION_VISIBILITY_TYPES {
  always,
  never,
  optIn,
  manual,
}

export {
  ACTION_TYPES,
  VALIDATION_VISIBILITY_TYPES,
};
