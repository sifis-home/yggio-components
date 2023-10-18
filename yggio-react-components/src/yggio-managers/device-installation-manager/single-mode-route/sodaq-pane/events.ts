
import {isFormValid} from '../../../../utils/form-wizard';
import {FormInputs, Form} from '../../../../types';

const onContinue = (
  formInputs: FormInputs,
  showAllInputValidations: Form['showAllInputValidations'],
  incrementCurrentStep: () => void
) => {
  if (isFormValid(formInputs)) {
    incrementCurrentStep();
  } else {
    showAllInputValidations();
  }
};

export {
  onContinue,
};
