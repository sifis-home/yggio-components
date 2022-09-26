/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import React from 'react';
import Icon from 'react-icons-kit';
import {calculator} from 'react-icons-kit/icomoon/calculator';
import {infoCircle} from 'react-icons-kit/fa/infoCircle';
import {useQueryClient} from '@tanstack/react-query';
import {compose} from 'lodash/fp';
import {NextRouter} from 'next/router';
import {Flex} from '@chakra-ui/react';

import {Calculate, Calculation, Device, Devices, Interval} from '../../../../types';
import selectors, {selectDevices} from './selectors';
import Button from '../../../../components/button';
import Select from '../../../../components/select';
import {withReselect, withLanguage} from '../../../../hocs';
import {formState, navigationState} from './state';
import TextField from '../../../../components/text-field';
import {
  CalculationContainerBox,
  CalculationIntervalContainer,
  CalculationPaneWrapper,
  CalculationParagraph,
  CalculationProgressContainer,
  CalculationSpan,
  CreateCalculationButtonContainer,
  CreateCalculationDescription,
  CreateCalculationText,
  MarginFlexColWrapper,
  StyledDatePicker,
} from './styled';
import StepProgressBar from '../../../../components/step-progress-bar';
import RadioButton from '../../../../components/radio-button';
import {isDisabledCreateCalculationButton, isDisabledDatePicker, buildSourcePath} from './utils';
import {
  CALCULATION_DESCRIPTIONS,
  CALCULATION_SETTINGS,
  CALCULATION_PRESETS,
  STEPS,
  CALCULATION_AUTOMATIC_UPDATE_TYPES,
} from './constants';
import {CALCULATION_NAMES} from '../../../../constants';
import {useFetchDevices} from '../../queries';
import {devicesApi, calculationsApi, devicesRequests} from '../../../../api';
import {getFormValues} from '../../../../utils/form-wizard';
import {useLocalState} from '../../../../hooks';

const steps = [
  {name: STEPS.calculationSetting.name, progressBarTitle: 'Setting'},
  {name: STEPS.calculationSource.name, progressBarTitle: 'Source'},
  {name: STEPS.calculationName.name, progressBarTitle: 'Description'},
  {name: STEPS.calculationInterval.name, progressBarTitle: 'Interval'},
  {name: STEPS.calculationDevice.name, progressBarTitle: 'Device'},
];


interface ProgressBarTitleProps {
  selectedDevices: string[];
  t(key: string): string;
}

const ProgressBarTitle = (props: ProgressBarTitleProps) => (
  <>
    <Icon size={16} icon={calculator as object} />
    &nbsp;
    {_.capitalize(props.t('titles.createCalculation'))}
    &nbsp;
    <CalculationSpan>
      ({_.size(props.selectedDevices)} {props.t('phrases.devicesSelected')})
    </CalculationSpan>
  </>
);

interface CalculationPaneProps {
  selectedDevices: string[];
  devices: Devices;
  router: NextRouter;
  devicePaths: {
    value: string;
    label: string;
  }[];

  t(key: string): string;
  setSelectMode(key: boolean): void;
  setSelectedDevices(key: []): void;
  setPage(key: string): void;
}

interface Source {
  sourceId: string;
  path: string;
  currentValue: object;
}

const BasicCalculationPane = (props: CalculationPaneProps) => {
  if (!_.size(props.selectedDevices)) {
    return props.router.push('/devices');
  }

  const queryClient = useQueryClient();

  const formData = useLocalState(formState);
  const navState = useLocalState(navigationState);

  const destPath = formData.formInputs.destination.value;
  const nameFilter = formData.formInputs.deviceNameFilter.value;
  const matchPattern = {name: nameFilter};
  const params = {
    filter: {matchPattern},
    key: 'calculations',
  };

  React.useEffect(() => {
    formData.setInputValue('devices', props.devices);
  }, []);

  const useCreateCalculation = calculationsApi.useCreateCalculation(queryClient);
  const useCreateDevice = devicesApi.useCreateDevice(queryClient);
  const useUpdateDevice = devicesApi.useUpdateDevice(queryClient);
  const devicesResult = useFetchDevices({params});
  const selectableDevices = selectDevices({devices: devicesResult?.data});

  //
  //
  // EVENTS
  //
  //

  const createCalculation = async () => {
    const formValues = getFormValues(formData.formInputs);
    const devices = _.pick(formValues.devices, props.selectedDevices) as Devices;
    const sources = _.map(devices, device => {
      const path = buildSourcePath(formValues.devicePath, device, device.secret);
      if (path) {
        return ({
          sourceId: device._id,
          path,
          currentValue: {} // ?
        });
      }
    });
    const calcSettings = CALCULATION_SETTINGS[
      formValues.preset as keyof typeof CALCULATION_SETTINGS
    ];
    const intervalData = {
      from: formValues.calculationTimePeriodFrom,
      to: formValues.calculationTimePeriodTo,
    };
    // eslint-disable-next-line
    const interval: Interval = intervalData.from && intervalData.to
      ? intervalData
      // FIXME:
      // @ts-ignore - TS cant seem to read CALCULATIONS_SETTINGS properly as
      // interval DOES exist in it but TS complains about it not existing there??
      : calcSettings.preset.interval;
    const automaticUpdate = formValues.automaticUpdate
      ? CALCULATION_AUTOMATIC_UPDATE_TYPES.event
      : CALCULATION_AUTOMATIC_UPDATE_TYPES.periodic;
    const calculation = {
      ...calcSettings.preset,
      interval: formValues.interval && interval,
    };

    const data: Omit<Calculation, '_id'> = {
      name: formValues.name as string,
      automaticUpdate,
      type: calcSettings.type,
      calculation: calculation as Calculate,
      sources: _.compact(sources) as Source[],
      destination: {
        mongoId: formValues.deviceSelection as string,
        path: `calculations.${formValues.customDestinationPath || 'values'}`,
      },
    };

    if (destPath === 'createNewDevice') {
      const result = await useCreateDevice.mutateAsync({
        name: formValues.createDeviceName as string,
      });
      data.destination.mongoId = result._id;
    }

    if (formValues.automaticUpdate) {
      const setupAutoUpdate = async () => {
        const deviceItems = _.map(data.sources, 'sourceId');
        const soughtDevices = devicesRequests.seek({deviceItems});
        const updatedSources = _.map(data.sources, (source: Source) => {
          const device = _.find(soughtDevices, (device: Device) => (
            device._id === source.sourceId) as Partial<Device>);
          const rabbitRouting = (_.get(device, 'rabbitRouting.value') || []) as [];
          const updates = {
            rabbitRouting: {
              value: _.uniq([
                ...rabbitRouting,
                'calculator',
                'receiver',
              ]),
            }
          };
          useUpdateDevice.mutate({updates, deviceId: source.sourceId});
        });
        await Promise.all(updatedSources);
      };
      /* eslint-disable-next-line */
      setupAutoUpdate();
    }
    useCreateCalculation.mutate({data});

    // setPage needs to be executed before setSelectedDevices to avoid error
    props.setPage('default');
    props.setSelectMode(false);
    props.setSelectedDevices([]);
  };

  const onChangeCalculation = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {target} = evt;
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value;
    formData.setInputValue(target.name, value);
  };

  return (
    <CalculationPaneWrapper>
      <CalculationProgressContainer>
        <StepProgressBar
          title={<ProgressBarTitle t={props.t} selectedDevices={props.selectedDevices} />}
          steps={_.map(steps, 'progressBarTitle')}
          currentStep={navState.currentStep + 1}
          margin={'0 0 9px 0'}
        />
      </CalculationProgressContainer>

      <CalculationContainerBox>
        {{
          [STEPS.calculationName.name]: (
            <>
              <CalculationParagraph>
                <b>{_.capitalize(props.t('titles.description'))}</b>
                <CreateCalculationText>
                  &nbsp;- {props.t('phrases.calculationDescription')}
                </CreateCalculationText>
              </CalculationParagraph>
              <TextField
                name={'name'}
                value={CALCULATION_NAMES[
                  formData.formInputs.name.value as keyof typeof CALCULATION_NAMES
                ]}
                onChange={onChangeCalculation}
                placeholder={props.t('placeholders.calculationName')}
                margin={'0 10px 20px 0'}
                maxLength={30}
              />
              <CreateCalculationButtonContainer>
                <Button
                  content={'Back'}
                  ghosted
                  onClick={navState.decrementCurrentStep}
                />
                <Button
                  disabled={!_.get(formData.formInputs, 'name.validation.isValid')}
                  color={'green'}
                  content={_.capitalize(props.t('labels.continue'))}
                  onClick={navState.incrementCurrentStep}
                />
              </CreateCalculationButtonContainer>
            </>
          ),
          [STEPS.calculationSource.name]: (
            <>
              <CreateCalculationDescription>
                {props.t('phrases.sourcePathDescription')}
              </CreateCalculationDescription>
              <CalculationParagraph>
                <b>{props.t('titles.sourcePath')}</b>
                <CreateCalculationText>
                  &nbsp;- {props.t('phrases.sourcePathText')}
                </CreateCalculationText>
              </CalculationParagraph>
              <Select
                isClearable
                width={'100%'}
                name={'devicePath'}
                placeholder={props.t('placeholders.devicePaths')}
                options={props.devicePaths}
                margin={'0 10px 20px 0'}
                value={formData.formInputs.devicePath.value as string}
                onChange={onChangeCalculation}
              />
              <CreateCalculationButtonContainer>
                <Button
                  content={_.capitalize(props.t('labels.back'))}
                  ghosted
                  onClick={navState.decrementCurrentStep}
                />
                <Button
                  disabled={!_.get(formData.formInputs, 'devicePath.validation.isValid')}
                  color={'green'}
                  content={_.capitalize(props.t('labels.continue'))}
                  onClick={navState.incrementCurrentStep}
                />
              </CreateCalculationButtonContainer>
            </>
          ),
          [STEPS.calculationSetting.name]: (
            <>
              <CreateCalculationDescription>
                {props.t('phrases.createCalculationDescription')}&nbsp;
                {props.t('phrases.calculationSettingDescription')}
              </CreateCalculationDescription>
              <CalculationParagraph>
                <b>{props.t('titles.setting')}</b>
                <CreateCalculationText>
                  &nbsp;- The predetermined calculation setting
                </CreateCalculationText>
              </CalculationParagraph>
              <Select
                isClearable
                name={'preset'}
                placeholder={props.t('placeholders.preset')}
                options={CALCULATION_PRESETS}
                margin={'0 10px 20px 0'}
                value={formData.formInputs.preset.value as string}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                  onChangeCalculation({
                    ...evt,
                    target: {...evt.target, value: evt.target.value, name: 'preset'},
                  });
                  onChangeCalculation({
                    ...evt,
                    target: {...evt.target, value: evt.target.value, name: 'name'},
                  });
                }}
              />

              <CreateCalculationDescription>
                {formData.formInputs.preset.value && <Icon icon={infoCircle as object} />}
                {CALCULATION_DESCRIPTIONS[
                  formData.formInputs.preset.value as keyof typeof CALCULATION_DESCRIPTIONS
                ]}
              </CreateCalculationDescription>

              <Flex align='center'>
                <input
                  name={'automaticUpdate'}
                  onChange={onChangeCalculation}
                  type={'checkbox'}
                  checked={!!formData.formInputs.automaticUpdate.value}
                />
                <span>Automatic update on event</span>
              </Flex>

              <CreateCalculationButtonContainer>
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
                  disabled={!_.get(formData.formInputs, 'preset.validation.isValid')}
                  color={'green'}
                  content={'Continue'}
                  onClick={navState.incrementCurrentStep}
                />
              </CreateCalculationButtonContainer>
            </>
          ),
          [STEPS.calculationInterval.name]: (
            <>
              <CalculationParagraph>
                <b>{props.t('titles.interval')}</b>
                <CreateCalculationText>
                  &nbsp;- {props.t('phrases.calculationIntervalText')}
                  &nbsp; {
                    isDisabledDatePicker(formData.formInputs) && (
                      `(${props.t('phrases.calculationIntervalDisabled')})`
                    )
                  }
                </CreateCalculationText>
              </CalculationParagraph>
              {!isDisabledDatePicker(formData.formInputs) && (
                <Flex align='center'>
                  <input
                    name={'interval'}
                    onChange={onChangeCalculation}
                    type={'checkbox'}
                    checked={!!formData.formInputs.interval.value}
                  />
                  <span>Interval activation</span>
                </Flex>
              )}
              <MarginFlexColWrapper>
                <CalculationIntervalContainer>
                  <StyledDatePicker
                    margin={'0 10px 0'}
                    disabled={isDisabledDatePicker(formData.formInputs) || !_.get(formData.formInputs, 'interval.value')}
                    name={'calculationTimePeriodFrom'}
                    value={_.get(formData.formInputs, 'calculationTimePeriodFrom.value')}
                    onChange={onChangeCalculation}
                  />
                  <StyledDatePicker
                    margin={'0 10px 0'}
                    disabled={isDisabledDatePicker(formData.formInputs) || !_.get(formData.formInputs, 'interval.value')}
                    name={'calculationTimePeriodTo'}
                    value={_.get(formData.formInputs, 'calculationTimePeriodTo.value')}
                    onChange={onChangeCalculation}
                  />
                </CalculationIntervalContainer>
              </MarginFlexColWrapper>
              <CreateCalculationButtonContainer>
                <Button
                  content={_.capitalize(props.t('labels.back'))}
                  ghosted
                  onClick={navState.decrementCurrentStep}
                />
                <Button
                  disabled={!_.get(formData.formInputs, 'preset.value')}
                  color={'green'}
                  content={_.capitalize(props.t('labels.continue'))}
                  onClick={navState.incrementCurrentStep}
                />
              </CreateCalculationButtonContainer>
            </>
          ),
          [STEPS.calculationDevice.name]: (
            <>
              <CalculationParagraph>
                <b>{props.t('titles.destination')}</b>
                <CreateCalculationText>
                  &nbsp;- {props.t('phrases.calculationDestinationText')}
                </CreateCalculationText>
              </CalculationParagraph>
              {/* @ts-ignore - don't understand why this triggers error */}
              <Flex w='30%' justify='space-between'>
                <Flex>
                  <RadioButton
                    isSelected={formData.formInputs.destination.value === 'createNewDevice'}
                    onClick={() => formData.setInputValue('destination', 'createNewDevice')}
                  />
                  &nbsp;
                  <CalculationSpan>{_.capitalize(props.t('labels.newDevice'))}</CalculationSpan>
                </Flex>

                <Flex>
                  <RadioButton
                    isSelected={formData.formInputs.destination.value === 'saveToDevice'}
                    onClick={() => formData.setInputValue('destination', 'saveToDevice')}
                  />
                  &nbsp;
                  <CalculationSpan>{_.capitalize(props.t('labels.existingDevice'))}</CalculationSpan>
                </Flex>
              </Flex>

              {formData.formInputs.destination.value === 'saveToDevice' && (
                <>
                  <CreateCalculationDescription>
                    {props.t('phrases.calculationDeviceSearchDescription')}
                  </CreateCalculationDescription>

                  <CalculationParagraph>
                    <b>{props.t('titles.deviceSelection')}</b>
                    <CreateCalculationText>
                      &nbsp;- {props.t('phrases.calculationDeviceSearchText')}
                    </CreateCalculationText>
                  </CalculationParagraph>
                  <TextField
                    name={'deviceNameFilter'}
                    value={formData.formInputs.deviceNameFilter.value as string}
                    onChange={onChangeCalculation}
                    placeholder={props.t('placeholders.deviceNameFilter')}
                    margin={'0 10px 20px 0'}
                    maxLength={50}
                  />
                  <Select
                    name={'deviceSelection'}
                    placeholder={props.t('placeholders.selectDevice')}
                    options={selectableDevices}
                    margin={'0 10px 20px 0'}
                    value={formData.formInputs.deviceSelection.value as string}
                    onChange={onChangeCalculation}
                  />
                </>
              )}

              {formData.formInputs.destination.value === 'createNewDevice' && (
                <>
                  <CalculationParagraph>
                    <b>{props.t('titles.deviceName')}</b>
                    <CreateCalculationText>
                      &nbsp;- {props.t('phrases.calculatedDeviceName')}
                    </CreateCalculationText>
                  </CalculationParagraph>
                  <TextField
                    name={'createDeviceName'}
                    value={formData.formInputs.createDeviceName.value as string}
                    onChange={onChangeCalculation}
                    placeholder={props.t('placeholders.newDeviceName')}
                    margin={'0 10px 20px 0'}
                    maxLength={50}
                  />
                </>
              )}

              {(formData.formInputs.destination.value === 'createNewDevice' || formData.formInputs.destination.value === 'saveToDevice') && (
                <>
                  <CalculationParagraph>
                    <b>{props.t('titles.destinationPath')}</b>
                    <CreateCalculationText>
                      &nbsp;- {props.t('phrases.calculationDestinationPath')}
                    </CreateCalculationText>
                  </CalculationParagraph>
                  <TextField
                    isRequired
                    name={'customDestinationPath'}
                    value={formData.formInputs.customDestinationPath.value as string}
                    onChange={onChangeCalculation}
                    placeholder={props.t('placeholders.customDevicePath')}
                    margin={'0 10px 20px 0'}
                  />
                </>
              )}
              <CreateCalculationButtonContainer>
                <Button
                  content={_.capitalize(props.t('labels.back'))}
                  ghosted
                  onClick={navState.decrementCurrentStep}
                />
                <Button
                  color={'green'}
                  disabled={isDisabledCreateCalculationButton(formData.formInputs)}
                  onClick={createCalculation}
                  content={_.capitalize(props.t('labels.submit'))}
                  width={'150px'}
                  margin={'10px'}
                />
              </CreateCalculationButtonContainer>
            </>
          ),
          // eslint-disable-next-line no-useless-computed-key
          ['STEP_NOT_FOUND']: (
            <div>NOT FOUND</div>
          ),
        }[steps[navState.currentStep].name || 'STEP_NOT_FOUND']}


      </CalculationContainerBox>
    </CalculationPaneWrapper>
  );
};

const CalculationPane = compose(
  withReselect(selectors),
  withLanguage()
)(BasicCalculationPane);

export default CalculationPane;
