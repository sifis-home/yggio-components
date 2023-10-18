/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {toast} from 'react-hot-toast';
import {
  Text,
  Badge,
  Spinner,
} from '@chakra-ui/react';
import {useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {viewCreationSchema} from '../../../schemas';
import Button from '../../../components/button';
import {viewApi} from '../../../api';
import TextField from '../../../components/text-field';
import {VIEW_TYPES} from '../../../constants';

import type {View} from '../../../types';

type CustomImportView = Omit<View, 'ownerId' | '_id' | 'orgId'> & {customColumns?: View[]};

const ImportView = () => {
  const {t} = useTranslation();
  const queryClient = useQueryClient();
  const [importString, setImportString] = React.useState('');

  const createViewMutation = viewApi.useCreateViewMutation(queryClient);

  const handleImportString = async () => {
    let decoded;
    try {
      decoded = JSON.parse(atob(importString)) as CustomImportView;
    } catch (err) {
      toast.error(t('phrases.invalidImportString'));
    }
    if (decoded) {
      const {customColumns, ...rest} = decoded;
      const view = _.omit(rest, ['ownerId', '_id', 'orgId']);

      const validatedData = viewCreationSchema.parse(view);
      await createViewMutation.mutateAsync({...validatedData, type: VIEW_TYPES.deviceList});
      if (customColumns) {
        const columnCreations = customColumns.map(async column => (
          await createViewMutation.mutateAsync({
            ..._.omit(column, ['_id', 'orgId', 'ownerId']),
            type: VIEW_TYPES.column,
          })
        ));
        await Promise.all(columnCreations);
      }
    }
  };

  return (
    <>
      <Text fontSize='0.8em' m='20px 0 20px'>
        {t('phrases.pasteAString')}
      </Text>
      <TextField
        placeholder={t('placeholders.pasteStringHere')}
        width='250px'
        height='40px'
        value={importString}
        onChange={evt => setImportString(evt.target.value)}
      />
      <Button
        color='green'
        content={t('labels.import')}
        height='30px'
        width='140px'
        margin='10px 5px'
        onClick={handleImportString}
      />
      {createViewMutation.isLoading && (
        <Spinner size='sm' />
      )}
      <Badge colorScheme='green'>
        {createViewMutation.isSuccess && (
          'Successfully imported view'
        )}
      </Badge>
    </>
  );
};

export default ImportView;
