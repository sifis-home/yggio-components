/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState} from 'react';
import _ from 'lodash';
import {
  MdCheck as CheckIcon,
  MdOutlineNotInterested as CancelIcon,
  MdAspectRatio as ExpandIcon,
} from 'react-icons/md';

import {Form, Parameter} from '../../../types';
import {isFormValid} from '../../../utils/form-wizard';
import {showNameConflictPromt, convertToAppropriateType} from '../utils';
import ExpandedValueModal from './expanded-value-modal';
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

  const [openModal, setOpenModal] = useState(false);

  const hasNameConflict = (parametersExcludingCurrent: Parameter[], name: string) => {
    return _.some(parametersExcludingCurrent, ['name', name]);
  };

  const resetEditingState = (setEditingParameter: (index: number | undefined) => void, resetForm: () => void) => {
    setEditingParameter(undefined);
    resetForm();
  };

  const excludeCurrentParameter = (parameters: Parameter[], index: number) => {
    const parametersExcludingCurrent = [...parameters];
    _.pullAt(parametersExcludingCurrent, index);
    return parametersExcludingCurrent;
  };

  const updateParameterAtIndex = (parameters: Parameter[], index: number, form: Form) => {
    const modifiedParameters = [...parameters];
    const value = convertToAppropriateType(form.formInputs.value.value as string);
    modifiedParameters[index] = {
      name: props.form.formInputs.name.value as string,
      value,
    };
    return modifiedParameters;
  };

  const onEditSave = (index: number) => {
    const name = props.form.formInputs.name.value;
    const parametersExcludingCurrent = excludeCurrentParameter(props.value, index);
    if (hasNameConflict(parametersExcludingCurrent, name as string)) {
      showNameConflictPromt(name as string);
    } else {
      const modifiedParameters = updateParameterAtIndex(props.value, index, props.form);
      if (!_.isEqual(props.value[index], modifiedParameters[index])) {
        props.onChange(modifiedParameters);
      }
      resetEditingState(props.setEditingParameter, props.form.resetForm);
    }
  };

  const onCancelEditing = () => {
    resetEditingState(props.setEditingParameter, props.form.resetForm);
  };

  const disabled = !isFormValid(props.form.formInputs) || props.isLoading;
  const onKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' && !disabled) {
      onEditSave(props.index);
    }
  };

  const value = typeof (props.form.formInputs.value.value) === 'string'
    ? props.form.formInputs.value.value
    : JSON.stringify(props.form.formInputs.value.value);

  return (
    <>
      <ParameterName>
        <StyledInput
          type="text"
          onChange={evt => props.form.setInputValue('name', evt.target.value)}
          value={props.form.formInputs.name.value as string}
          placeholder={'Name'}
          onKeyDown={onKeyDown}
        />
      </ParameterName>
      <ParameterValue>
        <StyledInput
          type="text"
          onChange={evt => props.form.setInputValue('value', evt.target.value)}
          value={value}
          placeholder={'Value'}
          onKeyDown={onKeyDown}
        />
      </ParameterValue>
      <TableButton
        onClick={() => setOpenModal(true)}
        hoverColor={'black'}
        title={'Expand window'}
      >
        <ExpandIcon size={16} />
      </TableButton>
      <ExpandedValueModal
        form={props.form}
        isLoading={props.isLoading}
        onSave={() => onEditSave(props.index)}
        onCancel={() => onCancelEditing()}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <TableButton
        onClick={() => onCancelEditing()}
        hoverColor={'black'}
        title={'Cancel'}
      >
        <CancelIcon size={16} />
      </TableButton>
      <TableButton
        onClick={() => !disabled && onEditSave(props.index)}
        hoverColor={'green'}
        title={'Save'}
        disabled={disabled}
      >
        <CheckIcon size={19} />
      </TableButton>
    </>
  );
};

export default TableRowEdit;
