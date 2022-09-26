/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React, {useState} from 'react';
import _ from 'lodash';

import {useLocalState} from '../../hooks';
import Spinner from '../../components/spinner';
import formStateOptions from './state';
import AddForm from './sub-components/add-form';
import TableRowEdit from './sub-components/table-row-edit';
import TableRow from './sub-components/table-row';
import {Parameter} from './types';
import {
  Container,
  Table,
  AddButton,
  SpinnerContainer,
  TableHeading,
} from './styled';

interface ContextualParametersEditorProps {
  onChange: (value: Parameter[]) => void;
  value?: Parameter[];
  showRemovePromt?: boolean;
  showTableHeading?: boolean;
  isLoading?: boolean;
  margin?: string;
  maxWidth?: string;
}

const ContextualParametersEditor = (props: ContextualParametersEditorProps) => {

  const [isInAddMode, setIsInAddMode] = useState(false);
  const [editingParameter, setEditingParameter] = useState<number>();

  const formState = useLocalState(formStateOptions);

  return (
    <Container
      margin={props.margin}
      maxWidth={props.maxWidth}
    >
      {props.value && props.value.length > 0 && (
        <Table showTopBorder={!props.showTableHeading}>
          {props.showTableHeading && (
            <>
              <TableHeading>Name</TableHeading>
              <TableHeading>Value</TableHeading>
              <TableHeading />
              <TableHeading />
            </>
          )}
          {_.map(props.value, (parameter, index) => (
            <React.Fragment key={parameter.name}>
              {editingParameter !== index && (
                <TableRow
                  onChange={props.onChange}
                  value={props.value || []}
                  showRemovePromt={props.showRemovePromt}
                  isLoading={props.isLoading}
                  parameter={parameter}
                  index={index}
                  setEditingParameter={setEditingParameter}
                  isInAddMode={isInAddMode}
                  editingParameter={editingParameter}
                  setInputValue={formState.setInputValue}
                />
              )}
              {editingParameter === index && (
                <TableRowEdit
                  onChange={props.onChange}
                  value={props.value || []}
                  index={index}
                  isLoading={props.isLoading}
                  setIsInAddMode={setIsInAddMode}
                  setEditingParameter={setEditingParameter}
                  form={formState}
                />
              )}
            </React.Fragment>
          ))}
        </Table>
      )}
      {(!isInAddMode && !props.isLoading) && (
        <AddButton
          onClick={() => setIsInAddMode(true)}
          disabled={editingParameter !== undefined}
        >
          + Add
        </AddButton>
      )}
      {(isInAddMode && !props.isLoading) && (
        <AddForm
          value={props.value || []}
          onChange={props.onChange}
          isLoading={props.isLoading}
          setIsInAddMode={setIsInAddMode}
          form={formState}
        />
      )}
      {props.isLoading && (
        <SpinnerContainer>
          <Spinner size={18} color={'#555'} />
        </SpinnerContainer>
      )}
    </Container>
  );
};

export default ContextualParametersEditor;
