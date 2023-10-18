import React, {useState} from 'react';
import {
  MdCheck as CheckIcon,
  MdOutlineNotInterested as CancelIcon,
  MdAspectRatio as ExpandIcon,
} from 'react-icons/md';

import {Form, Parameter} from '../../../types';
import {isFormValid} from '../../../utils/form-wizard';
import ExpandedValueModal from './expanded-value-modal';
import {
  showNameConflictPromt,
  convertToAppropriateType,
  hasNameConflict,
} from '../utils';
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

  const [openModal, setOpenModal] = useState(false);

  const onAddSave = () => {
    const value = convertToAppropriateType(props.form.formInputs.value.value as string)!;
    const name = props.form.formInputs.name.value as string;
    if (hasNameConflict(props.value, name)) {
      showNameConflictPromt(name);
    } else {
      const modifiedParameters = [...props.value];
      modifiedParameters.push({
        name,
        value
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

  const onKeyDown = (evt: React.KeyboardEvent) => {
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
          onKeyDown={onKeyDown}
        />
      </ParameterName>
      <ParameterValue>
        <StyledInput
          type="text"
          onChange={evt => props.form.setInputValue('value', evt.target.value)}
          value={props.form.formInputs.value.value as string}
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
        onSave={() => onAddSave()}
        onCancel={() => onCancelAdding()}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <TableButton
        onClick={() => onCancelAdding()}
        hoverColor={'black'}
        title={'Cancel'}
      >
        <CancelIcon size={16} />
      </TableButton>
      <TableButton
        onClick={() => !disabled && onAddSave()}
        hoverColor={'green'}
        title={'Save'}
        disabled={disabled}
      >
        <CheckIcon size={19} />
      </TableButton>
    </Table>
  );
};

export default AddForm;
