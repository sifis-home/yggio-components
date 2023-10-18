import _ from 'lodash';
import React from 'react';
import {MdInfoOutline as InfoIcon} from 'react-icons/md';
import {useQueryClient, useQueries} from '@tanstack/react-query';
import {Flex} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';

import {Calculate, Calculation, Device, Devices, Interval} from '../../../../types';
import selectors, {selectDevicePaths} from './selectors';
import Button from '../../../../components/button';
import Select from '../../../../components/select';
import {withReselect} from '../../../../hocs'; // TODO: This is depricated
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
import {isDisabledDatePicker, buildSourcePath} from './utils';
import {
  CALCULATION_DESCRIPTIONS,
  CALCULATION_SETTINGS,
  CALCULATION_PRESETS,
  STEPS,
  CALCULATION_AUTOMATIC_UPDATE_TYPES,
} from './constants';
import {CALCULATION_NAMES} from '../../../../constants';
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
  setIsInSelectMode(key: boolean): void;
  setSelectedDevices(key: []): void;
  setPage(key: string): void;
}

type DevicePaths = {
  value: string;
  label: string;
}[];

interface Source {
  sourceId: string;
  path: string;
  currentValue: object;
}

const BasicCalculationPane = (props: CalculationPaneProps) => {
  const queryClient = useQueryClient();

  const formData = useLocalState(formState);
  const navState = useLocalState(navigationState);

  const {t} = useTranslation();

  React.useEffect(() => {
    formData.setInputValue('devices', props.devices);
  }, []);

  const fieldsQueries = useQueries({
    queries: _.map(props.selectedDevices, deviceId => ({
      queryKey: ['statisticsFields', deviceId],
      queryFn: async () => devicesRequests.getStatisticsFields(deviceId),
      refetchOnWindowFocus: false,
    }))
  });
  const useCreateCalculation = calculationsApi.useCreateCalculation(queryClient);
  const useCreateDevice = devicesApi.useCreateDevice(queryClient);
  const useUpdateDevice = devicesApi.useUpdateDevice(queryClient);
  const devicePaths = selectDevicePaths({
    selectedDevices: props.selectedDevices,
    devices: props.devices,
    fields: fieldsQueries,
  }) as DevicePaths;

  //
  //
  // EVENTS
  //
  //

  const createCalculation = async () => {
    const formValues = getFormValues(formData.formInputs);
    const devices = _.filter(formValues.devices as Devices, device => (
      _.includes(props.selectedDevices, device._id)
    ));
    const sources = _.map(devices, device => {
      const path = buildSourcePath({
        path: formValues.devicePath as string,
        isGeneric: device.secret,
      });
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
        path: 'calculations',
      },
    };

    const result = await useCreateDevice.mutateAsync({
      name: formValues.createDeviceName as string,
    });
    data.destination.mongoId = result._id;

    if (formValues.automaticUpdate) {
      const setupAutoUpdate = async () => {
        const deviceItems = _.map(data.sources, 'sourceId');
        const soughtDevices = devicesRequests.seek({deviceItems});
        const updatedSources = _.map(data.sources, (source: Source) => {
          const device = _.find(soughtDevices, (device: Device) => (
            device._id === source.sourceId
          )) as Partial<Device>;
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
    props.setIsInSelectMode(false);
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
          title={<ProgressBarTitle t={t} selectedDevices={props.selectedDevices} />}
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
                <b>{_.capitalize(t('titles.description'))}</b>
                <CreateCalculationText>
                  &nbsp;- {t('phrases.calculationDescription')}
                </CreateCalculationText>
              </CalculationParagraph>
              <TextField
                name={'name'}
                value={CALCULATION_NAMES[
                  formData.formInputs.name.value as keyof typeof CALCULATION_NAMES
                ]}
                onChange={onChangeCalculation}
                placeholder={t('placeholders.calculationName')}
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
                  content={_.capitalize(t('labels.continue'))}
                  onClick={navState.incrementCurrentStep}
                />
              </CreateCalculationButtonContainer>
            </>
          ),
          [STEPS.calculationSource.name]: (
            <>
              <CreateCalculationDescription>
                {t('phrases.sourcePathDescription')}
              </CreateCalculationDescription>
              <CalculationParagraph>
                <b>{t('titles.sourcePath')}</b>
                <CreateCalculationText>
                  &nbsp;- {t('phrases.sourcePathText')}
                </CreateCalculationText>
              </CalculationParagraph>
              <Select
                isClearable
                width={'100%'}
                name={'devicePath'}
                placeholder={t('placeholders.devicePaths')}
                options={devicePaths}
                margin={'0 10px 20px 0'}
                value={formData.formInputs.devicePath.value as string}
                onChange={onChangeCalculation}
              />
              <CreateCalculationButtonContainer>
                <Button
                  content={_.capitalize(t('labels.back'))}
                  ghosted
                  onClick={navState.decrementCurrentStep}
                />
                <Button
                  disabled={!_.get(formData.formInputs, 'devicePath.validation.isValid')}
                  color={'green'}
                  content={_.capitalize(t('labels.continue'))}
                  onClick={navState.incrementCurrentStep}
                />
              </CreateCalculationButtonContainer>
            </>
          ),
          [STEPS.calculationSetting.name]: (
            <>
              <CreateCalculationDescription>
                {t('phrases.createCalculationDescription')}&nbsp;
                {t('phrases.calculationSettingDescription')}
              </CreateCalculationDescription>
              <CalculationParagraph>
                <b>{t('titles.setting')}</b>
                <CreateCalculationText>
                  &nbsp;- The predetermined calculation setting
                </CreateCalculationText>
              </CalculationParagraph>
              <Select
                isClearable
                name={'preset'}
                placeholder={t('placeholders.preset')}
                options={CALCULATION_PRESETS}
                margin={'0 10px 20px 0'}
                value={formData.formInputs.preset.value as string}
                onChange={evt => {
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
                {formData.formInputs.preset.value && <InfoIcon size={20} style={{marginRight: '4px'}} />}
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
                  content={_.capitalize(t('labels.cancel'))}
                  ghosted
                  onClick={() => props.setPage('default')}
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
                <b>{t('titles.interval')}</b>
                <CreateCalculationText>
                  &nbsp;- {t('phrases.calculationIntervalText')}
                  &nbsp; {
                    isDisabledDatePicker(formData.formInputs) && (
                      `(${t('phrases.calculationIntervalDisabled')})`
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
                    value={formData.formInputs.calculationTimePeriodFrom.value as string}
                    onChange={onChangeCalculation}
                  />
                  <StyledDatePicker
                    margin={'0 10px 0'}
                    disabled={isDisabledDatePicker(formData.formInputs) || !_.get(formData.formInputs, 'interval.value')}
                    name={'calculationTimePeriodTo'}
                    value={formData.formInputs.calculationTimePeriodFrom.value as string}
                    onChange={onChangeCalculation}
                  />
                </CalculationIntervalContainer>
              </MarginFlexColWrapper>
              <CreateCalculationButtonContainer>
                <Button
                  content={_.capitalize(t('labels.back'))}
                  ghosted
                  onClick={navState.decrementCurrentStep}
                />
                <Button
                  disabled={!_.get(formData.formInputs, 'preset.value')}
                  color={'green'}
                  content={_.capitalize(t('labels.continue'))}
                  onClick={navState.incrementCurrentStep}
                />
              </CreateCalculationButtonContainer>
            </>
          ),
          [STEPS.calculationDevice.name]: (
            <>
              <CalculationParagraph>
                <b>{t('titles.deviceName')}</b>
                <CreateCalculationText>
                  &nbsp;- {t('phrases.calculatedDeviceName')}
                </CreateCalculationText>
              </CalculationParagraph>
              <TextField
                name={'createDeviceName'}
                value={formData.formInputs.createDeviceName.value as string}
                onChange={onChangeCalculation}
                placeholder={t('placeholders.newDeviceName')}
                margin={'0 10px 20px 0'}
                maxLength={50}
              />
              <CreateCalculationButtonContainer>
                <Button
                  content={_.capitalize(t('labels.back'))}
                  ghosted
                  onClick={navState.decrementCurrentStep}
                />
                <Button
                  color={'green'}
                  disabled={!formData.formInputs.createDeviceName.value}
                  onClick={createCalculation}
                  content={_.capitalize(t('labels.submit'))}
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

const CalculationPane = withReselect(selectors)(BasicCalculationPane);

export default CalculationPane;
