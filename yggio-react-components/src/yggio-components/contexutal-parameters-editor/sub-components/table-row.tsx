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
import {ic_clear as removeIcon} from 'react-icons-kit/md/ic_clear';
import {ic_mode_edit as editIcon} from 'react-icons-kit/md/ic_mode_edit';

import {showRemovePromt} from '../utils';
import {Parameter} from '../types';
import {
  ParameterName,
  ParameterValue,
  TableButton,
} from '../styled';

interface TableRowProps {
  onChange: (value: Parameter[]) => void;
  value: Parameter[];
  showRemovePromt?: boolean;
  setInputValue: (name: string, value: string) => void;
  setEditingParameter: (index: number) => void;
  editingParameter?: number;
  isInAddMode: boolean;
  isLoading?: boolean;
  parameter: {value: string, name: string};
  index: number;
}

const TableRow = (props: TableRowProps) => {
  const onRemove = (index: number) => {
    const performRemove = () => {
      const modifiedParameters = [...props.value];
      _.pullAt(modifiedParameters, [index]);
      props.onChange(modifiedParameters);
    };
    if (props.showRemovePromt) {
      showRemovePromt(props.value[index].name, performRemove);
    } else {
      performRemove();
    }
  };
  const onEditStart = (index: number) => {
    const {name, value} = props.value[index];
    props.setInputValue('name', name);
    props.setInputValue('value', value);
    props.setEditingParameter(index);
  };
  const disabled = props.editingParameter !== undefined || props.isInAddMode || props.isLoading;
  return (
    <>
      <ParameterName disabled={disabled}>
        {props.parameter.name}
      </ParameterName>
      <ParameterValue disabled={disabled}>
        {props.parameter.value}
      </ParameterValue>
      <TableButton
        onClick={() => !disabled && onEditStart(props.index)}
        disabled={disabled}
        hoverColor={'black'}
        title={'Edit'}
      >
        <Icon icon={editIcon as object} size={14} />
      </TableButton>
      <TableButton
        onClick={() => !disabled && onRemove(props.index)}
        disabled={disabled}
        hoverColor={'red'}
        title={'Delete'}
      >
        <Icon icon={removeIcon as object} size={17} />
      </TableButton>
    </>
  );
};

export default TableRow;
