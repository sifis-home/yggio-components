/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {
  MdCheck as CheckIcon,
  MdOutlineNotInterested as CancelIcon,
} from 'react-icons/md';

import {Form} from '../../../types';
import {isFormValid} from '../../../utils/form-wizard';

import Modal from '../../../components/modal';
import TextArea from '../../../components/text-area';
import {
  TableButton,
  ModalContainer
} from '../styled';


interface ExpandedValueModalProps {
  form: Form;
  isLoading?: boolean;
  onSave: (index?: number) => void;
  onCancel: () => void;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

const ExpandedValueModal = (props: ExpandedValueModalProps) => {

  const disabled = !isFormValid(props.form.formInputs) || props.isLoading;

  return (
    <Modal
      isOpen={props.openModal}
      close={() => props.setOpenModal(false)}
      width={'400px'}
      padding={'0'}
    >
      <TextArea
        value={props.form.formInputs.value.value as string}
        onChange={evt => props.form.setInputValue('value', evt.target.value)}
        placeholder={'Value'}
        resize={'vertical'}
        height={'200px'}
      />
      <ModalContainer>
        <TableButton
          onClick={() => props.onCancel()}
          hoverColor={'black'}
          title={'Cancel'}
        >
          <CancelIcon size={16} />
        </TableButton>
        <TableButton
          onClick={() => !disabled && props.onSave()}
          hoverColor={'green'}
          title={'Save'}
          disabled={disabled}
        >
          <CheckIcon size={19} />
        </TableButton>
      </ModalContainer>
    </Modal>
  );
};

export default ExpandedValueModal;
