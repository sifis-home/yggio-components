import _ from 'lodash';
import {FormInputs} from '../../../../types';

const buildSourcePath = ({
  path,
  isGeneric,
}: {path: string, isGeneric?: string}) => {
  if (!path) {
    return null;
  }
  if (isGeneric) {
    return `value_${path}`;
  }
  return path;
};

const isDisabledDatePicker = (formInputs: FormInputs) => {
  const presetValue = formInputs.preset.value;
  const disablingPresets = ['a', 'b', 'c', 'd'];

  return _.includes(disablingPresets, presetValue);
};

export {
  buildSourcePath,
  isDisabledDatePicker,
};
