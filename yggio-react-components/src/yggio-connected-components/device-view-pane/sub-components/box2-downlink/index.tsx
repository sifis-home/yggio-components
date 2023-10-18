/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState} from 'react';
import _ from 'lodash';
import {useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';

import {FlexColWrapper} from '../../../../global/styled';
import TextField from '../../../../components/text-field';
import Button from '../../../../components/button';
import {devicesApi} from '../../../../api';

interface Box2DownlinkProps {
  deviceId: string;
}

const Box2Downlink = (props: Box2DownlinkProps) => {
  const {t} = useTranslation();

  const [downlinkValue, setDownlinkValue] = useState<string>('');

  const queryClient = useQueryClient();
  const updateDeviceMutation = devicesApi.useUpdateDevice(queryClient);

  const sendBox2Downlink = () => {
    const updates = {
      value: {
        value: Number(downlinkValue)
      },
    };
    updateDeviceMutation.mutate({updates, deviceId: props.deviceId});
    setDownlinkValue('');
  };

  return (
    <FlexColWrapper
      style={{width: '30%'}}
    >
      <TextField
        name={'box2downlink'}
        placeholder={'Value... (Number)'}
        onChange={evt => setDownlinkValue(evt.target.value)}
        value={downlinkValue}
        margin={'0 0 10px 0'}
      />
      <Button
        disabled={!downlinkValue}
        ghosted
        color={'green'}
        onClick={sendBox2Downlink}
        content={_.capitalize(t('labels.send'))}
        width={'300px'}
      />
    </FlexColWrapper>
  );
};

export default Box2Downlink;
