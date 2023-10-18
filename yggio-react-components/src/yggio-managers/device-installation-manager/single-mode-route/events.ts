import _ from 'lodash';
import {Form} from '../../../types';

type Evt = React.ChangeEvent<HTMLInputElement> |
React.ChangeEvent<HTMLSelectElement> |
React.ChangeEvent<HTMLTextAreaElement>;

const onInputChange = (form: Form, evt: Evt) => {
  const {target: {value, name}} = evt;
  form.setInputValue(name, value);
  form.showInputValidation(name);
};

const onInputBlur = (form: Form, evt: Evt) => {
  const {target: {name}} = evt;
  form.showInputValidation(name);
};

const onInputChangeUpperCase = (form: Form, evt: Evt) => {
  const {target: {value, name}} = evt;
  const val = _.isString(value) ? value.toUpperCase() : value;
  form.setInputValue(name, val);
  form.showInputValidation(name);
};

export {
  onInputChange,
  onInputChangeUpperCase,
  onInputBlur,
};
