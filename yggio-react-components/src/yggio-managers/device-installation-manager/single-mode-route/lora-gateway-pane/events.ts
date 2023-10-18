import {isFormValid} from '../../../../utils/form-wizard';
import {Form, FormInputs} from '../../../../types';

const onContinue = (
  formInputs: FormInputs,
  incrementCurrentStep: () => void,
  showAllInputValidations:
  Form['showAllInputValidations']
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
