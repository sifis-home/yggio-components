/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {NextRouter} from 'next/router';
import {useQueryClient} from '@tanstack/react-query';
import {IdKeyedDevices} from '../../../../types';
import ProgressBar from '../../../../components/progress-bar';
import Select from '../../../../components/select';
import ContainerBox from '../../../../components/container-box';
import Button from '../../../../components/button';
import TextField from '../../../../components/text-field';
import {CenteredPage} from '../../../../global/components';
import StepProgressBar from '../../../../components/step-progress-bar';
import {
  FlexColCenterMaxWidthWrapper,
  FlexColMaxWidthWrapper,
  FlexColWrapper,
  FlexSpaceBetweenWrapper,
} from '../../../../global/styled';
import {useLocalState} from '../../../../hooks';
import {selectConfigurableDevices} from './selectors';
import {createDownlinkData, validateDevices} from './utils';
import {Actions, formState, navigationState, NavState} from './state';
import {ConfigurationButtonContainer, TextSpan} from './styled';
import {DEFAULT_CONFIG_OPTIONS, LORA_PRESETS, LORA_LABELS} from './constants';
import {jobApi} from '../../../../api';

interface BaseConfigurationProps {
  selectedDevices: string[];
  devices: IdKeyedDevices;
  router: NextRouter;
  setSelectedDevices(devices: string[]): void;
  setSelectMode(selectMode: boolean): void;
  setPage(page: string): void;
  t(key: string): string;
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

const BaseConfiguration = (props: BaseConfigurationProps) => {
  const navState = useLocalState(navigationState);
  const configurableDevices = selectConfigurableDevices({
    devices: props.devices,
    selectedDevices: props.selectedDevices,
  });

  const isValidConfiguration = validateDevices(configurableDevices);

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
          router={props.router}
          configurableDevices={configurableDevices}
          isValidConfiguration={isValidConfiguration}
        />
      </ContainerBox>
    </CenteredPage>
  );
};

interface ConfigurationProps {
  navState: NavState & Actions;
  configurableDevices: IdKeyedDevices;
  isValidConfiguration: boolean;
  router: NextRouter;
  setSelectedDevices(devices: string[]): void;
  setSelectMode(selectMode: boolean): void;
  setPage(page: string): void;
  t(key: string): string;
}

const CHIRP_STACK_COMMANDS = {
  loraAppServerQueueDownlink: 'loraAppServerQueueDownlink',
  loraAppServerGetDeviceQueue: 'loraAppServerGetDeviceQueue',
  loraAppServerFlushQueue: 'loraAppServerFlushQueue',
};

const Configuration = (props: ConfigurationProps) => {
  const [jobId, setJobId] = React.useState('');
  const queryClient = useQueryClient();
  const deviceCommandsJobMutation = jobApi.useDeviceCommandsJob(queryClient);
  const jobQuery = jobApi.useJob(jobId);
  const configForm = useLocalState(formState);

  const sendLoraDownlink = async () => {
    const data = createDownlinkData(
      CHIRP_STACK_COMMANDS.loraAppServerQueueDownlink,
      props.configurableDevices,
      configForm.formInputs,
    );

    const result = await deviceCommandsJobMutation.mutateAsync(data);

    setJobId(result._id);
    configForm.resetForm();
  };

  if (!props.isValidConfiguration) {
    return (
      <FlexColCenterMaxWidthWrapper>
        {props.t('phrases.invalidConfigurationDevices')}

        <Button
          margin={'20px 0 0 0'}
          width={'300px'}
          color={'green'}
          content={props.t('labels.backToDeviceList')}
          onClick={async () => props.router.push('/devices')}
        />
      </FlexColCenterMaxWidthWrapper>
    );
  }

  return (
    <FlexColCenterMaxWidthWrapper>

      {{
        [options.name]: (
          <>
            <p>Select option</p>
            <Select
              isClearable
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                configForm.setInputValue('option', evt.target.value);
              }}
              value={configForm.formInputs.option.value as string}
              options={DEFAULT_CONFIG_OPTIONS}
            />
            <ConfigurationButtonContainer>
              <Button
                content={_.capitalize(props.t('labels.cancel'))}
                ghosted
                onClick={() => {
                  props.setSelectMode(false);
                  props.setSelectedDevices([]);
                  props.setPage('default');
                }}
              />
              <Button
                disabled={!configForm.formInputs.option.validation.isValid}
                color={'green'}
                content={_.capitalize(props.t('labels.continue'))}
                onClick={props.navState.incrementCurrentStep}
              />
            </ConfigurationButtonContainer>
          </>
        ),
        [config.name]: (
          <>
            {configForm.formInputs.option.value === 'presets' && (
              <FlexColMaxWidthWrapper>
                <h4>Presets</h4>
                <p>Select downlink preset</p>

                <Select
                  isClearable
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                    configForm.setInputValue('preset', evt.target.value);
                  }}
                  value={configForm.formInputs.preset.value as string}
                  options={LORA_PRESETS}
                />
              </FlexColMaxWidthWrapper>
            )}
            {configForm.formInputs.option.value === 'custom' && (
              <FlexColMaxWidthWrapper>
                <h4>Custom</h4>
                <TextField
                  label={'fPort'}
                  additionalInfo={'FPort used (must be between 1-1000).'}
                  name={'fPort'}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => (
                    configForm.setInputValue('fPort', evt.target.value)
                  )}
                  value={configForm.formInputs.fPort.value as string}
                  margin={'0 0 10px 0'}
                />
                <TextField
                  label={'Data'}
                  additionalInfo={'Hex data to be sent.'}
                  name={'data'}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => (
                    configForm.setInputValue('data', evt.target.value)
                  )}
                  value={configForm.formInputs.data.value as string}
                  margin={'0 0 10px 0'}
                />
                <TextField
                  label={'Reference'}
                  additionalInfo='(optional) Random reference (used on ack notification).'
                  name={'reference'}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => (
                    configForm.setInputValue('reference', evt.target.value)
                  )}
                  value={configForm.formInputs.reference.value as string}
                  margin={'0 0 10px 0'}
                />
                <Select
                  label={'Confirmed'}
                  additionalInfo={'Is an ACK required from the node? Defaults to false.'}
                  name='confirmed'
                  isClearable
                  options={[
                    {label: 'True', value: true},
                    {label: 'False', value: false},
                  ]}
                  value={configForm.formInputs.confirmed.value as string}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => (
                    configForm.setInputValue('confirmed', evt.target.value)
                  )}
                />
              </FlexColMaxWidthWrapper>
            )}
            <ConfigurationButtonContainer>
              <Button
                content={_.capitalize(props.t('labels.back'))}
                ghosted
                onClick={props.navState.decrementCurrentStep}
              />
              {configForm.formInputs.option.value === 'presets' && (
                <Button
                  disabled={!configForm.formInputs.preset.validation.isValid}
                  color={'green'}
                  content={_.capitalize(props.t('labels.continue'))}
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
                  content={_.capitalize(props.t('labels.continue'))}
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
                  {/* @ts-ignore - ts bug */}
                  fPort: <b>{configForm.formInputs.fPort.value}</b>
                </FlexSpaceBetweenWrapper>
                <FlexSpaceBetweenWrapper>
                  {/* @ts-ignore - ts bug */}
                  data: <b>{configForm.formInputs.data.value}</b>
                </FlexSpaceBetweenWrapper>
                <FlexSpaceBetweenWrapper>
                  {/* @ts-ignore - ts bug */}
                  reference: <b>{configForm.formInputs.reference.value}</b>
                </FlexSpaceBetweenWrapper>
                <FlexSpaceBetweenWrapper>
                  {/* @ts-ignore - ts bug */}
                  confirmed: <b>{configForm.formInputs.confirmed.value}</b>
                </FlexSpaceBetweenWrapper>
              </FlexColWrapper>
            )}
            <ConfigurationButtonContainer>
              <Button
                content={_.capitalize(props.t('labels.back'))}
                ghosted
                onClick={props.navState.decrementCurrentStep}
              />
              <Button
                disabled={!configForm.formInputs.option.validation.isValid}
                color={'green'}
                content={_.capitalize(props.t('labels.continue'))}
                onClick={async () => {
                  await sendLoraDownlink();
                  props.navState.incrementCurrentStep();
                }}
              />
            </ConfigurationButtonContainer>
          </>
        ),
        [summary.name]: (
          <>
            {!jobQuery?.data?.isFinished
              ? <b>Sending downlinks..</b>
              : <b>Finished!</b>}
            <FlexColWrapper>
              <p>
                <b>{jobQuery?.data?.numItemsDone}</b> of {jobQuery?.data?.numItems} devices done
              </p>
              <TextSpan>{jobQuery?.data?.numSuccesses} succeeded</TextSpan>
              <TextSpan>{jobQuery?.data?.numFailures} failures</TextSpan>
            </FlexColWrapper>
            <ProgressBar
              progress={jobQuery?.data?.progressPercentage}
              margin={'50px 0 0 0'}
            />
            {!jobQuery?.data?.isFinished && (
              <p>
                Estimated time left:&nbsp;
                <b>
                  {!_.isNil(jobQuery?.data?.expectedTimeLeftText)
                    ? jobQuery?.data?.expectedTimeLeftText
                    : 'Calculating..'}
                </b>
              </p>
            )}
            <ConfigurationButtonContainer>
              <Button
                content={_.capitalize(props.t('labels.back'))}
                ghosted
                onClick={props.navState.decrementCurrentStep}
              />
              <Button
                disabled={!jobQuery?.data?.isFinished}
                color={'green'}
                content={_.capitalize(props.t('labels.finish'))}
                onClick={() => {
                  setJobId('');
                  props.setSelectMode(false);
                  props.setSelectedDevices([]);
                  props.setPage('default');
                }}
              />
            </ConfigurationButtonContainer>
          </>
        ),
      }[steps[props.navState.currentStep].name || 'STEP_NOT_FOUND']}

    </FlexColCenterMaxWidthWrapper>
  );
};

export default BaseConfiguration;
