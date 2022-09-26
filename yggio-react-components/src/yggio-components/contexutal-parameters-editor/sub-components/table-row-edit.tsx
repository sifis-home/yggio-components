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
  ParameterName,
  ParameterValue,
  TableButton,
  StyledInput,
} from '../styled';

interface TableRowEditProps {
  onChange: (value: Parameter[]) => void;
  value: Parameter[];
  isLoading?: boolean;
  index: number;
  form: Form;
  setIsInAddMode: (mode: boolean) => void;
  setEditingParameter: (index: number | undefined) => void;
}

const TableRowEdit = (props: TableRowEditProps) => {
  const onEditSave = (index: number) => {
    const name = props.form.formInputs.name.value;
    const parametersExcludingCurrent = [...props.value];
    _.pullAt(parametersExcludingCurrent, index);
    if (_.some(parametersExcludingCurrent, ['name', name])) {
      showNameConflicPromt(name as string);
    } else {
      const modifiedParameters = [...props.value];
      modifiedParameters[index] = {
        name: props.form.formInputs.name.value as string,
        value: props.form.formInputs.value.value as string,
      };
      if (!_.isEqual(props.value[index], modifiedParameters[index])) {
        props.onChange(modifiedParameters);
      }
      props.setEditingParameter(undefined);
      props.form.resetForm();
    }
  };
  const onCancelEditing = () => {
    props.setEditingParameter(undefined);
    props.form.resetForm();
  };
  const disabled = !isFormValid(props.form.formInputs) || props.isLoading;
  const onKeyPressed = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' && !disabled) {
      onEditSave(props.index);
    }
  };
  return (
    <>
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
        onClick={() => onCancelEditing()}
        hoverColor={'black'}
        title={'Cancel'}
      >
        <Icon icon={cancelIcon as object} size={14} />
      </TableButton>
      <TableButton
        onClick={() => !disabled && onEditSave(props.index)}
        hoverColor={'green'}
        title={'Save'}
        disabled={disabled}
      >
        <Icon icon={checkIcon as object} size={15} />
      </TableButton>
    </>
  );
};

export default TableRowEdit;
