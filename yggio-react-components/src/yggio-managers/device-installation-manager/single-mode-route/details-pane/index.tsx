/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';

import {getValidationErrorMessage, isFormValid} from '../../../../utils/form-wizard';
import {
  useFetchLocationsQuery,
  useFetchDeviceModelNamesQuery,
  useCreateDeviceMutation,
} from './queries';
import {selectDeviceModelNameOptions} from './selectors';
import {onInputChange, onInputBlur} from '../events';
import {Forms, UpdateLocationMutation} from '../types';

import TextField from '../../../../components/text-field';
import TextArea from '../../../../components/text-area';
import Select from '../../../../components/select';
import LocationSelector from '../../../../yggio-connected-components/location-selector';
import Button from '../../../../components/button';
import InfoBox from '../../../../components/info-box';
import InputDecorator from '../../../../components/input-decorator';
import ContextualParametersEditor from '../../../../yggio-components/contexutal-parameters-editor';
import {
  Heading,
  SubHeading,
  ContentContainer,
  NavButtonsContainer,
} from '../../styled';
import {StyledContainerBox} from '../../sub-components';
import {HeadingContainer} from './styled';

interface DetailsPaneProps {
  forms: Forms;
  onBack: () => void;
  incrementCurrentStep: () => void;
  updateLocationMutation: UpdateLocationMutation;
}

const ADDITIONAL_INFO = 'Contextual parameters are user-defined data that let you save any information you want to the device.';

const DetailsPane = (props: DetailsPaneProps) => {

  const fetchLocationsResult = useFetchLocationsQuery();

  const fetchDeviceModelNamesResult = useFetchDeviceModelNamesQuery();
  const deviceModelNamesOptions = selectDeviceModelNameOptions(fetchDeviceModelNamesResult.data);

  const createDeviceMutation = useCreateDeviceMutation(
    props.incrementCurrentStep,
    props.updateLocationMutation,
  );

  return (
    <StyledContainerBox>
      <HeadingContainer>
        <div>
          <Heading>Device details</Heading>
          <SubHeading>Please enter device details information</SubHeading>
        </div>
      </HeadingContainer>
      <ContentContainer padding={'40px 0 55px 0'}>
        <TextField
          label={'Name'}
          name={'name'}
          isRequired
          value={props.forms.details.formInputs.name.value as string}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => (
            onInputChange(props.forms.details, evt)
          )}
          onBlur={(evt: React.ChangeEvent<HTMLInputElement>) => (
            onInputBlur(props.forms.details, evt)
          )}
          validationErrorMessage={getValidationErrorMessage(props.forms.details.formInputs.name)}
          fullHeight
          margin={'0 0 10px 0'}
        />
        <TextArea
          label={'Description'}
          name={'description'}
          value={props.forms.details.formInputs.description.value as string}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => (
            onInputChange(props.forms.details, evt)
          )}
          onBlur={(evt: React.ChangeEvent<HTMLInputElement>) => (
            onInputBlur(props.forms.details, evt)
          )}
          validationErrorMessage={getValidationErrorMessage(
            props.forms.details.formInputs.description
          )}
          fullHeight
          margin={'0 0 10px 0'}
        />
        <Select
          label={'Model name'}
          name={'deviceModelName'}
          placeholder={'Select model name...'}
          additionalInfo={'Specify the model name of the device in order to get translated data'}
          options={deviceModelNamesOptions}
          value={props.forms.details.formInputs.deviceModelName.value as string}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => (
            onInputChange(props.forms.details, evt)
          )}
          margin={'0 0 30px 0'}
          isClearable
          isSearchable
        />
        <LocationSelector
          locations={fetchLocationsResult.data}
          selectedLocation={props.forms.details.formInputs.location.value as string}
          selectedBlueprint={props.forms.details.formInputs.blueprint.value as string}
          onChange={(selectedLocation?: string, selectedBlueprint?: string) => {
            props.forms.details.setInputValue('location', selectedLocation || '');
            props.forms.details.setInputValue('blueprint', selectedBlueprint || '');
          }}
        />
        {createDeviceMutation.isError && (
          <InfoBox
            type={'error'}
            heading={'Error: Could not add device'}
            content={
              `${_.get(createDeviceMutation, 'error.message')}
              : ${_.get(createDeviceMutation, 'error.response.data')}`
            }
            margin={'30px 0 0 0'}
          />
        )}
        <InputDecorator
          label={'Contextual parameters'}
          additionalInfo={ADDITIONAL_INFO}
          margin={'25px 0 3px 0'}
        />
        <ContextualParametersEditor
          onChange={(parameters: {name: string, value: string}[]) => {
            const parametersObject = _.chain(parameters)
              .keyBy('name')
              .mapValues('value')
              .value();
            props.forms.details.setInputValue('contextMap', parametersObject);
          }}
          value={_.map(
            props.forms.details.formInputs.contextMap.value as object,
            (value, name) => ({name, value})
          )}
        />
      </ContentContainer>
      <NavButtonsContainer>
        <Button
          content={'Back'}
          ghosted
          onClick={props.onBack}
        />
        <Button
          color={'green'}
          isLoading={createDeviceMutation.isLoading || props.updateLocationMutation.isLoading}
          disabled={createDeviceMutation.isLoading || props.updateLocationMutation.isLoading}
          content={'Add device'}
          onClick={() => {
            props.forms.details.showAllInputValidations();
            if (isFormValid(props.forms.details.formInputs)) {
              createDeviceMutation.mutate({
                forms: props.forms,
                locations: fetchLocationsResult.data,
              });
            }
          }}
          width={'130px'}
        />
      </NavButtonsContainer>
    </StyledContainerBox>
  );
};

export default DetailsPane;
