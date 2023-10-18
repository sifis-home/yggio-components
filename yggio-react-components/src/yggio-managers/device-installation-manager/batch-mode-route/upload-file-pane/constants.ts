/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const FIELDS = {
  name: 'name',
  description: 'description',
  deviceModelName: 'deviceModelName',
  connector: 'connector',
  contextMap: 'contextMap',
  activationType: 'activationType',
  devEui: 'devEui',
  appKey: 'appKey',
  devAddr: 'devAddr',
  appEUI: 'appEUI',
  nwkSKey: 'nwkSKey',
  appSKey: 'appSKey',
  classType: 'classType',
  priceModelMessagesCountTypesCompositeCode: 'priceModelMessagesCountTypesCompositeCode',
  lorawanVersionTypeCompositeCode: 'lorawanVersionTypeCompositeCode',
  externalJoinServer: 'externalJoinServer',
  connectivityPlanId: 'connectivityPlanId',
  deviceProfileId: 'deviceProfileId',
  secret: 'secret',
};

const INSTRUCTION_FIELDS: Record<string, {name: string, description?: string}[]> = {
  General: [
    {name: FIELDS.name},
    {name: FIELDS.description},
    {name: FIELDS.deviceModelName, description: 'Used for identifying translator'},
    {name: FIELDS.connector, description: 'The id of the desired connector. You can use the tool below.'},
    {name: FIELDS.contextMap, description: 'Used for adding contextual parameters. See example below.'},
  ],
  LoRa: [
    {name: FIELDS.activationType, description: 'OTAA or ABP'},
    {name: FIELDS.devEui},
    {name: FIELDS.appKey},
    {name: FIELDS.devAddr},
    {name: FIELDS.appEUI},
    {name: FIELDS.nwkSKey},
    {name: FIELDS.appSKey},
  ],
  Netmore: [
    {name: FIELDS.classType, description: 'A or C'},
    {name: FIELDS.priceModelMessagesCountTypesCompositeCode, description: 'Use the connector helper tool below'},
    {name: FIELDS.lorawanVersionTypeCompositeCode, description: 'V100@SENSOR_COMMON, V101@SENSOR_COMMON, V102@SENSOR_COMMON or V103@SENSOR_COMMON'},
    {name: FIELDS.externalJoinServer, description: 'true or false'},
  ],
  'Actility Thingpark': [
    {name: FIELDS.connectivityPlanId, description: 'Use the connector helper tool below'},
    {name: FIELDS.deviceProfileId, description: 'Can be any supported profile. Common ones are: LORA/GenericA.1.0.2a_ETSI_Rx2-SF12, LORA/GenericC.1.0.2a_ETSI_Rx2-SF12, LORA/GenericA.1.0.3a_ETSI, LORA/GenericC.1.0.3_ETSI, LORA/GenericA.1.0.4a_ETSI or LORA/GenericC.1.0.4a_ETSI'},
  ],
  Generic: [
    {name: FIELDS.secret},
  ],
};

export {
  FIELDS,
  INSTRUCTION_FIELDS,
};
