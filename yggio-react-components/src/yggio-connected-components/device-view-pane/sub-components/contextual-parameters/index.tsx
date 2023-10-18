import React from 'react';
import _ from 'lodash';
import {useQueryClient} from '@tanstack/react-query';

import {Device, Parameter} from '../../../../types';
import {devicesApi} from '../../../../api';
import ContextualParametersEditor from '../../../contextual-parameters-editor';

interface Props {
  device: Device;
}

const ContextualParameters = (props: Props) => {
  const queryClient = useQueryClient();
  const updateDeviceMutation = devicesApi.useUpdateDevice(queryClient);

  const handleUpdateDeviceContextMap = (parameters: Parameter[]) => {
    const contextMap = _.chain(parameters)
      .keyBy('name')
      .mapValues('value')
      .value();
    const updates = {
      contextMap,
    };
    updateDeviceMutation.mutate({updates, deviceId: props.device._id});
  };

  return (
    <ContextualParametersEditor
      value={_.map(props.device.contextMap, (value, name) => ({name, value}))}
      onChange={parameters => {
        handleUpdateDeviceContextMap(parameters);
      }}
      isLoading={updateDeviceMutation.isLoading}
      showRemovePromt
    />
  );
};

export default ContextualParameters;
