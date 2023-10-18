/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

// Logic
import {
  COLOR_OPTIONS,
  COLUMN_THRESHOLDS,
  COLUMN_THRESHOLDS_LABELS,
} from '../../constants';
import {VIEW_TYPES} from '../../../../constants';
import {
  colorStyles,
} from '../../utils';

// UI
import Button from '../../../../components/button';
import Select from '../../../../components/select';
import TextField from '../../../../components/text-field';
import NumberField from '../../../../components/number-field';
import {HorizontalLine} from '../../../../global/styled';
import {viewApi} from '../../../../api';

interface ColumnThreshold {
  comparison: keyof typeof COLUMN_THRESHOLDS_LABELS;
  value: number;
  color: string;
}

interface NewColumnProps {
  setTabIndex: (index: number) => void;
}

const NewColumn = (props: NewColumnProps) => {
  const queryClient = useQueryClient();
  const createViewMutation = viewApi.useCreateViewMutation(queryClient);
  const {t} = useTranslation();
  const [columnName, setColumnName] = React.useState('');
  const [columnField, setColumnField] = React.useState('');
  const [value, setValue] = React.useState(0);
  const [comparison, setComparison] = React.useState<keyof typeof COLUMN_THRESHOLDS_LABELS>('gt');
  const [color, setColor] = React.useState('');
  const [columnThresholds, setColumnThresholds] = React.useState<ColumnThreshold[]>([]);

  const createColumn = async () => {
    const view = {
      type: VIEW_TYPES.column,
      name: columnName,
      data: {
        property: columnField,
        threshold: columnThresholds,
      },
    };
    await createViewMutation.mutateAsync(view);
    props.setTabIndex(0);
  };

  return (
    <>
      <TextField
        additionalInfo='This will be in header of your column'
        label={_.capitalize(t('common.name'))}
        placeholder={t('placeholders.columnName')}
        value={columnName}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setColumnName(evt.target.value)}
        width='300px'
        margin={'20px'}
      />
      <TextField
        additionalInfo='Specify the value field you want to be displayed in this column'
        label={_.capitalize(t('labels.property'))}
        placeholder={t('placeholders.columnField')}
        value={columnField}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setColumnField(evt.target.value)}
        width='300px'
        margin={'20px'}
      />
      <Alert
        fontSize='0.8em'
        h='30px'
        w='500px'
        status='info'
        m='0 20px 0'
      >
        <AlertIcon />
        Order of thresholds is important, first one that matches will be used.
      </Alert>
      <Flex m='0 0 0 20px' align='center'>
        <Select
          isOptional
          additionalInfo='Specify threshold for your value'
          label={_.capitalize(t('labels.comparison'))}
          options={COLUMN_THRESHOLDS}
          value={comparison}
          onChange={evt => setComparison(evt.target.value as keyof typeof COLUMN_THRESHOLDS_LABELS)}
          width='160px'
        />
        <NumberField
          isOptional
          additionalInfo='Set threshold for your value, only numbers'
          label={_.capitalize(t('labels.value'))}
          value={Number(value)}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setValue(Number(evt.target.value))}
          width='160px'
          margin={'10px'}
        />
        <Select
          isOptional
          isClearable
          styles={colorStyles}
          additionalInfo='Specify color for your value'
          label={_.capitalize(t('labels.color'))}
          options={COLOR_OPTIONS}
          value={color}
          onChange={evt => setColor(evt.target.value)}
          width='160px'
        />
      </Flex>
      <Flex h='190px' m='0 0 20px 0' direction='column'>
        <Flex>
          <Button
            content={_.capitalize(t('labels.add'))}
            width='100px'
            color='green'
            onClick={() => {
              setColumnThresholds([
                ...columnThresholds,
                {
                  comparison,
                  value,
                  color,
                }
              ]);
            }}
            height={'30px'}
            padding={'0 15px'}
            margin='0 10px 0 20px'
          />
          <Button
            content={_.capitalize(t('labels.reset'))}
            color='green'
            onClick={() => {
              setColumnThresholds([]);
            }}
            width='100px'
            height={'30px'}
            padding={'0 15px'}
            margin='0 10px 0'
          />
        </Flex>
        {
          <TableContainer h='190px' overflowY='scroll'>
            <Table variant='simple' >
              <Thead>
                <Tr>
                  <Th>Comparison</Th>
                  <Th>Value</Th>
                  <Th>Color</Th>
                </Tr>
              </Thead>
              <Tbody>
                {_.isEmpty(columnThresholds) && <Tr><Td><Text m='20px' fontSize='0.8em'>No columns added</Text></Td></Tr>}
                {!_.isEmpty(columnThresholds) && _.map(columnThresholds, columnThreshold => (
                  <Tr fontSize='0.8em' h='20px'>
                    <Td>{COLUMN_THRESHOLDS_LABELS[columnThreshold.comparison]}</Td>
                    <Td>{columnThreshold.value}</Td>
                    <Td color={columnThreshold.color}>{columnThreshold.color}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        }
      </Flex>
      <HorizontalLine />
      <Button
        content={_.capitalize(t('labels.create'))}
        color='green'
        onClick={createColumn}
        width={'120px'}
        height={'30px'}
        padding={'0 15px'}
        margin='10px'
      />
    </>
  );
};

export default NewColumn;
