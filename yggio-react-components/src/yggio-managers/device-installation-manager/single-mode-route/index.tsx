import _ from 'lodash';
import React, {useState} from 'react';
import {NextRouter} from 'next/router';

// Logic
import {STEP_NOT_FOUND} from '../constants';
import {STEPS, DEVICE_TYPES, PROGRESS_BAR_TITLES} from './constants';
import {selectSteps} from './selectors';
import {TranslatorPreference} from '../../../types';
import {
  navigationState,
  deviceTypeFormState,
  deviceModelNameFormState,
  loraFormState,
  genericFormState,
  detailsFormState,
  siemensDesigoCcConnectorFormState,
  chirpstackConnectorFormState,
  netmoreConnectorFormState,
  actilityThingparkConnectorFormState,
  thingsNetworkConnectorFormState,
  sodaqFormState,
  wirelessMBusFormState,
  celsiviewConnectorFormState,
  box2GatewayFormState,
  klimatorRsiConnectorFormState,
  bleDeviceFormState,
  weatherDeviceFormState,
  deltaControlsConnector,
  loraGatewayFormState,
} from './state';
import {useUpdateLocationMutation} from './queries';
import {useLocalState} from '../../../hooks';

// UI
import StepProgressBar from '../../../components/step-progress-bar';
import {CenteredPage} from '../../../global/components';

import DeviceTypeSelectionPane from './device-type-selection-pane';
import DeviceModelNamePane from './device-model-name-pane';
import TranslatorPane from './translator-pane';
import LoraPane from './lora-pane';
import GenericPane from './generic-pane';
import ChirpstackConnectorPane from './chirpstack-connector-pane';
import DetailsPane from './details-pane';
import NetmoreConnectorPane from './netmore-connector-pane';
import SodaqPane from './sodaq-pane';
import BleDevicePane from './ble-device-pane';
import Box2GatewayPane from './box2-gateway-pane';
import ResultPane from './result-pane';
import SiemensDesigoCcConnectorPane from './siemens-desigo-cc-connector-pane';
import ActilityThingparkConnectorPane from './actility-thingpark-connector-pane';
import ThingsNetworkConnectorPane from './things-network-connector-pane';
import WirelessMBusPane from './wireless-m-bus-pane';
import CelsiviewConnectorPane from './celsiview-connector-pane';
import KlimatorRsiConnectorPane from './klimator-rsi-connector-pane';
import DeltaControlsConnectorPane from './delta-controls-connector-pane';
import WeatherDevicePane from './weather-device-pane';
import LoraGatewayPane from './lora-gateway-pane';

interface SingleModePaneProps {
  router: NextRouter;
}

const SingleModePane = (props: SingleModePaneProps) => {

  // Note: State is getting messy - should be refactored
  const navigation = useLocalState(navigationState);
  const deviceTypeForm = useLocalState(deviceTypeFormState);
  const deviceModelNameForm = useLocalState(deviceModelNameFormState);
  const loraForm = useLocalState(loraFormState);
  const genericForm = useLocalState(genericFormState);
  const detailsForm = useLocalState(detailsFormState);
  const siemensDesigoCcConnectorForm = useLocalState(siemensDesigoCcConnectorFormState);
  const chirpstackConnectorForm = useLocalState(chirpstackConnectorFormState);
  const netmoreConnectorForm = useLocalState(netmoreConnectorFormState);
  const actilityThingparkConnectorForm = useLocalState(actilityThingparkConnectorFormState);
  const thingsNetworkConnectorForm = useLocalState(thingsNetworkConnectorFormState);
  const sodaqForm = useLocalState(sodaqFormState);
  const wirelessMBusForm = useLocalState(wirelessMBusFormState);
  const celsiviewConnectorForm = useLocalState(celsiviewConnectorFormState);
  const box2GatewayForm = useLocalState(box2GatewayFormState);
  const klimatorRsiConnectorForm = useLocalState(klimatorRsiConnectorFormState);
  const bleDeviceForm = useLocalState(bleDeviceFormState);
  const weatherDeviceForm = useLocalState(weatherDeviceFormState);
  const deltaControlsConnectorForm = useLocalState(deltaControlsConnector);
  const loraGatewayForm = useLocalState(loraGatewayFormState);

  const [translatorPreferences, setTranslatorPreferences] = useState<TranslatorPreference[]>([]);

  const updateLocationMutation = useUpdateLocationMutation(navigation.incrementCurrentStep);
  const steps = selectSteps(deviceTypeForm.formInputs.deviceType.value as DEVICE_TYPES);

  return (
    <CenteredPage>
      <StepProgressBar
        title={'Install device'}
        steps={_.map(steps, step => PROGRESS_BAR_TITLES[step])}
        currentStep={navigation.currentStep + 1}
        margin={'0 0 9px 0'}
      />
      {{
        [STEPS.deviceType]: (
          <DeviceTypeSelectionPane
            router={props.router}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={deviceTypeForm}
          />
        ),
        [STEPS.deviceModelName]: (
          <DeviceModelNamePane
            onBack={() => {
              deviceModelNameForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={deviceModelNameForm}
            setTranslatorPreferences={setTranslatorPreferences}
          />
        ),
        [STEPS.translator]: (
          <TranslatorPane
            onBack={() => {
              navigation.decrementCurrentStep();
              deviceModelNameForm.resetForm();
              setTranslatorPreferences([]);
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            translatorPreferences={translatorPreferences}
            setTranslatorPreferences={setTranslatorPreferences}
            deviceModelName={deviceModelNameForm.formInputs.deviceModelName.value as string}
          />
        ),
        [STEPS.lora]: (
          <LoraPane
            onBack={() => {
              deviceTypeForm.resetForm();
              loraForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={loraForm}
          />
        ),
        [STEPS.generic]: (
          <GenericPane
            onBack={() => {
              deviceTypeForm.resetForm();
              genericForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={genericForm}
          />
        ),
        [STEPS.siemensDesigoCcConnector]: (
          <SiemensDesigoCcConnectorPane
            onBack={() => {
              deviceTypeForm.resetForm();
              siemensDesigoCcConnectorForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={siemensDesigoCcConnectorForm}
          />
        ),
        [STEPS.netmoreConnector]: (
          <NetmoreConnectorPane
            onBack={() => {
              deviceTypeForm.resetForm();
              netmoreConnectorForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={netmoreConnectorForm}
          />
        ),
        [STEPS.thingsNetworkConnector]: (
          <ThingsNetworkConnectorPane
            onBack={() => {
              deviceTypeForm.resetForm();
              thingsNetworkConnectorForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={thingsNetworkConnectorForm}
          />
        ),
        [STEPS.sodaq]: (
          <SodaqPane
            onBack={() => {
              deviceTypeForm.resetForm();
              sodaqForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={sodaqForm}
          />
        ),
        [STEPS.bleDevice]: (
          <BleDevicePane
            onBack={() => {
              deviceTypeForm.resetForm();
              bleDeviceForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={bleDeviceForm}
          />
        ),
        [STEPS.weatherDevice]: (
          <WeatherDevicePane
            onBack={() => {
              deviceTypeForm.resetForm();
              weatherDeviceForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={weatherDeviceForm}
          />
        ),
        [STEPS.actilityThingparkConnector]: (
          <ActilityThingparkConnectorPane
            onBack={() => {
              deviceTypeForm.resetForm();
              actilityThingparkConnectorForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={actilityThingparkConnectorForm}
          />
        ),
        [STEPS.chirpstackConnector]: (
          <ChirpstackConnectorPane
            onBack={() => {
              deviceTypeForm.resetForm();
              chirpstackConnectorForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={chirpstackConnectorForm}
          />
        ),
        [STEPS.wirelessMBus]: (
          <WirelessMBusPane
            onBack={() => {
              deviceTypeForm.resetForm();
              wirelessMBusForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={wirelessMBusForm}
          />
        ),
        [STEPS.celsiviewConnector]: (
          <CelsiviewConnectorPane
            onBack={() => {
              deviceTypeForm.resetForm();
              celsiviewConnectorForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={celsiviewConnectorForm}
          />
        ),
        [STEPS.box2Gateway]: (
          <Box2GatewayPane
            onBack={() => {
              deviceTypeForm.resetForm();
              box2GatewayForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={box2GatewayForm}
          />
        ),
        [STEPS.klimatorRsiConnector]: (
          <KlimatorRsiConnectorPane
            onBack={() => {
              deviceTypeForm.resetForm();
              klimatorRsiConnectorForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={klimatorRsiConnectorForm}
          />
        ),
        [STEPS.deltaControlsConnector]: (
          <DeltaControlsConnectorPane
            onBack={() => {
              deviceTypeForm.resetForm();
              deltaControlsConnectorForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={deltaControlsConnectorForm}
          />
        ),
        [STEPS.loraGateway]: (
          <LoraGatewayPane
            onBack={() => {
              deviceTypeForm.resetForm();
              loraGatewayForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            form={loraGatewayForm}
          />
        ),
        [STEPS.details]: (
          <DetailsPane
            forms={{
              deviceType: deviceTypeForm,
              deviceModelName: deviceModelNameForm,
              lora: loraForm,
              generic: genericForm,
              details: detailsForm,
              siemensDesigoCcConnector: siemensDesigoCcConnectorForm,
              chirpstackConnector: chirpstackConnectorForm,
              netmoreConnector: netmoreConnectorForm,
              actilityThingparkConnector: actilityThingparkConnectorForm,
              thingsNetworkConnector: thingsNetworkConnectorForm,
              sodaq: sodaqForm,
              wirelessMBus: wirelessMBusForm,
              celsiviewConnector: celsiviewConnectorForm,
              box2Gateway: box2GatewayForm,
              klimatorRsiConnector: klimatorRsiConnectorForm,
              bleDevice: bleDeviceForm,
              weatherDevice: weatherDeviceForm,
              deltaControlsConnector: deltaControlsConnectorForm,
              loraGateway: loraGatewayForm,
            }}
            translatorPreferences={translatorPreferences}
            onBack={() => {
              detailsForm.resetForm();
              navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={navigation.incrementCurrentStep}
            updateLocationMutation={updateLocationMutation}
          />
        ),
        [STEPS.result]: (
          <ResultPane
            router={props.router}
            detailsFormInputs={detailsForm.formInputs}
            updateLocationMutation={updateLocationMutation}
          />
        ),
        [STEP_NOT_FOUND]: (
          <h1>{'No single step found'}</h1>
        ),
      }[steps[navigation.currentStep]]}
    </CenteredPage>
  );
};

export default SingleModePane;
