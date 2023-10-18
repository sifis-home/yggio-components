/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {
  MdCheckCircle as CheckIcon,
  MdDelete as DeleteIcon,
} from 'react-icons/md';
import _ from 'lodash';
import {
  Alert,
  Spinner,
  Button as ChakraButton,
  AlertIcon,
  Flex,
  Text,
  Center,
  Badge,
} from '@chakra-ui/react';
import {useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import toast from 'react-hot-toast';
import {FILTER_FIELDS} from '../constants';
import Select from '../../../components/select';
import {COLORS, ALLOWED_DATA_KEYS, VIEW_TYPES} from '../../../constants';
import {viewApi, organizationsApi} from '../../../api';
import {getListStateSetters} from '../utils';
import {selectAvailableViews} from '../selectors';

import type {ListStateProps} from '../types';
import type {Form, InputValue, ViewDeviceList} from '../../../types';

interface ViewsPresetsProps {
  listState: ListStateProps;
  filterState: Form;
  onClose: () => void;
}

const ViewsPresets = (props: ViewsPresetsProps) => {
  const {t} = useTranslation();
  const queryClient = useQueryClient();
  const [selectedView, setSelectedView] = React.useState('');

  const organizationsQuery = organizationsApi.useOrganizationsQuery();
  const viewsQuery = viewApi.useViewsQuery<ViewDeviceList[]>({type: VIEW_TYPES.deviceList});
  const viewsQueries = viewApi.useViewsQueries<ViewDeviceList[]>({
    type: VIEW_TYPES.deviceList,
    orgIds: organizationsQuery.data?.map(org => org._id),
  });
  const flattenedViewsData = _.compact(_.flatMap(viewsQueries, 'data'));
  const mergedViewsData = _.concat<ViewDeviceList>(viewsQuery.data!, flattenedViewsData);
  const viewsData = _.uniqBy(mergedViewsData, '_id');
  const viewDeletionMutation = viewApi.useViewDeletionMutation(queryClient);

  const setView = () => {
    if (!selectedView) {
      return toast.error(t('phrases.pleaseSelectView'));
    }
    const view = _.find(viewsData, {_id: selectedView}) as ViewDeviceList; // LoDash overload fails;

    if (view?.data) {
      props.listState.reset();
      const allowedDataKeys = _.intersection(ALLOWED_DATA_KEYS, _.keys(view.data));
      const validatedData = _.pick(view.data, allowedDataKeys);

      if (validatedData.filterCollapsed) {
        _.each(validatedData.filterCollapsed as Record<string, boolean>, (value, key) => {
          props.listState.setFilterCollapsed(key);
        });
      }

      const setters = getListStateSetters(props.listState);
      _.each(setters, (setter, key) => {
        const setterKey = key as keyof typeof setters; // LoDash sets key to string which is wrong
        const setterFn = setter as (arg: unknown) => void; // FIXME: TS narrowing setter to never
        if (validatedData[setterKey]) {
          const arg = validatedData[setterKey];
          setterFn(arg);
        }
      });

      _.each(FILTER_FIELDS, field => {
        if (validatedData[field]) {
          props.filterState.setInputValue(field, validatedData[field]! as InputValue);
        }
      });

      props.onClose();
      return setSelectedView('');
    }
    toast.error(t('phrases.viewNotFound'));
  };

  const deleteView = async () => {
    if (!selectedView) {
      return toast.error(t('phrases.pleaseSelectView'));
    }
    await viewDeletionMutation.mutateAsync({_id: selectedView})
      .catch((err: Error) => toast.error(`${t('phrases.errorDeletingView')}: ${err.message}`));
    setSelectedView('');
  };

  const availableViews = selectAvailableViews({views: viewsData});

  return (
    <Center
      h='200px'
    >
      <Flex direction='column'>
        <Alert status='info' fontSize='0.7em'>
          <AlertIcon boxSize='16px' />
          {t('phrases.applyingView')}
        </Alert>
        <Text m='10px 0 10px' fontSize='0.8em'>
          {t('phrases.selectViewToApply')}
        </Text>
        <Flex>
          <Select
            isClearable
            name={'view'}
            onChange={evt => setSelectedView(evt.target.value)}
            value={selectedView}
            options={availableViews}
            placeholder={t('placeholders.viewPresets')}
            width={'240px'}
            height={'40px'}
          />
          <ChakraButton
            title={t('titles.applyViewPreset')}
            onClick={setView}
            bg='transparent'
            color={COLORS.green}
            m='2px'
            p='0'
            w='30px'
            minW='30px'
            _hover={{color: COLORS.greenLight}}
          >
            <CheckIcon size={24} />
          </ChakraButton>
          <ChakraButton
            title={t('titles.deleteViewPreset')}
            onClick={deleteView}
            bg='transparent'
            color={COLORS.redDark}
            m='2px'
            p='0'
            w='30px'
            minW='30px'
            _hover={{color: COLORS.red}}
          >
            <DeleteIcon size={24} />
          </ChakraButton>
        </Flex>
        {viewDeletionMutation.isLoading && (
          <Spinner size='sm' />
        )}
        <Badge colorScheme='green'>
          {viewDeletionMutation.isSuccess && (
            t('phrases.successfullyRemovedViewPreset')
          )}
        </Badge>
      </Flex>
    </Center>
  );
};

export default ViewsPresets;
