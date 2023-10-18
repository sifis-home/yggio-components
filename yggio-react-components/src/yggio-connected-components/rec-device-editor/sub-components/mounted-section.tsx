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
import Spinner from '../../../components/spinner';
import InfoBox from '../../../components/info-box';
import {HorizontalLine, FlexWrapper} from '../../../global/styled';
import {
  RecHeading,
  RecItem,
  RecItemTitle,
  RecItemText,
} from '../styled';

interface Props {
  mountedData: {
    roomName: string;
    storeyName: string;
    buildingName: string;
    realEstateName: string;
  };
  dismountRecDeviceMutation: UseMutationResult<unknown, unknown, void, unknown>;
  mountQueriesAreLoading: boolean;
  mountQueriesDidFail: boolean;
}

const MountedSection = (props: Props) => {
  return (
    <>
      {/* @ts-ignore - component not typescripted yet */}
      <HorizontalLine margin={'25px 0'} />
      {props.mountQueriesDidFail && (
        <InfoBox heading='Failed to fetch mount data' type={'error'} />
      )}
      {!props.mountQueriesDidFail && props.mountQueriesAreLoading && (
        <FlexWrapper>
          <Spinner size={18} color={'#555'} margin={'0 8px 0 0'} />
          <p>Fetching mount data...</p>
        </FlexWrapper>
      )}
      {!props.mountQueriesDidFail && !props.mountQueriesAreLoading && (
        <MountedSectionContent {...props} />
      )}
    </>
  );
};

const MountedSectionContent = (props: Props) => {
  return (
    <>
      <RecHeading>Device is mounted in:</RecHeading>

      <RecItem>
        <RecItemTitle>Real estate:</RecItemTitle>
        <RecItemText>{props.mountedData.realEstateName}</RecItemText>
      </RecItem>

      <RecItem>
        <RecItemTitle>Building:</RecItemTitle>
        <RecItemText>{props.mountedData.buildingName}</RecItemText>
      </RecItem>

      <RecItem>
        <RecItemTitle>Storey:</RecItemTitle>
        <RecItemText>{props.mountedData.storeyName}</RecItemText>
      </RecItem>

      <RecItem>
        <RecItemTitle>Room:</RecItemTitle>
        <RecItemText>{props.mountedData.roomName}</RecItemText>
      </RecItem>

      <Button
        label={'Dismount device'}
        width={'130px'}
        color={'grey'}
        onClick={() => props.dismountRecDeviceMutation.mutate()}
        isLoading={props.dismountRecDeviceMutation.isLoading}
        disabled={props.dismountRecDeviceMutation.isLoading}
        margin={'20px 0 0 0'}
      />
    </>
  );

};

export default MountedSection;
