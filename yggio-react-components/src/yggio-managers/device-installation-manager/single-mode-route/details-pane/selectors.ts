/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';

import {Forms, ConnectorInputValue} from '../types';
import {LORA_CONNECTOR_TYPES} from '../../constants';
import {DEVICE_TYPES, THINGPARK_DEVICE_PROFILES, THINGPARK_LORAWAN_VERSIONS} from '../constants';
import {selectActiveLoraInputs} from '../selectors';
import {DeviceCreateData, Locations, TranslatorPreference} from '../../../../types';
import {getFormValues} from '../../../../utils/form-wizard';

const selectCreateDeviceData = (forms: Forms, translatorPreferences: TranslatorPreference[]) => {

  const data: DeviceCreateData = {
    name: forms.details.formInputs.name.value as string,
  };

  const deviceType = forms.deviceType.formInputs.deviceType.value as DEVICE_TYPES;

  // Secret
  if (deviceType === DEVICE_TYPES.generic) {
    data.secret = forms.generic.formInputs.secret.value as string;
  }

  // Lora
  if (deviceType === DEVICE_TYPES.lora) {
    const formValues = getFormValues(forms.lora.formInputs);
    const activeLoraInputs = selectActiveLoraInputs(forms.lora.formInputs);
    const loraValues = _.pick(formValues, activeLoraInputs);
    const connector = loraValues.connector as ConnectorInputValue;
    if (connector.type === LORA_CONNECTOR_TYPES.None) {
      _.unset(loraValues, 'connector');
    } else {
      loraValues.connector = connector.deviceId;
    }
    if (connector.type === LORA_CONNECTOR_TYPES.ActilityThingpark) {
      const loraVersion = loraValues.thingParkLorawanVersion as keyof typeof THINGPARK_LORAWAN_VERSIONS;
      const classType = loraValues.classType as 'A' | 'C';
      loraValues.deviceProfileId = THINGPARK_DEVICE_PROFILES[loraVersion][classType];
      _.unset(loraValues, 'thingParkLorawanVersion');
      _.unset(loraValues, 'classType');
    }
    _.assign(data, loraValues);
  }

  // Chirpstack
  if (deviceType === DEVICE_TYPES.chirpstackConnector) {
    data.url = forms.chirpstackConnector.formInputs.chirpstackUrl.value as string;
    data.applicationId = forms.chirpstackConnector.formInputs.applicationId.value as string;
    data.username = forms.chirpstackConnector.formInputs.username.value as string;
    data.password = forms.chirpstackConnector.formInputs.password.value as string;
    data.organizationID = forms.chirpstackConnector.formInputs.organizationId.value as string;
    data.networkServerID = forms.chirpstackConnector.formInputs.networkServerId.value as string;
    data.deviceProfileIdsABP =
      forms.chirpstackConnector.formInputs.deviceProfileIdsAbp.value as string;
    data.deviceProfileIdsOTAA =
      forms.chirpstackConnector.formInputs.deviceProfileIdsOtaa.value as string;
    data.downlinkQueue = 'ChirpStack';
  }

  // BLE Gateway
  if (deviceType === DEVICE_TYPES.bleConnector) {
    data.downlinkQueue = 'bleGateway';
  }

  // BLE Device
  if (deviceType === DEVICE_TYPES.bleDevice) {
    data.connector = forms.bleDevice.formInputs.connector.value as string;
    data.macAddress = forms.bleDevice.formInputs.macAddress.value as string;
  }

  // Weather Connector
  if (deviceType === DEVICE_TYPES.weatherConnector) {
    data.downlinkQueue = 'open-weather-map';
    data.apiToken = 'ac21679f7f99bc0f589c8d50384ae40e';
    data.url = 'https://api.openweathermap.org';
    data.apiVersion = '2.5';
  }

  // Weather Device
  if (deviceType === DEVICE_TYPES.weatherDevice) {
    data.connector = forms.weatherDevice.formInputs.connector.value as string;
    data.deviceModelName = 'open-weather-map';
  }

  // Netmore
  if (deviceType === DEVICE_TYPES.netmoreConnector) {
    data.url = forms.netmoreConnector.formInputs.url.value as string;
    data.serviceProvider = forms.netmoreConnector.formInputs.serviceProvider.value as string;
    data.username = forms.netmoreConnector.formInputs.username.value as string;
    data.password = forms.netmoreConnector.formInputs.password.value as string;
    data.customerCode = forms.netmoreConnector.formInputs.customerCode.value as string;
    data.downlinkQueue = 'Netmore';
  }

  // Astro Clock
  if (deviceType === DEVICE_TYPES.astroClock) {
    data.downlinkQueue = 'AstroClock';
  }

  // Box2 Gateway
  if (deviceType === DEVICE_TYPES.box2Gateway) {
    data.url = forms.box2Gateway.formInputs.box2GatewayUrl.value as string;
    data.username = forms.box2Gateway.formInputs.username.value as string;
    data.password = forms.box2Gateway.formInputs.password.value as string;
    data.downlinkQueue = 'box2';
  }


  // Description
  if (forms.details.formInputs.description.value) {
    data.description = forms.details.formInputs.description.value as string;
  }

  // Siemens Desigo CC Connector
  if (deviceType === DEVICE_TYPES.siemensDesigoCcConnector) {
    data.url = forms.siemensDesigoCcConnector.formInputs.url.value as string;
    data.password = forms.siemensDesigoCcConnector.formInputs.password.value as string;
    data.username = forms.siemensDesigoCcConnector.formInputs.username.value as string;
  }


  // Actility Thingpark Connector
  if (deviceType === DEVICE_TYPES.actilityThingparkConnector) {
    data.subscriber = {
      password: forms.actilityThingparkConnector.formInputs.password.value as string,
      thingparkURL: forms.actilityThingparkConnector.formInputs.thingparkUrl.value as string,
      targetProfileIdentifier:
        forms.actilityThingparkConnector.formInputs.targetProfileIdentifier.value as string,
      username: forms.actilityThingparkConnector.formInputs.loginEmail.value as string,
    };
    data.downlinkQueue = 'ActilityThingpark';

  }

  // Things Network Connector
  if (deviceType === DEVICE_TYPES.thingsNetworkConnector) {
    data.apiKey = forms.thingsNetworkConnector.formInputs.apiKey.value as string;
    data.applicationId = forms.thingsNetworkConnector.formInputs.applicationId.value as string;
    data.host = forms.thingsNetworkConnector.formInputs.thingsNetworkHost.value as string;
    data.downlinkQueue = 'TheThingsNetwork';
  }

  // Sodaq
  if (deviceType === DEVICE_TYPES.sodaq) {
    data.imei = forms.sodaq.formInputs.sodaqImei.value as string;
  }

  // Wireless M-bus
  if (deviceType === DEVICE_TYPES.wirelessMBus) {
    data.manufacturer = forms.wirelessMBus.formInputs.manufacturer.value as string;
    data.wMbusDeviceId = forms.wirelessMBus.formInputs.wMbusDeviceId.value as string;
    data.encryptionKey = forms.wirelessMBus.formInputs.encryptionKey.value as string;
  }

  // Celsiview Connector
  if (deviceType === DEVICE_TYPES.celsiviewConnector) {
    data.url = 'https://api.celsiview.se/api/v2';
    data.appKey = forms.celsiviewConnector.formInputs.appKey.value as string;
    data.clientKey = forms.celsiviewConnector.formInputs.clientKey.value as string;
    data.downlinkQueue = 'Celsiview';
  }

  // Klimator RSI Connector
  if (deviceType === DEVICE_TYPES.klimatorRsiConnector) {
    data.url = 'https://api.roadstatus.info/api';
    data.apiToken = forms.klimatorRsiConnector.formInputs.apiToken.value as string;
    data.countryCode = forms.klimatorRsiConnector.formInputs.countryCode.value as string;
    data.districtId = forms.klimatorRsiConnector.formInputs.districtId.value as string;
    data.downlinkQueue = 'KlimatorRSI';
  }

  // Delta Controls connector
  if (deviceType === DEVICE_TYPES.deltaControlsConnector) {
    data.apiURL = forms.deltaControlsConnector.formInputs.apiURL.value as string;
    data.siteName = forms.deltaControlsConnector.formInputs.siteName.value as string;
    data.username = forms.deltaControlsConnector.formInputs.username.value as string;
    data.password = forms.deltaControlsConnector.formInputs.password.value as string;
    data.downlinkQueue = 'DeltaControlsEnteliWeb';
  }

  // Device model name
  if (forms.deviceModelName.formInputs.deviceModelName.value) {
    data.deviceModelName = forms.deviceModelName.formInputs.deviceModelName.value as string;
  }

  // Translator preferences
  if (!_.isEmpty(translatorPreferences)) {
    data.translatorPreferences = translatorPreferences;
  }

  // Contextual parameters
  if (_.size(forms.details.formInputs.contextMap.value as object)) {
    data.contextMap = forms.details.formInputs.contextMap.value as Record<string, string>;
  }

  // Lora Gateway
  if (deviceType === DEVICE_TYPES.loraGateway) {
    data.gatewayEui = forms.loraGateway.formInputs.loraGatewayDevEui.value as string;
    data.connector = forms.loraGateway.formInputs.connector.value as string;
  }

  return data;
};

const selectLocationWithInsertedDevice = (
  deviceId: string,
  locations: Locations,
  locationId: string,
  blueprintId: string,
) => {
  const newItem = {
    deviceId,
    type: 'default',
    size: 'default',
  };
  const location = _.find(locations, {_id: locationId});
  if (!location) throw Error('DevErr: location not found');
  if (location.defaultLayer._id === blueprintId) {
    location.defaultLayer.items.push(newItem);
  } else {
    location.layers = _.map(location.layers, layer => {
      if (layer._id === blueprintId) {
        layer.items.push(newItem);
      }
      return layer;
    });
  }
  return location;
};

export {
  selectCreateDeviceData,
  selectLocationWithInsertedDevice,
};
