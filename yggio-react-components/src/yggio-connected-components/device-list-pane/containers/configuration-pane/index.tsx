/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import toast from 'react-hot-toast';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {Text, Box, Flex} from '@chakra-ui/react';
import {MdErrorOutline as ErrorIcon} from 'react-icons/md';
import {jobTypes} from 'yggio-types';

// Logic
import {IdKeyedDevices, Devices, DeviceCommands} from '../../../../types';
import {useLocalState} from '../../../../hooks';
import {selectConfigurableDevices} from './selectors';
import {createDownlinkData, validateDevices} from './utils';
import {Actions, formState, navigationState, NavState} from './state';
import {DEFAULT_CONFIG_OPTIONS, LORA_PRESETS, LORA_LABELS, LORA_TYPES} from './constants';
import {jobRequests, jobApi} from '../../../../api';
import {resolveDeviceType, getRequestErrorMessage} from '../../../../utils';
import {COLORS} from '../../../../constants';

// UI
import Select from '../../../../components/select';
import ContainerBox from '../../../../components/container-box';
import Button from '../../../../components/button';
import TextField from '../../../../components/text-field';
import {CenteredPage} from '../../../../global/components';
import StepProgressBar from '../../../../components/step-progress-bar';
import {ConfigurationButtonContainer} from './styled';
import BatchOperationView from '../../../batch-operation-view';
import {
  FlexColCenterMaxWidthWrapper,
  FlexColMaxWidthWrapper,
  FlexColWrapper,
  FlexSpaceBetweenWrapper,
} from '../../../../global/styled';

interface BaseConfigurationProps {
  selectedDevices: string[];
  devices: Devices;
  setSelectedDevices(devices: string[]): void;
  setIsInSelectMode(selectMode: boolean): void;
  setPage(page: string): void;
}

const steps = [
  {name: 'options', progressBarTitle: 'Options'},
  {name: 'config', progressBarTitle: 'Configuration'},
  {name: 'confirmation', progressBarTitle: 'Confirmation'},
  {name: 'summary', progressBarTitle: 'Summary'},
];

const [
  options,
  config,
  confirmation,
  summary,
] = steps;

// TODO: This component really needs to divided up into smaller components

const BaseConfiguration = (props: BaseConfigurationProps) => {
  const navState = useLocalState(navigationState);
  const configurableDevices = selectConfigurableDevices({
    devices: props.devices,
    selectedDevices: props.selectedDevices,
  });

  const isValidConfiguration = validateDevices(configurableDevices);

  const deviceTypes = _.map(configurableDevices, device => resolveDeviceType(device) as string);
  const isNetmoreDevice = _.every(deviceTypes, (type: string) => _.includes(type, LORA_TYPES.Netmore));
  const isChirpStackDevice = _.every(deviceTypes, (type: string) => _.includes(type, LORA_TYPES.ChirpStack));
  const isActilityDevice = _.every(deviceTypes, (type: string) => _.includes(type, LORA_TYPES.ActilityThingpark));
  const isValidLoRaDevices = _.some([
    isNetmoreDevice,
    isChirpStackDevice,
    isActilityDevice,
  ]);

  return (
    <CenteredPage>
      <StepProgressBar
        title={<div>Configuration ({_.size(configurableDevices)} devices)</div>}
        steps={_.map(steps, 'progressBarTitle')}
        currentStep={navState.currentStep + 1}
        margin={'0 0 9px 0'}
        width={'100%'}
      />
      <ContainerBox>
        <Configuration
          {...props}
          navState={navState}
          configurableDevices={configurableDevices}
          isValidConfiguration={isValidConfiguration}
          isValidLoRaDevices={isValidLoRaDevices}
          isNetmoreDevice={isNetmoreDevice}
          isChirpStackDevice={isChirpStackDevice}
          isActilityDevice={isActilityDevice}
        />
      </ContainerBox>
    </CenteredPage>
  );
};

interface ConfigurationProps {
  navState: NavState & Actions;
  configurableDevices: IdKeyedDevices;
  isValidConfiguration: boolean;
  isValidLoRaDevices: boolean;
  isNetmoreDevice: boolean;
  isChirpStackDevice: boolean;
  isActilityDevice: boolean;
  setSelectedDevices(devices: string[]): void;
  setIsInSelectMode(selectMode: boolean): void;
  setPage(page: string): void;
}

const Configuration = (props: ConfigurationProps) => {

  const {t} = useTranslation();

  const [jobId, setJobId] = React.useState('');

  const queryClient = useQueryClient();

  const deviceCommandsJobMutation = useMutation(
    async (template: DeviceCommands) => jobRequests.createDeviceCommandsJob(template),
    {
      onSuccess: async (job: jobTypes.Job) => {
        await queryClient.invalidateQueries(['job']);
        setJobId(job._id);
        configForm.resetForm();
        props.navState.incrementCurrentStep();
      },
      onError: (err: Error) => {
        toast.error(getRequestErrorMessage(err));
      },
    }
  );

  const jobQuery = jobApi.useJob(jobId);

  const configForm = useLocalState(formState);

  const getType = () => {
    if (props.isNetmoreDevice) {
      return LORA_TYPES.Netmore;
    }
    if (props.isActilityDevice) {
      return LORA_TYPES.ActilityThingpark;
    }
    if (props.isChirpStackDevice) {
      return LORA_TYPES.ChirpStack;
    }
  };

  const createJob = () => {
    const data = createDownlinkData({
      type: getType(),
      devices: props.configurableDevices,
      formInputs: configForm.formInputs,
    });

    if (!data) {
      return toast.error('Failed to create data');
    }

    deviceCommandsJobMutation.mutate(data);

  };

  const onDoneClick = () => {
    setJobId('');
    props.setIsInSelectMode(false);
    props.setSelectedDevices([]);
    props.setPage('default');
  };

  if (!props.isValidConfiguration || !props.isValidLoRaDevices) {
    return (
      <FlexColCenterMaxWidthWrapper>
        <Text fontSize='sm'>
          <Flex>
            <Box>
              <ErrorIcon color={COLORS.red} />
            </Box>
            {t('phrases.invalidConfigurationDevices')}
          </Flex>
        </Text>

        <Button
          margin={'20px 0 0 0'}
          width={'300px'}
          color={'green'}
          content={t('labels.backToDeviceList')}
          onClick={() => props.setPage('default')}
        />
      </FlexColCenterMaxWidthWrapper>
    );
  }

  return (
    <div>

      {{
        [options.name]: (
          <>
            <Select
              isClearable
              onChange={evt => configForm.setInputValue('option', evt.target.value)}
              value={configForm.formInputs.option.value as string}
              options={DEFAULT_CONFIG_OPTIONS}
              label='Select option'
            />
            <ConfigurationButtonContainer>
              <Button
                content={_.capitalize(t('labels.cancel'))}
                ghosted
                onClick={() => props.setPage('default')}
              />
              <Button
                disabled={!configForm.formInputs.option.validation.isValid}
                color={'green'}
                content={_.capitalize(t('labels.continue'))}
                onClick={props.navState.incrementCurrentStep}
              />
            </ConfigurationButtonContainer>
          </>
        ),
        [config.name]: (
          <>
            {configForm.formInputs.option.value === 'presets' && (
              <FlexColMaxWidthWrapper>
                <Select
                  isClearable
                  onChange={evt => configForm.setInputValue('preset', evt.target.value)}
                  value={configForm.formInputs.preset.value as string}
                  options={LORA_PRESETS}
                  label='Select downlink preset'
                />
              </FlexColMaxWidthWrapper>
            )}
            {configForm.formInputs.option.value === 'custom' && (
              <FlexColMaxWidthWrapper>
                <h4>Custom downlink</h4>
                <TextField
                  label={'fPort'}
                  additionalInfo={'FPort used (must be between 1-1000).'}
                  name={'fPort'}
                  onChange={evt => configForm.setInputValue('fPort', evt.target.value)}
                  value={configForm.formInputs.fPort.value as string}
                  margin={'20px 0 10px 0'}
                />
                <TextField
                  label={'Data'}
                  additionalInfo={'Hex data to be sent.'}
                  name={'data'}
                  onChange={evt => configForm.setInputValue('data', evt.target.value)}
                  value={configForm.formInputs.data.value as string}
                  margin={'0 0 10px 0'}
                />
                <TextField
                  label={'Reference'}
                  additionalInfo='(optional) Random reference (used on ack notification).'
                  name={'reference'}
                  onChange={evt => configForm.setInputValue('reference', evt.target.value)}
                  value={configForm.formInputs.reference.value as string}
                  margin={'0 0 10px 0'}
                />
                {!props.isNetmoreDevice && (
                  <Select
                    label={'Confirmed'}
                    additionalInfo={'Is an ACK required from the node? Defaults to false.'}
                    name='confirmed'
                    isClearable
                    options={[
                      {label: 'True', value: 'true'},
                      {label: 'False', value: 'false'},
                    ]}
                    value={configForm.formInputs.confirmed.value as string}
                    onChange={evt => configForm.setInputValue('confirmed', evt.target.value)}
                    margin={'0 0 10px 0'}
                  />
                )}
                {props.isActilityDevice && (
                  <Select
                    label={'Flush'}
                    additionalInfo={'Flush downlink queue'}
                    name='flush'
                    isClearable
                    options={[
                      {label: 'True', value: 'true'},
                      {label: 'False', value: 'false'},
                    ]}
                    value={configForm.formInputs.flush.value as string}
                    onChange={evt => configForm.setInputValue('flush', evt.target.value)}
                  />
                )}
              </FlexColMaxWidthWrapper>
            )}
            <ConfigurationButtonContainer>
              <Button
                content={_.capitalize(t('labels.back'))}
                ghosted
                onClick={props.navState.decrementCurrentStep}
              />
              {configForm.formInputs.option.value === 'presets' && (
                <Button
                  disabled={!configForm.formInputs.preset.validation.isValid}
                  color={'green'}
                  content={_.capitalize(t('labels.continue'))}
                  onClick={props.navState.incrementCurrentStep}
                />
              )}
              {configForm.formInputs.option.value === 'custom' && (
                <Button
                  disabled={!_.every([
                    configForm.formInputs.fPort.validation.isValid,
                    configForm.formInputs.data.validation.isValid,
                  ])}
                  color={'green'}
                  content={_.capitalize(t('labels.continue'))}
                  onClick={props.navState.incrementCurrentStep}
                />
              )}
            </ConfigurationButtonContainer>
          </>
        ),
        [confirmation.name]: (
          <>
            <p>
              Press continue button if you are sure you want to send this downlink to {
                _.size(props.configurableDevices)
              } devices.
            </p>
            {configForm.formInputs.option.value === 'presets' && (
              <b>{LORA_LABELS[configForm.formInputs.preset.value as string]}</b>
            )}
            {configForm.formInputs.option.value === 'custom' && (
              <FlexColWrapper>
                <FlexSpaceBetweenWrapper>
                  fPort: <b>{configForm.formInputs.fPort.value as string}</b>
                </FlexSpaceBetweenWrapper>
                <FlexSpaceBetweenWrapper>
                  data: <b>{configForm.formInputs.data.value as string}</b>
                </FlexSpaceBetweenWrapper>
                <FlexSpaceBetweenWrapper>
                  reference: <b>{configForm.formInputs.reference.value as string}</b>
                </FlexSpaceBetweenWrapper>
                <FlexSpaceBetweenWrapper>
                  confirmed: <b>{configForm.formInputs.confirmed.value as string}</b>
                </FlexSpaceBetweenWrapper>
              </FlexColWrapper>
            )}
            <ConfigurationButtonContainer>
              <Button
                content={_.capitalize(t('labels.back'))}
                ghosted
                onClick={props.navState.decrementCurrentStep}
              />
              <Button
                disabled={!configForm.formInputs.option.validation.isValid}
                color={'green'}
                content={_.capitalize(t('labels.continue'))}
                onClick={createJob}
              />
            </ConfigurationButtonContainer>
          </>
        ),
        [summary.name]: (
          <BatchOperationView
            job={jobQuery.data}
            items={_.map(props.configurableDevices, device => ({iotnodeId: device._id}))}
            onDoneClick={onDoneClick}
            progressHeading='Sending downlinks...'
            successesText='downlinks successfully sent'
            errorsText='downlinks failed to be sent'
          />
        ),
      }[steps[props.navState.currentStep].name || 'STEP_NOT_FOUND']}

    </div>
  );
};

export default BaseConfiguration;
