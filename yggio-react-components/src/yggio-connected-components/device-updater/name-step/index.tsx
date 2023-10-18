/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useEffect} from 'react';

// Logic
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {useLocalState} from '../../../hooks';
import {getValidationErrorMessage, isFormValid} from '../../../utils/form-wizard';
import formStateOptions from './state';
import {devicesRequests} from '../../../api';
import {getRequestErrorMessage} from '../../../utils';

// UI
import TextField from '../../../components/text-field';
import {Device} from '../../../types';
import InfoBox from '../../../components/info-box';
import {
  WizardStepContainer,
  WizardHeader,
  WizardContent,
  WizardFooter,
} from '../../../components/wizard';

interface NameStepProps {
  stepForward: () => void;
  stepBack: () => void;
  device: Device;
}

const NameStep = (props: NameStepProps) => {

  const form = useLocalState(formStateOptions);

  const queryClient = useQueryClient();

  const updateDeviceMutation = useMutation(
    async () => devicesRequests.update({
      deviceId: props.device._id,
      updates: {name: form.formInputs.name.value as string}
    }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['devices']);
        await queryClient.invalidateQueries(['devices', props.device._id]);
        props.stepForward();
      },
    }
  );

  const onContinue = () => {
    const isUnchanged = props.device.name === form.formInputs.name.value;
    if (isUnchanged) {
      props.stepForward();
    } else {
      updateDeviceMutation.mutate();
    }
  };

  useEffect(() => {
    form.populateInputValues({name: props.device.name || ''});
  }, []);

  return (
    <WizardStepContainer>
      <WizardHeader
        heading='Edit name'
      />
      <WizardContent>
        <TextField
          placeholder='Name'
          height={'40px'}
          value={form.formInputs.name.value as string}
          onChange={evt => {
            form.setInputValue('name', evt.target.value);
            form.showInputValidation('name');
          }}
          validationErrorMessage={getValidationErrorMessage(form.formInputs.name)}
        />
        {updateDeviceMutation.isError && (
          <InfoBox
            heading='Could not update device'
            type={'error'}
            content={getRequestErrorMessage(updateDeviceMutation.error)}
            margin={'20px 0 0 0'}
          />
        )}
      </WizardContent>
      <WizardFooter
        onContinue={onContinue}
        disableContinueButton={!isFormValid(form.formInputs)}
        showContinueButtonSpinner={updateDeviceMutation.isLoading}
        onBack={props.stepBack}
      />
    </WizardStepContainer>
  );
};

export default NameStep;
