import React from 'react';
import _ from 'lodash';
import {
  MdMode as EditIcon,
  MdDelete as TrashIcon,
} from 'react-icons/md';

import {Tooltip} from '@chakra-ui/react';

import {
  showRemovePromt,
  returnType,
  convertToAppropriateType
} from '../utils';
import {Parameter} from '../../../types';
import Chip from '../../../components/chip';
import {
  ParameterName,
  ParameterValue,
  TableButton,
  TypeColumn
} from '../styled';

interface TableRowProps {
  onChange: (value: Parameter[]) => void;
  value: Parameter[];
  showRemovePromt?: boolean;
  setInputValue: (name: string, value: string | number | Record<string, string> | string[]) => void;
  setEditingParameter: (index: number) => void;
  editingParameter?: number;
  isInAddMode: boolean;
  isLoading?: boolean;
  parameter: {value: string | number | Record<string, string> | string[], name: string};
  index: number;
}

const TableRow = (props: TableRowProps) => {

  const type = convertToAppropriateType(JSON.stringify(props.value[props.index].value));
  const typeDisplay = returnType(type);

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

  const value = typeof (props.parameter.value) === 'string'
    ? props.parameter.value
    : JSON.stringify(props.parameter.value);

  const prettyDisplay = (value: string) => {
    if (value.length > 40) {
      return _.truncate(value, {length: 40});
    }
    return value;
  };

  return (
    <>
      <ParameterName disabled={disabled}>
        {props.parameter.name}
      </ParameterName>
      <ParameterValue
        disabled={disabled}
        type={typeDisplay}>
        {prettyDisplay(value)}
      </ParameterValue>
      <Tooltip
        label='This label varifies the type of value you have entered. To make sure you enter lists and objects correctly, please use a free tool such as: https://jsonformatter.org/json-parser'
        openDelay={500}>
        <TypeColumn>
          <Chip
            text={typeDisplay}
          />
        </TypeColumn>
      </Tooltip>
      <TableButton
        onClick={() => !disabled && onEditStart(props.index)}
        disabled={disabled}
        hoverColor={'black'}
        title={'Edit'}
      >
        <EditIcon size={16} />
      </TableButton>
      <TableButton
        onClick={() => !disabled && onRemove(props.index)}
        disabled={disabled}
        hoverColor={'red'}
        title={'Delete'}
      >
        <TrashIcon size={18} />
      </TableButton>
    </>
  );
};

export default TableRow;
