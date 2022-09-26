/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {useQueryClient} from '@tanstack/react-query';

import {FlexColWrapper} from '../../../global/styled';
import TextField from '../../../components/text-field';
import Button from '../../../components/button';
import {useLocalState} from '../../../hooks';
import {box2FormState} from '../state';
import {devicesApi} from '../../../api';
import {Translate} from '../../../types';

interface Box2DownlinkProps {
  deviceId: string;
  t: Translate;
}

const Box2Downlink = (props: Box2DownlinkProps) => {
  const form = useLocalState(box2FormState);

  const queryClient = useQueryClient();
  const updateDeviceMutation = devicesApi.useUpdateDevice(queryClient);

  const sendBox2Downlink = () => {
    const updates = {
      value: {
        value: Number(form.formInputs.box2downlink.value)
      },
    };
    updateDeviceMutation.mutate({updates, deviceId: props.deviceId});
    form.resetForm();
  };

  return (
    <FlexColWrapper
      style={{width: '30%'}}
    >
      <TextField
        name={'box2downlink'}
        placeholder={'Value... (Number)'}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => form.setInputValue('box2downlink', evt.target.value)}
        value={form.formInputs.box2downlink.value as string}
        margin={'0 0 10px 0'}
      />
      <Button
        disabled={!form.formInputs.box2downlink.value}
        ghosted
        color={'green'}
        onClick={sendBox2Downlink}
        content={_.capitalize(props.t('labels.send'))}
        width={'300px'}
      />
    </FlexColWrapper>
  );
};

export default Box2Downlink;
