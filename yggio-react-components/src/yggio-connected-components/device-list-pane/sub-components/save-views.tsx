import React from 'react';
import _ from 'lodash';
import {
  Badge,
  Spinner,
  Flex,
  Text,
} from '@chakra-ui/react';
import {useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';

import {getFormValues, getValidationErrorMessage} from '../../../utils/form-wizard';
import {viewCreationSchema} from '../../../schemas';
import Button from '../../../components/button';
import {ALLOWED_DATA_KEYS} from '../../../constants';
import TextField from '../../../components/text-field';
import {viewApi} from '../../../api';
import {FormInputs} from '../../../types';
import {useLocalState} from '../../../hooks';
import viewsState from '../state/views';

interface SaveViewsProps {
  onClose: () => void;
  filterState: {
    formInputs: FormInputs;
  };
  listState: object;
}

const SaveViews = (props: SaveViewsProps) => {
  const {t} = useTranslation();
  const queryClient = useQueryClient();
  const createViewMutation = viewApi.useCreateViewMutation(queryClient);
  const viewsForm = useLocalState(viewsState);

  const handleViewCreation = async () => {
    const {listState, filterState} = props;
    const filterFormValues = getFormValues(filterState.formInputs);
    const data = _.merge({}, listState, filterFormValues);
    const pickedData = _.pick(
      data,
      ALLOWED_DATA_KEYS,
    );
    const creationData = {
      name: viewsForm.formInputs.name.value,
      data: pickedData,
      type: 'deviceList',
    };
    const result = viewCreationSchema.safeParse(creationData);
    if (!result.success) {
      return viewsForm.showAllInputValidations();
    }
    await createViewMutation.mutateAsync(result.data);
  };

  return (
    <Flex
      h='280px'
      direction='column'
    >
      <Flex
        p='25px'
        direction='column'
      >
        <Text fontSize='0.8em' m='0 0 20px'>
          {t('phrases.saveViewsText')}
        </Text>
        <TextField
          maxLength={50}
          placeholder={t('placeholders.newViewsName')}
          width='300px'
          value={viewsForm.formInputs.name.value as string}
          name='name'
          isRequired
          onChange={evt => viewsForm.setInputValue('name', evt.target.value)}
          validationErrorMessage={getValidationErrorMessage(viewsForm.formInputs.name)}
        />
        <Button
          color='green'
          content='Save'
          height='30px'
          width='120px'
          margin='10px 0'
          onClick={handleViewCreation}
        />
        {createViewMutation.isLoading && (
          <Spinner size='sm' />
        )}
        <Badge colorScheme='green'>
          {createViewMutation.isSuccess && (
            t('phrases.successfullySavedViewPreset')
          )}
        </Badge>
      </Flex>
    </Flex>
  );
};

export default SaveViews;
