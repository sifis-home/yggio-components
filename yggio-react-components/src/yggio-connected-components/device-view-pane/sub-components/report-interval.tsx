/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React, {useState} from 'react';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {Icon} from 'react-icons-kit';
import {ic_info_outline as infoIcon} from 'react-icons-kit/md/ic_info_outline';
import toast from 'react-hot-toast';

// Logic
import {isFormValid} from '../../../utils/form-wizard';
import {devicesRequests} from '../../../api';
import {Device} from '../../../types';
import {getRequestErrorMessage} from '../../../utils';

// UI
import NumberField from '../../../components/number-field';
import Button from '../../../components/button';
import {FlexWrapper} from '../../../global/styled';
import {useLocalState} from '../../../hooks';
import {reportIntervalData} from '../state';
import {convertMillisecondsToHoursMinutesSeconds} from '../utils';
import {ReportIntervalNote} from '../styled';

interface Props {
  device: Device;
}

const ReportInterval = (props: Props) => {

  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const updateDeviceMutation = useMutation(
    async (expectedReportInterval: number) => devicesRequests.update({
      deviceId: props.device._id,
      updates: {expectedReportInterval}
    }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['devices']);
        await queryClient.invalidateQueries(['device']);
        toast.success('Report interval successfully set');
      },
      onError: error => {
        toast.error(getRequestErrorMessage(error), {duration: 7000});
      },
      onSettled: () => {
        setIsEditing(false);
      }
    }
  );

  const form = useLocalState(reportIntervalData);

  const setReportInterval = () => {
    const {formInputs} = form;
    const seconds = formInputs.seconds.value as number;
    const minutes = formInputs.minutes.value as number;
    const hours = formInputs.hours.value as number;
    const expectedReportInterval = (seconds * 1000) + (minutes * 60000) + (hours * 3600000);
    updateDeviceMutation.mutate(expectedReportInterval);
  };

  const {hours, minutes, seconds} = convertMillisecondsToHoursMinutesSeconds(
    props.device.expectedReportInterval
  );

  return (
    <>
      <FlexWrapper>
        <Icon icon={infoIcon as object} size={19} style={{margin: '7px 5px 0 0'}} />
        <ReportIntervalNote>
          Set how often you expect this device to send a report.&nbsp;
          You can use the rule engine to set up rules that trigger when&nbsp;
          adevice has been silent for to long.
        </ReportIntervalNote>
      </FlexWrapper>

      <FlexWrapper>
        <NumberField
          name={'hours'}
          label={'Hours'}
          value={isEditing ? form.formInputs.hours.value as number : hours}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => form.setInputValue('hours', evt.target.value)}
          width={'100px'}
          margin={'0 10px 0 0'}
          isDisabled={!isEditing}
        />
        <NumberField
          name={'minutes'}
          min={'0'}
          max={'59'}
          label='Minutes'
          value={isEditing ? form.formInputs.minutes.value as number : minutes}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => form.setInputValue('minutes', evt.target.value)}
          width={'100px'}
          margin={'0 10px 0 0'}
          isDisabled={!isEditing}
        />
        <NumberField
          name={'seconds'}
          label={'Seconds'}
          min={'0'}
          max={'59'}
          value={isEditing ? form.formInputs.seconds.value as number : seconds}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => form.setInputValue('seconds', evt.target.value)}
          width={'100px'}
          isDisabled={!isEditing}
        />
      </FlexWrapper>

      {!isEditing && (
        <FlexWrapper>
          <Button
            label={'Edit'}
            color={'blue'}
            ghosted
            width={'80px'}
            margin={'14px 8px 10px 0'}
            onClick={() => {
              form.setInputValue('hours', hours);
              form.setInputValue('minutes', minutes);
              form.setInputValue('seconds', seconds);
              setIsEditing(true);
            }}
          />
        </FlexWrapper>
      )}

      {isEditing && (
        <FlexWrapper>
          <Button
            label={'Cancel'}
            width={'90px'}
            margin={'14px 8px 10px 0'}
            onClick={() => {
              setIsEditing(false);
            }}
          />
          <Button
            label={'Set'}
            color={'green'}
            width={'90px'}
            margin={'14px 0 0 0'}
            isLoading={updateDeviceMutation.isLoading}
            disabled={!isFormValid(form.formInputs)}
            onClick={() => {
              setReportInterval();
            }}
          />
        </FlexWrapper>
      )}

    </>
  );
};

export default ReportInterval;
