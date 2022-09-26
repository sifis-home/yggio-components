/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {Icon} from 'react-icons-kit';
import {ic_do_not_disturb as cancelIcon} from 'react-icons-kit/md/ic_do_not_disturb';
import {checkmark as checkIcon} from 'react-icons-kit/ionicons/checkmark';

import {Form} from '../../../types';
import {Parameter} from '../types';
import {isFormValid} from '../../../utils/form-wizard';
import {showNameConflicPromt} from '../utils';
import {
  Table,
  ParameterName,
  ParameterValue,
  TableButton,
  StyledInput,
} from '../styled';

interface AddFormProps {
  value: Parameter[];
  onChange: (value: Parameter[]) => void;
  setIsInAddMode: (mode: boolean) => void;
  isLoading?: boolean;
  form: Form;
}

const AddForm = (props: AddFormProps) => {

  const onAddSave = () => {
    const name = props.form.formInputs.name.value as string;
    if (_.some(props.value, ['name', name])) {
      showNameConflicPromt(name);
    } else {
      const modifiedParameters = [...props.value];
      modifiedParameters.push({
        name,
        value: props.form.formInputs.value.value as string,
      });
      props.onChange(modifiedParameters);
      props.setIsInAddMode(false);
      props.form.resetForm();
    }
  };

  const onCancelAdding = () => {
    props.setIsInAddMode(false);
    props.form.resetForm();
  };

  const disabled = !isFormValid(props.form.formInputs) || props.isLoading;

  const onKeyPressed = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' && !disabled) {
      onAddSave();
    }
  };

  return (
    <Table showTopBorder>
      <ParameterName>
        <StyledInput
          type="text"
          onChange={evt => props.form.setInputValue('name', evt.target.value)}
          value={props.form.formInputs.name.value as string}
          placeholder={'Name'}
          onKeyPress={onKeyPressed}
        />
      </ParameterName>
      <ParameterValue>
        <StyledInput
          type="text"
          onChange={evt => props.form.setInputValue('value', evt.target.value)}
          value={props.form.formInputs.value.value as string}
          placeholder={'Value'}
          onKeyPress={onKeyPressed}
        />
      </ParameterValue>
      <TableButton
        onClick={() => onCancelAdding()}
        hoverColor={'black'}
        title={'Cancel'}
      >
        <Icon icon={cancelIcon as object} size={14} />
      </TableButton>
      <TableButton
        onClick={() => !disabled && onAddSave()}
        hoverColor={'green'}
        title={'Save'}
        disabled={disabled}
      >
        <Icon icon={checkIcon as object} size={14} />
      </TableButton>
    </Table>
  );
};

export default AddForm;
