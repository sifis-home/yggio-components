/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {NextRouter} from 'next/router';

import {DEVICE_TYPES} from '../constants';
import {onInputChange} from '../events';
import {Form} from '../../../../types';

import Select from '../../../../components/select';
import Button from '../../../../components/button';
import {
  Heading,
  SubHeading,
  ContentContainer,
  NavButtonsContainer,
} from '../../styled';
import {StyledContainerBox} from '../../sub-components';

interface DeviceTypeSelectionPaneProps {
  router: NextRouter;
  incrementCurrentStep: () => void;
  form: Form,
}

const DeviceTypeSelectionPane = (props: DeviceTypeSelectionPaneProps) => {
  return (
    <StyledContainerBox>
      <Heading>Select device type</Heading>
      <SubHeading>Please select the type of device you want to install</SubHeading>
      <ContentContainer>
        <Select
          options={[
            {value: DEVICE_TYPES.generic, label: 'Generic'},
            {value: DEVICE_TYPES.lora, label: 'LoRa'},
          ]}
          name={'deviceType'}
          placeholder={'Select device type...'}
          value={props.form.formInputs.deviceType.value as string}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => onInputChange(props.form, evt)}
        />
      </ContentContainer>
      <NavButtonsContainer>
        <Button
          content={'Back'}
          ghosted
          onClick={async () => props.router.push('/devices/new')}
        />
        <Button
          color={'green'}
          content={'Continue'}
          onClick={props.incrementCurrentStep}
          disabled={!props.form.formInputs.deviceType.value}
        />
      </NavButtonsContainer>
    </StyledContainerBox>
  );
};

export default DeviceTypeSelectionPane;
