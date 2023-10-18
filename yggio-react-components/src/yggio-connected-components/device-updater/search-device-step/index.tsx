/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useEffect} from 'react';
import _ from 'lodash';
import {useQuery} from '@tanstack/react-query';

// Logic
import {devicesRequests} from '../../../api';
import {PARAMETERS, PARAMETER_OPTIONS} from './constants';
import {Form, Device} from '../../../types';
import {selectMatchPattern} from './selectors';

// UI
import Spinner from '../../../components/spinner';
import SegmentControl from '../../../components/segmented-control';
import TextField from '../../../components/text-field';
import {
  SearchResultContainer,
  SearchResultItem,
  SearchResultItemTitle,
  SearchResultItemSubtitle,
  SearchResultCenterer,
} from './styled';
import {
  WizardStepContainer,
  WizardHeader,
  WizardContent,
  WizardFooter,
} from '../../../components/wizard';

interface SearchDeviceStepProps {
  stepForward: () => void;
  form: Form;
  device?: Device;
  setDevice: (device: Device | undefined) => void;
  setDeviceIsJoined: (isJoined: boolean | undefined) => void;
}

const SearchDeviceStep = (props: SearchDeviceStepProps) => {

  useEffect(() => {
    props.setDevice(undefined);
    props.setDeviceIsJoined(undefined);
  }, []);

  const matchPattern = selectMatchPattern(props.form);

  const params = {filter: {matchPattern}, limit: 25};

  const devicesQuery = useQuery(
    ['devices', params],
    async () => devicesRequests.fetch(params),
    {
      enabled: !!matchPattern,
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  const searchField = props.form.formInputs.searchField.value as PARAMETERS;

  return (
    <WizardStepContainer>
      <WizardHeader
        heading='Search device'
      />
      <WizardContent>
        <SegmentControl
          label='Search for device with:'
          options={PARAMETER_OPTIONS}
          value={searchField}
          onChange={value => {
            props.setDevice(undefined);
            props.form.setInputValue('searchField', value as string);
          }}
          margin='0 0 15px 0'
          height={'36px'}
          width='100%'
        />
        {searchField === PARAMETERS.name && (
          <TextField
            placeholder='Enter name'
            height={'40px'}
            value={props.form.formInputs.name.value as string}
            onChange={evt => {
              props.form.setInputValue(PARAMETERS.name, evt.target.value);
            }}
          />
        )}
        {searchField === PARAMETERS.devEui && (
          <TextField
            placeholder='Enter DevEUI'
            height={'40px'}
            value={props.form.formInputs.devEui.value as string}
            onChange={evt => {
              props.form.setInputValue(PARAMETERS.devEui, evt.target.value);
            }}
          />
        )}
        {searchField === PARAMETERS.secret && (
          <TextField
            placeholder='Enter secret'
            height={'40px'}
            value={props.form.formInputs.secret.value as string}
            onChange={evt => {
              props.form.setInputValue(PARAMETERS.secret, evt.target.value);
            }}
          />
        )}
        {searchField === PARAMETERS.mac && (
          <TextField
            placeholder='Enter MAC address'
            height={'40px'}
            value={props.form.formInputs.mac.value as string}
            onChange={evt => {
              props.form.setInputValue(PARAMETERS.mac, evt.target.value);
            }}
          />
        )}
        {searchField === PARAMETERS.imei && (
          <TextField
            placeholder='Enter IMEI'
            height={'40px'}
            value={props.form.formInputs.imei.value as string}
            onChange={evt => {
              props.form.setInputValue(PARAMETERS.imei, evt.target.value);
            }}
          />
        )}

        <SearchResultContainer>
          {devicesQuery.isFetching && (
            <SearchResultCenterer>
              <Spinner color={'#555'} />
            </SearchResultCenterer>
          )}
          {devicesQuery.isSuccess && _.isEmpty(devicesQuery.data) && (
            <SearchResultCenterer>
              No device found
            </SearchResultCenterer>
          )}
          {_.map(devicesQuery.data, device => {
            const isActive = props.device?._id === device._id;
            const subtitle = searchField !== 'name' ? device[searchField] : null;
            return (
              <SearchResultItem
                onClick={() => {
                  if (isActive) {
                    props.setDevice(undefined);
                  } else {
                    props.setDevice(device);
                  }
                }}
                active={isActive}
                key={device._id}
                isLarge={!!subtitle}
              >
                <div>
                  <SearchResultItemTitle active={isActive}>
                    {device.name}
                  </SearchResultItemTitle>
                  {!!subtitle && (
                    <SearchResultItemSubtitle active={isActive}>
                      {searchField}: {subtitle}
                    </SearchResultItemSubtitle>
                  )}
                </div>
              </SearchResultItem>
            );
          })}
        </SearchResultContainer>
      </WizardContent>

      <WizardFooter
        onContinue={props.stepForward}
        hideBackButton
        disableContinueButton={!props.device}
      />
    </WizardStepContainer>
  );
};

export default SearchDeviceStep;
