import React, {useEffect} from 'react';

// Logic
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {useLocalState} from '../../../hooks';
import formStateOptions from './state';
import {devicesRequests} from '../../../api';
import {getRequestErrorMessage} from '../../../utils';

// UI
import TextArea from '../../../components/text-area';
import {Device} from '../../../types';
import InfoBox from '../../../components/info-box';
import {
  WizardStepContainer,
  WizardHeader,
  WizardContent,
  WizardFooter,
} from '../../../components/wizard';

interface DescriptionStepProps {
  stepForward: () => void;
  stepBack: () => void;
  device: Device;
}

const DescriptionStep = (props: DescriptionStepProps) => {

  const form = useLocalState(formStateOptions);

  const queryClient = useQueryClient();

  const updateDeviceMutation = useMutation(
    async () => devicesRequests.update({
      deviceId: props.device._id,
      updates: {description: form.formInputs.description.value as string}
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
    const isUnchanged = props.device.description === form.formInputs.description.value;
    if (isUnchanged) {
      props.stepForward();
    } else {
      updateDeviceMutation.mutate();
    }
  };

  useEffect(() => {
    form.populateInputValues({description: props.device.description || ''});
  }, []);

  return (
    <WizardStepContainer>
      <WizardHeader
        heading='Edit description'
      />
      <WizardContent>
        <TextArea
          placeholder='Description'
          value={form.formInputs.description.value as string}
          onChange={evt => form.setInputValue('description', evt.target.value)}
          height={'120px'}
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
        showContinueButtonSpinner={updateDeviceMutation.isLoading}
        onBack={props.stepBack}
      />
    </WizardStepContainer>
  );
};

export default DescriptionStep;
