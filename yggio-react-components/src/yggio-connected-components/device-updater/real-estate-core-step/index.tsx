import React from 'react';

import {devicesApi} from '../../../api';
import RecDeviceEditor from '../../rec-device-editor';
import {Device} from '../../../types';
import {
  WizardStepContainer,
  WizardHeader,
  WizardContent,
  WizardFooter,
} from '../../../components/wizard';

interface RealEstateCoreStepProps {
  stepForward: () => void;
  stepBack: () => void;
  device: Device;
}

const RealEstateCoreStep = (props: RealEstateCoreStepProps) => {

  const recConnectorDevicesQuery = devicesApi.useConnectorDevicesQuery('RealEstateCore');

  return (
    <WizardStepContainer>
      <WizardHeader
        heading='Edit real estate core'
      />
      <WizardContent>
        <RecDeviceEditor
          deviceId={props.device._id}
          connectors={recConnectorDevicesQuery.data as Device[]}
        />
      </WizardContent>
      <WizardFooter
        onContinue={props.stepForward}
        onBack={props.stepBack}
      />
    </WizardStepContainer>
  );
};

export default RealEstateCoreStep;
