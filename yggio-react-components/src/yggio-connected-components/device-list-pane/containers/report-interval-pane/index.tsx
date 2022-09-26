/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {useQueryClient} from '@tanstack/react-query';
import React from 'react';
import _ from 'lodash';
import {FlexColWrapper, FlexWrapper, TextParagraph, HorizontalLine, FlexSpaceBetweenWrapper} from '../../../../global/styled';
import {Devices} from '../../../../types';
import NumberField from '../../../../components/number-field';
import {useLocalState} from '../../../../hooks';
import {devicesApi} from '../../../../api';
import Button from '../../../../components/button';
import ContainerBox from '../../../../components/container-box';
import {reportIntervalData} from './state';
import {CenteredPage} from '../../../../global/components';
import InfoBox from '../../../../components/info-box';

interface ReportIntervalProps {
  selectedDevices: string[];
  devices: Devices;
  t: (key: string) => string;
  setSelectedDevices: (devices: string[]) => void;
  setSelectMode: (selectMode: boolean) => void;
  setPage: (page: string) => void;
}

const ReportInterval = (props: ReportIntervalProps) => {
  /*
    Hooks
  */
  const queryClient = useQueryClient();
  const reportIntervalForm = useLocalState(reportIntervalData);

  const {
    mutateAsync: mutateDevice,
    isLoading: isUpdatingDevice,
  } = devicesApi.useUpdateDevice(queryClient);

  /*
    Event handlers
  */
  const handleExpectedReportInterval = async () => {
    const {formInputs} = reportIntervalForm;
    const seconds = _.get(formInputs, 'seconds.value', 0) as number;
    const minutes = _.get(formInputs, 'minutes.value', 0) as number;
    const hours = _.get(formInputs, 'hours.value', 0) as number;
    const expectedReportInterval = (seconds * 1000) + (minutes * 60000) + (hours * 3600000);
    const updates = {
      expectedReportInterval
    };
    const deviceMutations = _.map(props.devices, async device => {
      await mutateDevice({deviceId: device._id, updates});
    });
    await Promise.all(deviceMutations);
    props.setPage('default');
    props.setSelectMode(false);
    props.setSelectedDevices([]);
  };

  return (
    <CenteredPage>
      <ContainerBox>
        <p>You have {_.size(props.selectedDevices)} devices selected.</p>
        <InfoBox type={'warning'} heading={'Saving new data will overwrite existing data.'} />
        {/* @ts-ignore - styled component not typed */}
        <TextParagraph fontSize={'0.8em'}>
          Fill in all the fields below, and once you are done press the Save
          button to save your new data to all selected devices.
        </TextParagraph>
        <HorizontalLine />
        {/* @ts-ignore - styled component not typed */}
        <FlexWrapper margin={'0 0 30px'}>
          {/* @ts-ignore - styled component not typed */}
          <FlexColWrapper margin={'10px'}>
            <h5>Hour:</h5>
            <NumberField
              name={'hours'}
              isRequired
              width={'100px'}
              value={reportIntervalForm.formInputs.hours.value as number}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => reportIntervalForm.setInputValue('hours', evt.target.value)}
            />
          </FlexColWrapper>
          {/* @ts-ignore - styled component not typed */}
          <FlexColWrapper margin={'10px'}>
            <h5>Minute:</h5>
            <NumberField
              name={'minutes'}
              isRequired
              min={'0'}
              max={'59'}
              width={'100px'}
              value={reportIntervalForm.formInputs.minutes.value as number}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => reportIntervalForm.setInputValue('minutes', evt.target.value)}
            />
          </FlexColWrapper>
          {/* @ts-ignore - styled component not typed */}
          <FlexColWrapper margin={'10px'}>
            <h5>Second:</h5>
            <NumberField
              name={'seconds'}
              isRequired
              min={'0'}
              max={'59'}
              width={'100px'}
              value={reportIntervalForm.formInputs.seconds.value as number}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => reportIntervalForm.setInputValue('seconds', evt.target.value)}
            />
          </FlexColWrapper>
        </FlexWrapper>

        <FlexSpaceBetweenWrapper>
          <Button
            content={_.capitalize(props.t('labels.cancel'))}
            onClick={() => {
              props.setSelectMode(false);
              props.setSelectedDevices([]);
              props.setPage('default');
            }}
            ghosted
            width={'120px'}
            height={'30px'}
            padding={'0 15px'}
          />
          <Button
            isLoading={isUpdatingDevice}
            content={_.capitalize(props.t('labels.save'))}
            onClick={handleExpectedReportInterval}
            color={'green'}
            width={'200px'}
            height={'30px'}
            padding={'0 15px'}
          />
        </FlexSpaceBetweenWrapper>
      </ContainerBox>
    </CenteredPage>
  );
};

export default ReportInterval;
