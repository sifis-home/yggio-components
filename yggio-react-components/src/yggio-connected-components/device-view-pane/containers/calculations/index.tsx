/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {useQueryClient} from '@tanstack/react-query';
import {NextRouter} from 'next/router';
import {format, parseISO} from 'date-fns';
import {useTranslation} from 'react-i18next';
import {FaTrash as TrashIcon} from 'react-icons/fa';

import {
  FlexColMaxWidthWrapper,
  FlexColWrapper,
  FlexMaxWidthWrapper,
  FlexWrapper,
} from '../../../../global/styled';
import Select from '../../../../components/select';
import {
  CalculationRemovalContainer,
  CalculationWrapper,
  CalculationDataTable,
  CalculationDataHeader,
  CalculationDataItem,
  CalculationDataItemLink,
  NoDataBox,
} from '../../styled';
import {CALCULATIONS_TYPES, CALCULATION_NAMES} from '../../../../constants';
import {
  IdKeyedCalculations,
  CalculationValue,
  Device,
  Calculation,
  Calculations,
} from '../../../../types';
import {
  calculationsApi,
  devicesApi
} from '../../../../api';
import {
  selectAvailableCalculations,
  selectCalculatedValues,
} from '../../selectors';
import {useLocalState} from '../../../../hooks';
import {calculationFormState} from '../../state';
import {CalculatedValues, CalculatedValue} from '../../types';


interface CalculateProps {
  router: NextRouter;
  device: Device;
  calculations?: IdKeyedCalculations;
  calculationsItems: Calculations;
}

const Calculate = (props: CalculateProps) => {
  const {t} = useTranslation();

  const queryClient = useQueryClient();
  const updateDeviceMutation = devicesApi.useUpdateDevice(queryClient);

  const [performedCalculation, setPerformedCalculation] = React.useState(0);
  const calculationForm = useLocalState(calculationFormState);
  const selectedCalculation = calculationForm.formInputs.selectedCalculation.value as string;
  const currentCalculation = props.calculations?.[selectedCalculation];

  const {
    mutateAsync: mutatePerformCalculations,
  } = calculationsApi.usePerformCalculations(queryClient);

  const {
    mutate: mutateRemoveCalculation,
  } = calculationsApi.useRemoveCalculation(queryClient);

  React.useEffect(() => {
    if (currentCalculation) {
      const updates = {
        [currentCalculation.destination.path]: performedCalculation
      };
      updateDeviceMutation.mutate({updates, deviceId: props.device._id});
    }
  }, [performedCalculation, currentCalculation]);

  React.useEffect(() => {
    _.each(props.calculationsItems, async cal => {
      const mutation = await mutatePerformCalculations({
        calculationId: cal._id,
        calcType: cal.calculation.calcType,
        interval: cal.calculation.interval,
      });
      setPerformedCalculation(mutation.result);
    });
  }, []);

  const calculatedValues = selectCalculatedValues({
    device: props.device,
    calculations: props.calculations,
    formInputs: calculationForm.formInputs,
  });

  const selectableCalculations = selectAvailableCalculations({
    device: props.device,
    calculations: props.calculations,
  });

  return (
    <FlexColWrapper>
      <FlexWrapper>
        {_.isEmpty(selectableCalculations) && (
          <NoDataBox>{t('phrases.noCalculationsAvailable')}</NoDataBox>
        )}
        {!_.isEmpty(selectableCalculations) && (
          <div>
            <Select
              width={'220px'}
              name={'selectedCalculation'}
              options={selectableCalculations}
              value={selectedCalculation}
              onChange={evt => (
                calculationForm.setInputValue('selectedCalculation', evt.target.value)
              )}
            />
          </div>
        )}

        {
          !_.isEmpty(selectableCalculations) && (
            <CalculationRemovalContainer
              onClick={() => {
                mutateRemoveCalculation(selectedCalculation);
                calculationForm.setInputValue('selectedCalculation', '');
              }}
            >
              <TrashIcon size={26} />
            </CalculationRemovalContainer>
          )
        }
      </FlexWrapper>

      <br />
      {
        calculationForm.formInputs.selectedCalculation.value && (
          <CalculationWrapper>
            <FlexColMaxWidthWrapper
              // @ts-ignore - don't understand why this triggers error
              margin={'0 0 5px'}
            >
              <div>
                <b>{_.capitalize(t('titles.description'))}:</b> {CALCULATION_NAMES[currentCalculation!.name as keyof typeof CALCULATION_NAMES]}
              </div>
              <div>
                <b>{_.capitalize(t('common.devices'))}:</b> {_.size(currentCalculation!.sources)}
              </div>
              <div><b>{_.capitalize(t('titles.data'))}:</b></div>
            </FlexColMaxWidthWrapper>
            <FlexColMaxWidthWrapper>
              {_.isEmpty(calculatedValues) && (
                <NoDataBox>{t('phrases.noCalculatedValuesAvailable')}</NoDataBox>
              )}

              {
                !_.isEmpty(calculatedValues) && (
                  <CalculationData
                    t={t}
                    router={props.router}
                    calculatedValues={calculatedValues}

                    currentCalculation={currentCalculation!}
                  />
                )
              }
            </FlexColMaxWidthWrapper>
          </CalculationWrapper>
        )
      }
    </FlexColWrapper>
  );
};

interface CalculationDataProps {
  router: NextRouter;
  currentCalculation: Calculation;
  calculatedValues: CalculatedValues;
  t(key: string): string;
}

const CalculationData = (props: CalculationDataProps) => {
  if (_.some([
    props.currentCalculation.type === CALCULATIONS_TYPES.minLastValues,
    props.currentCalculation.type === CALCULATIONS_TYPES.maxLastValues,
    props.currentCalculation.type === CALCULATIONS_TYPES.sumLastValues,
    props.currentCalculation.type === CALCULATIONS_TYPES.averageLastValues,
    props.currentCalculation.type === CALCULATIONS_TYPES.aggregatedValueOverTime,
    props.currentCalculation.type === CALCULATIONS_TYPES.totalMonthlySum,
    props.currentCalculation.type === CALCULATIONS_TYPES.averageAggregatedValueOverTime,
  ])) {

    return (
      // @ts-ignore - don't understand why this triggers error
      <FlexMaxWidthWrapper padding={'10px 0 0'}>
        {_.map(_.omit(props.calculatedValues, 'id'), (val: number) => {
          if (_.isNumber(val)) {
            return (
              <div key={val}>
                {val.toFixed(2)}
              </div>
            );
          }

          return (
            <div key={val}>
              No value available
            </div>
          );
        })}
      </FlexMaxWidthWrapper>
    );
  }

  if (_.some([
    props.currentCalculation.type === CALCULATIONS_TYPES.sumEachNode,
    props.currentCalculation.type === CALCULATIONS_TYPES.averageEachNode,
  ])) {
    return (
      // @ts-ignore - don't understand why this triggers error
      <FlexColMaxWidthWrapper margin={'30px 0 0'}>
        {
          _.map(_.omit(props.calculatedValues, 'id'), (val, i) => (
            <CalculationDataTable key={i}>
              <CalculationDataHeader>Device</CalculationDataHeader>
              <CalculationDataHeader>Value</CalculationDataHeader>
              <CalculationDataHeader>From</CalculationDataHeader>
              <CalculationDataHeader>To</CalculationDataHeader>
              {
                _.map(_.omit(val, 'id'), ({value, from, to}: CalculatedValue, id) => {
                  if (_.isUndefined(value)) {
                    return (
                      <React.Fragment key={id}>
                        <CalculationDataItem>{id}</CalculationDataItem>
                        <CalculationDataItem>No value available</CalculationDataItem>
                        <CalculationDataItem>-</CalculationDataItem>
                        <CalculationDataItem>-</CalculationDataItem>
                      </React.Fragment>
                    );
                  }
                  return (
                    <React.Fragment key={id}>
                      <CalculationDataItemLink
                        onClick={async () => await props.router.push(`/devices/${id}`)}
                      >
                        {_.truncate(_.get(_.get(props, `devices.${id}`), 'name', id), {length: 16})}
                      </CalculationDataItemLink>
                      <CalculationDataItem>{value.toFixed(2)}</CalculationDataItem>
                      <CalculationDataItem>{from && format(parseISO(from), 'yyyy-MM-dd')}</CalculationDataItem>
                      <CalculationDataItem>{to && format(parseISO(to), 'yyyy-MM-dd')}</CalculationDataItem>
                    </React.Fragment>
                  );
                })
              }
            </CalculationDataTable>
          ))
        }
      </FlexColMaxWidthWrapper>
    );
  }

  if (_.some([
    props.currentCalculation.type === CALCULATIONS_TYPES.monthlySumPerEachNode,
    props.currentCalculation.type === CALCULATIONS_TYPES.monthlyDiffFromTotalEachNode,
  ])) {
    return (
      // @ts-ignore - don't understand why this triggers error
      <FlexColMaxWidthWrapper margin={'30px 0 0'}>
        {_.map(_.omit(props.calculatedValues, 'id'), (val, key) => (
          <CalculationDataTable key={key}>
            <CalculationDataHeader>Device</CalculationDataHeader>
            <CalculationDataHeader>Value</CalculationDataHeader>
            <CalculationDataHeader>From</CalculationDataHeader>
            <CalculationDataHeader>To</CalculationDataHeader>
            {_.map(
              val as unknown as {calculations: CalculatedValues},
              (curr: CalculatedValue, id: string) => {
                if (_.isPlainObject(curr)) {
                  return <React.Fragment key={id}>
                    <CalculationDataItemLink
                      onClick={async () => await props.router.push(`/devices/${id}`)}
                    >
                      {_.truncate(_.get(_.get(props, `devices.${id}`), 'name', id), {length: 16})}
                    </CalculationDataItemLink>
                    <CalculationDataItem>{curr.value.toFixed(2)}</CalculationDataItem>
                    <CalculationDataItem>{curr.from && format(parseISO(curr.from), 'yyyy-MM-dd')}</CalculationDataItem>
                    <CalculationDataItem>{curr.to && format(parseISO(curr.to), 'yyyy-MM-dd')}</CalculationDataItem>
                  </React.Fragment>;
                }
                if (_.isArray(curr)) {
                  return _.map(curr, ({value, from, to}: CalculatedValue, key) => (
                    <React.Fragment key={key}>
                      <CalculationDataItemLink
                        onClick={async () => await props.router.push(`/devices/${id}`)}
                      >
                        {_.truncate(_.get(_.get(props, `devices.${id}`), 'name', id), {length: 16})}
                      </CalculationDataItemLink>
                      <CalculationDataItem>{value.toFixed(2)}</CalculationDataItem>
                      <CalculationDataItem>{from && format(parseISO(from), 'yyyy-MM-dd')}</CalculationDataItem>
                      <CalculationDataItem>{to && format(parseISO(to), 'yyyy-MM-dd')}</CalculationDataItem>
                    </React.Fragment>
                  ));
                }
              }
            )}
          </CalculationDataTable>
        ))}
      </FlexColMaxWidthWrapper>
    );
  }

  if (props.currentCalculation.type === CALCULATIONS_TYPES.monthlyDiffFromTotal) {
    return (
      // @ts-ignore - don't understand why this triggers error
      <FlexColMaxWidthWrapper margin={'30px 0 0'}>
        {_.map(_.omit(props.calculatedValues, 'id'), (val, key: string) => (
          // @ts-ignore - don't understand why this triggers error
          <CalculationDataTable key={key} columnSize={5}>
            <CalculationDataHeader>Device</CalculationDataHeader>
            <CalculationDataHeader>Value</CalculationDataHeader>
            <CalculationDataHeader>Date</CalculationDataHeader>
            <CalculationDataHeader>From</CalculationDataHeader>
            <CalculationDataHeader>To</CalculationDataHeader>
            {_.map(_.omit(val, 'id'), (curr: CalculatedValue, deviceId) => {
              if (_.isArray(curr)) {
                return _.map(curr, (v: CalculationValue) => (
                  <React.Fragment key={v.id}>
                    <CalculationDataItemLink
                      onClick={async () => await props.router.push(`/devices/${deviceId}`)}
                    >
                      {_.truncate(_.get(_.get(props, `devices.${key}`), 'name', key), {length: 16})}
                    </CalculationDataItemLink>
                    <CalculationDataItem>{v.value.toFixed(2)}</CalculationDataItem>
                    <CalculationDataItem>{format(parseISO(v.date), 'yyyy-MM-dd hh:mm')}</CalculationDataItem>
                    <CalculationDataItem>{format(parseISO(v.from), 'yyyy-MM-dd')}</CalculationDataItem>
                    <CalculationDataItem>{format(parseISO(v.to), 'yyyy-MM-dd')}</CalculationDataItem>
                  </React.Fragment>
                ));
              }
              if (_.isPlainObject(curr)) {
                const currentDevice = _.get(props, `devices.${key}`);
                const deviceName = _.get(currentDevice, 'name', key);
                return (
                  <React.Fragment key={curr.id}>
                    <CalculationDataItemLink
                      onClick={async () => await props.router.push(`/devices/${deviceId}`)}
                    >
                      {_.truncate(deviceName, {length: 16})}
                    </CalculationDataItemLink>
                    <CalculationDataItem>{curr.value.toFixed(2)}</CalculationDataItem>
                    <CalculationDataItem>{format(parseISO(curr.date), 'yyyy-MM-dd hh:mm')}</CalculationDataItem>
                    <CalculationDataItem>{format(parseISO(curr.from), 'yyyy-MM-dd')}</CalculationDataItem>
                    <CalculationDataItem>{format(parseISO(curr.to), 'yyyy-MM-dd')}</CalculationDataItem>
                  </React.Fragment>
                );
              }
            })}
          </CalculationDataTable>
        ))}
      </FlexColMaxWidthWrapper>
    );
  }

  return <NoDataBox>{props.t('phrases.noCalculatedValuesAvailable')}</NoDataBox>;
};

export default Calculate;
