/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {UseMutationResult} from '@tanstack/react-query';

import Button from '../../../components/button';
import InfoBox from '../../../components/info-box';
import Spinner from '../../../components/spinner';
import {RecHeading, ProvisionLoadingWrapper} from '../styled';
import {HorizontalLine} from '../../../global/styled';

interface Props {
  isProvisioned: boolean;
  provisionRecDeviceMutation: UseMutationResult<unknown, unknown, void, unknown>;
  deviceRecDataQueryIsLoading: boolean;
}

const ProvisioningSection = (props: Props) => {
  return (
    <>
      {/* @ts-ignore - component not typescripted yet */}
      <HorizontalLine margin={'25px 0'} />
      <RecHeading>Provisioning</RecHeading>
      {props.deviceRecDataQueryIsLoading && (
        <ProvisionLoadingWrapper>
          <Spinner size={18} color={'#333'} />
          <p>Checking if device is provisioned...</p>
        </ProvisionLoadingWrapper>
      )}
      {!props.deviceRecDataQueryIsLoading && !props.isProvisioned && (
        <Button
          label={'Provision device'}
          width={'130px'}
          color={'green'}
          isLoading={props.provisionRecDeviceMutation.isLoading}
          disabled={
            props.provisionRecDeviceMutation.isLoading || props.provisionRecDeviceMutation.isSuccess
          }
          onClick={() => props.provisionRecDeviceMutation.mutate()}
        />
      )}
      {!props.deviceRecDataQueryIsLoading && props.isProvisioned && (
        <InfoBox
          heading='Device is provisioned'
          type={'success'}
          margin={'0 0 20px 0'}
        />
      )}
    </>
  );
};

export default ProvisioningSection;
