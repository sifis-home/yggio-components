/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {UseQueryResult} from '@tanstack/react-query';

import {
  getValidationErrorMessage,
  getValidationSuccessMessage,
} from '../../../../utils/form-wizard';
import {
  ACTIVATION_TYPE_OPTIONS,
  CLASS_TYPE_OPTIONS,
  NETMORE_LORAWAN_VERSION_OPTIONS,
  THINGPARK_LORAWAN_VERSION_OPTIONS,
  EXTERNAL_JOIN_SERVER_OPTIONS,
} from './constants';
import {LORA_INPUTS} from '../constants';
import {onInputChange, onInputChangeUpperCase, onInputBlur} from '../events';
import {onConnectorChange} from './events';
import {Form, NetmorePriceModel, ActilityThingParkConnectivityPlan} from '../../../../types';
import {ConnectorOption} from './types';
import {ConnectorInputValue} from '../types';

import Select from '../../../../components/select';
import TextField from '../../../../components/text-field';
import SegmentedControl from '../../../../components/segmented-control';

interface InputsProps {
  form: Form,
  connectorOptions: ConnectorOption[];
  activeLoraInputs: string[];
  fetchPriceModelsResult: UseQueryResult<NetmorePriceModel[], unknown>;
  fetchConnectivityPlansResult: UseQueryResult<ActilityThingParkConnectivityPlan[], unknown>;
}

const Inputs = (props: InputsProps) => {
  return (
    <>
      {_.includes(props.activeLoraInputs, LORA_INPUTS.connector.name) && (
        <Select
          label={LORA_INPUTS.connector.label}
          options={props.connectorOptions}
          isDisabled={!props.connectorOptions.length}
          value={(props.form.formInputs.connector.value as ConnectorInputValue).deviceId}
          fullHeight
          name={LORA_INPUTS.connector.name}
          margin={'0 0 15px 0'}
          additionalInfo={LORA_INPUTS.connector.info}
          onChange={evt => onConnectorChange(props.connectorOptions, evt, props.form.setInputValue)}
          validationErrorMessage={getValidationErrorMessage(
            props.form.formInputs[LORA_INPUTS.connector.name]
          )}
        />
      )}
      {_.includes(props.activeLoraInputs, LORA_INPUTS.activationType.name) && (
        <Select
          label={LORA_INPUTS.activationType.label}
          options={ACTIVATION_TYPE_OPTIONS}
          onChange={evt => onInputChange(props.form, evt)}
          fullHeight
          value={props.form.formInputs[LORA_INPUTS.activationType.name].value as string}
          name={LORA_INPUTS.activationType.name}
          margin={'0 0 15px 0'}
          additionalInfo={LORA_INPUTS.activationType.info}
          validationErrorMessage={getValidationErrorMessage(
            props.form.formInputs[LORA_INPUTS.activationType.name]
          )}
        />
      )}
      {_.includes(props.activeLoraInputs, LORA_INPUTS.devEui.name) && (
        <TextField
          label={LORA_INPUTS.devEui.label}
          value={props.form.formInputs[LORA_INPUTS.devEui.name].value as string}
          onChange={evt => onInputChangeUpperCase(props.form, evt)}
          onBlur={evt => onInputBlur(props.form, evt)}
          name={LORA_INPUTS.devEui.name}
          fullHeight
          maxLength={16}
          margin={'0 0 15px 0'}
          additionalInfo={LORA_INPUTS.devEui.info}
          validationErrorMessage={getValidationErrorMessage(
            props.form.formInputs[LORA_INPUTS.devEui.name]
          )}
          validationSuccessMessage={getValidationSuccessMessage(
            props.form.formInputs[LORA_INPUTS.devEui.name]
          )}
        />
      )}
      {_.includes(props.activeLoraInputs, LORA_INPUTS.appKey.name) && (
        <TextField
          label={LORA_INPUTS.appKey.label}
          value={props.form.formInputs[LORA_INPUTS.appKey.name].value as string}
          onChange={evt => onInputChangeUpperCase(props.form, evt)}
          onBlur={evt => onInputBlur(props.form, evt)}
          name={LORA_INPUTS.appKey.name}
          margin={'0 0 15px 0'}
          fullHeight
          maxLength={32}
          additionalInfo={LORA_INPUTS.appKey.info}
          validationErrorMessage={getValidationErrorMessage(
            props.form.formInputs[LORA_INPUTS.appKey.name]
          )}
          validationSuccessMessage={getValidationSuccessMessage(
            props.form.formInputs[LORA_INPUTS.appKey.name]
          )}
        />
      )}
      {_.includes(props.activeLoraInputs, LORA_INPUTS.appEui.name) && (
        <TextField
          label={LORA_INPUTS.appEui.label}
          value={props.form.formInputs[LORA_INPUTS.appEui.name].value as string}
          onChange={evt => onInputChangeUpperCase(props.form, evt)}
          onBlur={evt => onInputBlur(props.form, evt)}
          name={LORA_INPUTS.appEui.name}
          margin={'0 0 15px 0'}
          fullHeight
          maxLength={16}
          additionalInfo={LORA_INPUTS.appEui.info}
          validationErrorMessage={getValidationErrorMessage(
            props.form.formInputs[LORA_INPUTS.appEui.name]
          )}
          validationSuccessMessage={getValidationSuccessMessage(
            props.form.formInputs[LORA_INPUTS.appEui.name]
          )}
        />
      )}
      {_.includes(props.activeLoraInputs, LORA_INPUTS.classType.name) && (
        <Select
          label={LORA_INPUTS.classType.label}
          options={CLASS_TYPE_OPTIONS}
          value={props.form.formInputs[LORA_INPUTS.classType.name].value as string}
          onChange={evt => onInputChange(props.form, evt)}
          fullHeight
          name={LORA_INPUTS.classType.name}
          margin={'0 0 15px 0'}
          additionalInfo={LORA_INPUTS.classType.info}
          validationErrorMessage={getValidationErrorMessage(
            props.form.formInputs[LORA_INPUTS.classType.name]
          )}
        />
      )}
      {_.includes(props.activeLoraInputs, LORA_INPUTS.priceModel.name) && (
        <Select
          label={LORA_INPUTS.priceModel.label}
          options={_.map(props.fetchPriceModelsResult.data, model => ({
            value: model.compositeCode,
            label: model.name,
          }))}
          value={props.form.formInputs[LORA_INPUTS.priceModel.name].value as string}
          onChange={evt => onInputChange(props.form, evt)}
          fullHeight
          placeholder={(() => {
            if (props.fetchPriceModelsResult.isLoading) return 'Fetching price models...';
            if (props.fetchPriceModelsResult.isError) return 'Failed to fetch price models';
            return 'Select...';
          })()}
          name={LORA_INPUTS.priceModel.name}
          isDisabled={!props.fetchPriceModelsResult.isSuccess}
          margin={'0 0 15px 0'}
          additionalInfo={LORA_INPUTS.priceModel.info}
          validationErrorMessage={getValidationErrorMessage(
            props.form.formInputs[LORA_INPUTS.priceModel.name]
          )}
        />
      )}
      {_.includes(props.activeLoraInputs, LORA_INPUTS.netmoreLorawanVersion.name) && (
        <Select
          label={LORA_INPUTS.netmoreLorawanVersion.label}
          options={NETMORE_LORAWAN_VERSION_OPTIONS}
          value={props.form.formInputs[LORA_INPUTS.netmoreLorawanVersion.name].value as string}
          onChange={evt => onInputChange(props.form, evt)}
          fullHeight
          name={LORA_INPUTS.netmoreLorawanVersion.name}
          margin={'0 0 15px 0'}
          helperText='(!) Please make sure this is accurate as an incorrect version may cause problems.'
          additionalInfo={LORA_INPUTS.netmoreLorawanVersion.info}
          validationErrorMessage={getValidationErrorMessage(
            props.form.formInputs[LORA_INPUTS.netmoreLorawanVersion.name]
          )}
        />
      )}
      {_.includes(props.activeLoraInputs, LORA_INPUTS.thingParkLorawanVersion.name) && (
        <Select
          label={LORA_INPUTS.thingParkLorawanVersion.label}
          options={THINGPARK_LORAWAN_VERSION_OPTIONS}
          value={props.form.formInputs[LORA_INPUTS.thingParkLorawanVersion.name].value as string}
          onChange={evt => onInputChange(props.form, evt)}
          fullHeight
          name={LORA_INPUTS.thingParkLorawanVersion.name}
          margin={'0 0 15px 0'}
          additionalInfo={LORA_INPUTS.thingParkLorawanVersion.info}
          helperText='(!) Please make sure this is accurate as an incorrect version may cause problems.'
          validationErrorMessage={getValidationErrorMessage(
            props.form.formInputs[LORA_INPUTS.thingParkLorawanVersion.name]
          )}
        />
      )}
      {_.includes(props.activeLoraInputs, LORA_INPUTS.externalJoinServer.name) && (
        <SegmentedControl
          options={EXTERNAL_JOIN_SERVER_OPTIONS}
          onChange={value => props.form.setInputValue('externalJoinServer', value as string)}
          value={props.form.formInputs[LORA_INPUTS.externalJoinServer.name].value as string}
          segmentWidth={100}
          height={'30px'}
          label={LORA_INPUTS.externalJoinServer.label}
          additionalInfo={LORA_INPUTS.externalJoinServer.info}
          fullHeight
        />
      )}
      {_.includes(props.activeLoraInputs, LORA_INPUTS.devAddr.name) && (
        <TextField
          label={LORA_INPUTS.devAddr.label}
          value={props.form.formInputs[LORA_INPUTS.devAddr.name].value as string}
          onChange={evt => onInputChangeUpperCase(props.form, evt)}
          onBlur={evt => (
            onInputBlur(props.form, evt)
          )}
          name={LORA_INPUTS.devAddr.name}
          margin={'0 0 15px 0'}
          fullHeight
          maxLength={8}
          additionalInfo={LORA_INPUTS.devAddr.info}
          validationErrorMessage={getValidationErrorMessage(
            props.form.formInputs[LORA_INPUTS.devAddr.name]
          )}
          validationSuccessMessage={getValidationSuccessMessage(
            props.form.formInputs[LORA_INPUTS.devAddr.name]
          )}
        />
      )}
      {_.includes(props.activeLoraInputs, LORA_INPUTS.nwkSKey.name) && (
        <TextField
          label={LORA_INPUTS.nwkSKey.label}
          value={props.form.formInputs[LORA_INPUTS.nwkSKey.name].value as string}
          onChange={evt => onInputChangeUpperCase(props.form, evt)}
          onBlur={evt => onInputBlur(props.form, evt)}
          name={LORA_INPUTS.nwkSKey.name}
          margin={'0 0 15px 0'}
          fullHeight
          maxLength={32}
          additionalInfo={LORA_INPUTS.nwkSKey.info}
          validationErrorMessage={getValidationErrorMessage(
            props.form.formInputs[LORA_INPUTS.nwkSKey.name]
          )}
          validationSuccessMessage={getValidationSuccessMessage(
            props.form.formInputs[LORA_INPUTS.nwkSKey.name]
          )}
        />
      )}
      {_.includes(props.activeLoraInputs, LORA_INPUTS.appSKey.name) && (
        <TextField
          label={LORA_INPUTS.appSKey.label}
          value={props.form.formInputs[LORA_INPUTS.appSKey.name].value as string}
          onChange={evt => onInputChangeUpperCase(props.form, evt)}
          onBlur={evt => onInputBlur(props.form, evt)}
          name={LORA_INPUTS.appSKey.name}
          margin={'0 0 15px 0'}
          fullHeight
          maxLength={32}
          additionalInfo={LORA_INPUTS.appSKey.info}
          validationErrorMessage={getValidationErrorMessage(
            props.form.formInputs[LORA_INPUTS.appSKey.name]
          )}
          validationSuccessMessage={getValidationSuccessMessage(
            props.form.formInputs[LORA_INPUTS.appSKey.name]
          )}
        />
      )}
      {_.includes(props.activeLoraInputs, LORA_INPUTS.connectivityPlan.name) && (
        <Select
          label={LORA_INPUTS.connectivityPlan.label}
          options={_.map(props.fetchConnectivityPlansResult.data, plan => ({
            value: plan.id,
            label: plan.name,
          }))}
          value={props.form.formInputs[LORA_INPUTS.connectivityPlan.name].value as string}
          onChange={evt => onInputChange(props.form, evt)}
          onBlur={evt => onInputBlur(props.form, evt)}
          name={LORA_INPUTS.connectivityPlan.name}
          margin={'0 0 15px 0'}
          fullHeight
          placeholder={(() => {
            if (props.fetchConnectivityPlansResult.isLoading) {
              return 'Fetching connectivity plans...';
            }
            if (props.fetchConnectivityPlansResult.isError) {
              return 'Failed to fetch connectivity plans';
            }
            return 'Select...';
          })()}
          isDisabled={!props.fetchConnectivityPlansResult.isSuccess}
          additionalInfo={LORA_INPUTS.connectivityPlan.info}
          validationErrorMessage={getValidationErrorMessage(
            props.form.formInputs[LORA_INPUTS.connectivityPlan.name]
          )}
        />
      )}
    </>
  );
};

export {
  Inputs,
};
