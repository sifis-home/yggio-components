import {Form} from '../../../types';
import {getFormValues} from '../../../utils/form-wizard';

const selectMatchPattern = (form: Form) => {
  const formValues = getFormValues(form.formInputs);
  const searchField = formValues.searchField as string;
  const value = formValues[searchField];
  if (!value) return undefined;
  return {[searchField]: value};
};

export {
  selectMatchPattern,
};
