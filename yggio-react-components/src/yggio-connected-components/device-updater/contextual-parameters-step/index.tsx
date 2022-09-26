/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React, {useState, useEffect} from 'react';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import _, {Dictionary} from 'lodash';

import {Device} from '../../../types';
import {devicesRequests} from '../../../api';
import {
  WizardStepContainer,
  WizardHeader,
  WizardContent,
  WizardFooter,
} from '../../../components/wizard';
import ContextualParametersEditor from '../../../yggio-components/contexutal-parameters-editor';

interface ContextualParametersStepProps {
  stepForward: () => void;
  stepBack: () => void;
  device: Device;
}

const ContextualParametersStep = (props: ContextualParametersStepProps) => {

  const [contextMap, setContextMap] = useState<{name: string, value: string}[]>();

  const queryClient = useQueryClient();

  const updateDeviceMutation = useMutation(
    async (contextMap: Dictionary<string>) => devicesRequests.update({
      deviceId: props.device._id,
      updates: {contextMap}
    }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['devices']);
        await queryClient.invalidateQueries(['devices', props.device._id]);
        props.stepForward();
      },
    }
  );

  useEffect(() => {
    setContextMap(_.map(props.device.contextMap, (value, name) => ({name, value})));
  }, []);

  return (
    <WizardStepContainer>
      <WizardHeader
        heading='Edit contextual parameters'
      />
      <WizardContent>
        <ContextualParametersEditor
          value={contextMap}
          onChange={(parameters: {name: string, value: string}[]) => {
            // handleUpdateDeviceContextMap(parameters);
            setContextMap(parameters);
          }}
        />
      </WizardContent>
      <WizardFooter
        onContinue={() => {
          const contextObj = _.chain(contextMap)
            .keyBy('name')
            .mapValues('value')
            .value();
          updateDeviceMutation.mutate(contextObj);
        }}
        onBack={props.stepBack}
      />
    </WizardStepContainer>
  );
};

export default ContextualParametersStep;
