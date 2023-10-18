/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState} from 'react';
import {Switch} from '@chakra-ui/react';
import {FlexWrapper} from '../../../../global/styled';


import {
  Heading,
  SubHeading,
  ContentContainer,
  NavButtonsContainer,
} from '../../styled';
import {StyledContainerBox} from '../../sub-components';
import TextField from '../../../../components/text-field';
import Select from '../../../../components/select';
import Button from '../../../../components/button';
import {Form} from '../../../../types';
import {onInputChange} from '../events';
import {onContinue} from './events';
import {getValidationErrorMessage} from '../../../../utils/form-wizard';


interface WirelessMBusPaneProps {
  incrementCurrentStep: () => void;
  onBack: () => void;
  form: Form;
}

const WirelessMBusPane = (props: WirelessMBusPaneProps) => {
  const [isUsingEncryption, setIsUsingEncryption] = useState(false);
  return (
    <StyledContainerBox>
      <Heading>Wireless M-bus information</Heading>
      <SubHeading>Please enter Wireless M-bus specific information</SubHeading>
      <ContentContainer>
        <Select
          label={'Manufacturer'}
          options={[
            {value: 'ESY', label: 'Easymeter (ESY)'},
            {value: 'BMT', label: 'B Meters (BMT)'},
            {value: 'KAM', label: 'Kamstrup (KAM)'},
          ]}
          value={props.form.formInputs.manufacturer.value as string}
          fullHeight
          name={'manufacturer'}
          margin={'0 0 15px 0'}
          onChange={evt => onInputChange(props.form, evt)}
        />
        <TextField
          label={'Device Id'}
          name={'wMbusDeviceId'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.wMbusDeviceId.value as string}
          margin={'0 0 25px 0'}
          validationErrorMessage=
            {getValidationErrorMessage(props.form.formInputs.wMbusDeviceId)}
          maxLength={8}
        />
        <FlexWrapper>
          <Switch
            marginRight={2}
            isChecked={isUsingEncryption}
            onChange={() => setIsUsingEncryption(!isUsingEncryption)}
          />
          <p>Uses encryption</p>
        </FlexWrapper>
        {isUsingEncryption && (
          <TextField
            label={'Encryption key'}
            name={'encryptionKey'}
            onChange={evt => onInputChange(props.form, evt)}
            value={props.form.formInputs.encryptionKey.value as string}
            margin={'20px 0 25px 0'}
            validationErrorMessage=
              {getValidationErrorMessage(props.form.formInputs.encryptionKey)}
            maxLength={32}
          />
        )}

      </ContentContainer>
      <NavButtonsContainer>
        <Button
          content={'Back'}
          ghosted
          onClick={props.onBack}
          margin={'20px 0 0 0'}
        />
        <Button
          color={'green'}
          content={'Continue'}
          onClick={() => (
            onContinue(
              props.form.formInputs,
              props.form.showAllInputValidations,
              props.incrementCurrentStep,
            )
          )}
          margin={'20px 0 0 0'}
        />
      </NavButtonsContainer>


    </StyledContainerBox>

  );
};

export default WirelessMBusPane;
