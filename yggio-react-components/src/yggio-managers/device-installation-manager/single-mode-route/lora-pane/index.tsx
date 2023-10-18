/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';

import {selectActiveLoraInputs} from '../selectors';
import {selectConnectorOptions} from './selectors';
import {onContinue} from './events';
import {
  useFetchConnectorDevicesQuery,
  useFetchPriceModelsQuery,
  useFetchConnectivityPlansQuery,
} from './queries';
import {Form} from '../../../../types';
import {ConnectorInputValue} from '../types';

import {
  Heading,
  SubHeading,
  ContentContainer,
  NavButtonsContainer,
} from '../../styled';
import Button from '../../../../components/button';
import {StyledContainerBox} from '../../sub-components';
import {Inputs} from './sub-components';

interface LoraPaneProps {
  onBack: () => void,
  incrementCurrentStep: () => void,
  form: Form;
}

const LoraPane = (props: LoraPaneProps) => {

  const fetchConnectorDevicesResult = useFetchConnectorDevicesQuery();
  const fetchPriceModelsResult = useFetchPriceModelsQuery(
    props.form.formInputs.connector.value as ConnectorInputValue
  );
  const fetchConnectivityPlansResult = useFetchConnectivityPlansQuery(
    props.form.formInputs.connector.value as ConnectorInputValue
  );

  const connectorOptions = selectConnectorOptions(fetchConnectorDevicesResult);
  const activeLoraInputs = selectActiveLoraInputs(props.form.formInputs);

  return (
    <StyledContainerBox>
      <Heading>LoRa info</Heading>
      <SubHeading>Please enter LoRa specific information</SubHeading>
      <ContentContainer>
        <Inputs
          form={props.form}
          connectorOptions={connectorOptions}
          activeLoraInputs={activeLoraInputs}
          fetchPriceModelsResult={fetchPriceModelsResult}
          fetchConnectivityPlansResult={fetchConnectivityPlansResult}
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
          content={'Continue'}
          onClick={() => (
            onContinue(
              props.form.formInputs,
              activeLoraInputs,
              props.incrementCurrentStep,
              props.form.showAllInputValidations,
            )
          )}
        />
      </NavButtonsContainer>
    </StyledContainerBox>
  );
};

export default LoraPane;
