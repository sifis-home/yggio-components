/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {
  FaCopy as CopyIcon,
} from 'react-icons/fa';
import _ from 'lodash';
import {
  Alert,
  Spinner,
  AlertIcon,
  Stack,
  Flex,
  Text,
  Center,
  Code,
  Badge,
  Checkbox,
} from '@chakra-ui/react';
import {useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import toast from 'react-hot-toast';

import {viewUpdateSchema} from '../../../schemas';
import Select from '../../../components/select';
import {COLORS, VIEW_TYPES} from '../../../constants';
import Button from '../../../components/button';
import {viewApi, organizationsApi} from '../../../api';
import RadioButton from '../../../components/radio-button';
import {selectAvailableViews, selectOrgs} from '../selectors';

import type {ViewColumn, ViewDeviceList} from '../../../types';

const ExportView = () => {
  const {t} = useTranslation();
  const queryClient = useQueryClient();
  const [selectedView, setSelectedView] = React.useState('');
  const [selectedOrg, setSelectedOrg] = React.useState('');
  const [exportType, setExportType] = React.useState('string');
  const [exportString, setExportString] = React.useState('');
  const [includeCustomColumns, setIncludeCustomColumns] = React.useState(true);

  const organizationsQuery = organizationsApi.useOrganizationsQuery();
  const viewsQuery = viewApi.useViewsQuery<ViewDeviceList[]>({type: VIEW_TYPES.deviceList});
  const viewColumnsQuery = viewApi.useViewsQuery<ViewColumn[]>({type: VIEW_TYPES.column});
  const viewsQueries = viewApi.useViewsQueries({
    type: VIEW_TYPES.deviceList,
    orgIds: organizationsQuery.data?.map(org => org._id),
  });
  const flattenedViewsData = _.compact(_.flatMap(viewsQueries, 'data'));
  const mergedViewsData = _.concat(viewsQuery.data, flattenedViewsData) as ViewDeviceList[];
  const viewsData = _.uniqBy(mergedViewsData, '_id');
  const updateViewMutation = viewApi.useUpdateViewMutation(queryClient);

  const handleExportString = () => {
    if (!selectedView) {
      return toast.error(t('phrases.pleaseSelectView'));
    }
    const viewData = _.find(viewsData, {_id: selectedView});
    const columns = _.filter(viewColumnsQuery.data, column => (
      _.includes(viewData?.data?.columns, column.name)
    ));
    const columnNames = _.map(columns, 'name');
    const view = includeCustomColumns
      ? {...viewData, customColumns: columns}
      : {...viewData, data: {...viewData?.data, columns: _.difference(viewData?.data?.columns, columnNames)}};
    const encoded = btoa(JSON.stringify(view));
    setExportString(encoded);
  };

  const handleExportViewToOrganization = async () => {
    if (!selectedView) {
      return toast.error(t('phrases.pleaseSelectView'));
    }
    if (!selectedOrg) {
      return toast.error(t('phrases.pleaseSelectOrg'));
    }
    const view = _.find(viewsQuery.data, {_id: selectedView});
    const cleanView = _.omit(view, ['_id', 'ownerId']);
    const orgId = selectedOrg;
    const validatedData = viewUpdateSchema.parse({...cleanView, orgId});
    await updateViewMutation.mutateAsync({
      _id: selectedView,
      data: {...validatedData, orgId},
      type: VIEW_TYPES.deviceList,
    });
    if (includeCustomColumns) {
      const columnUpdates = _.map(viewColumnsQuery.data, async column => (
        await updateViewMutation.mutateAsync({
          _id: column._id,
          data: _.omit({...column, orgId}, ['_id', 'ownerId']),
          type: VIEW_TYPES.column,
        })
      ));
      await Promise.all(columnUpdates);
    }
  };

  const handleCopyString = () => {
    if (window.isSecureContext) {
      return void navigator.clipboard.writeText(exportString);
    }
    toast.error(`
      Your browser does not support clipboard access or 
      is not running in a secure context (e.g HTTPS).
    `);
  };

  const availableViews = selectAvailableViews({views: viewsData});
  const availableOrgs = selectOrgs({orgs: organizationsQuery.data});

  return (
    <>
      <Text fontSize='0.8em' m='20px 0 20px'>
        {t('phrases.selectViewToExport')}
      </Text>
      <Select
        isClearable
        name={'view'}
        onChange={evt => setSelectedView(evt.target.value)}
        value={selectedView}
        options={availableViews}
        placeholder={t('placeholders.viewPresets')}
        width={'350px'}
        height={'40px'}
        margin='0 0 20px'
      />
      <Stack m='0 0 10px'>
        <Checkbox
          title='Include custom columns in the export'
          isChecked={includeCustomColumns}
          onChange={evt => setIncludeCustomColumns(evt.target.checked)}
          m='5px'
          colorScheme='green'
        >
          <Text fontSize='0.8em'>Include custom columns</Text>
        </Checkbox>
        <Text fontSize='0.8em'>
          {t('phrases.selectExportType')}
        </Text>
        <Flex>
          <RadioButton
            margin='5px'
            title={_.capitalize(t('titles.string'))}
            isSelected={exportType === 'string'}
            onClick={() => setExportType('string')}
          />
          <Text>{_.capitalize(t('titles.string'))}</Text>
          <RadioButton
            margin='5px 5px 5px 15px'
            title={_.capitalize(t('titles.organization'))}
            isSelected={exportType === 'organization'}
            onClick={() => setExportType('organization')}
          />
          <Text>{_.capitalize(t('titles.organization'))}</Text>
        </Flex>
      </Stack>
      <Flex direction='column'>
        {exportType === 'string' && (
          <>
            <Button
              color='green'
              content={t('labels.exportAsString')}
              height='30px'
              width='150px'
              margin='10px 5px'
              onClick={handleExportString}
            />
            {exportString && (
              <Flex m='10px' direction='column'>
                <Text
                  fontSize='0.8em'
                  fontWeight='700'
                  m='0 0 10px'
                >
                  {t('phrases.copyImportString')}
                </Text>
                <Code
                  position='relative'
                  fontSize='0.8em'
                  h='100px'
                  overflowX='scroll'
                >
                  <Center
                    bg={COLORS.greyLight}
                    w='25px'
                    h='25px'
                    m='5px'
                    cursor='pointer'
                    position='absolute'
                    right='0'
                    top='0'
                    color={COLORS.greyDarkAlt}
                    _hover={{color: COLORS.black}}
                    onClick={handleCopyString}
                  >
                    <CopyIcon size={20} />
                  </Center>
                  {exportString}
                </Code>
              </Flex>
            )}
          </>
        )}
        {exportType === 'organization' && (
          <>
            <Alert status='info' fontSize='0.7em'>
              <AlertIcon boxSize='16px' />
              {t('phrases.onlyOneExportATime')}
            </Alert>
            <Text fontSize='0.8em' m='10px 0 10px'>
              {t('phrases.selectOrganizationToExport')}
            </Text>
            <Select
              isClearable
              name={'organization'}
              onChange={evt => setSelectedOrg(evt.target.value)}
              value={selectedOrg}
              options={availableOrgs}
              placeholder={t('placeholders.selectOrganization')}
              width={'350px'}
            />
            <Button
              color='green'
              content={t('labels.exportToOrganization')}
              height='30px'
              width='180px'
              margin='10px 5px'
              onClick={handleExportViewToOrganization}
            />
            {updateViewMutation.isLoading && (
              <Spinner size='sm' />
            )}
            <Badge whiteSpace='normal' colorScheme='green'>
              {updateViewMutation.isSuccess && (
                t('phrases.successfullyExportedViewToOrganization')
              )}
            </Badge>
          </>
        )}
      </Flex>
    </>
  );
};

export default ExportView;
