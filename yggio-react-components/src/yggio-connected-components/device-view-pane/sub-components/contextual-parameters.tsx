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

import {Device, Translate} from '../../../types';
import {devicesApi} from '../../../api';
import ContextualParametersEditor from '../../../yggio-components/contexutal-parameters-editor';

interface Props {
  device: Device;
  t: Translate;
}

const ContextualParameters = (props: Props) => {
  const queryClient = useQueryClient();
  const updateDeviceMutation = devicesApi.useUpdateDevice(queryClient);

  const handleUpdateDeviceContextMap = (parameters: {name: string, value: string}[]) => {
    const contextMap = _.chain(parameters)
      .keyBy('name')
      .mapValues('value')
      .value();
    const updates: Partial<Device> = {contextMap};
    updateDeviceMutation.mutate({updates, deviceId: props.device._id});
  };
  return (
    <div>
      <ContextualParametersEditor
        value={_.map(props.device.contextMap, (value, name) => ({name, value}))}
        onChange={(parameters: {name: string, value: string}[]) => {
          handleUpdateDeviceContextMap(parameters);
        }}
        isLoading={updateDeviceMutation.isLoading}
        showRemovePromt
      />
    </div>
  );
};

export default ContextualParameters;
