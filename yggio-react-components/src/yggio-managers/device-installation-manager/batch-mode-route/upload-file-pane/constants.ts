/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const FIELDS = {
  General: [
    {name: 'name', description: ''},
    {name: 'description', description: ''},
    {name: 'deviceModelName', description: 'Used for identifying translator'},
    {name: 'connector', description: 'The id of the desired connector. You can use the tool below.'},
    {name: 'contextMap', description: 'Used for adding contextual parameters. See example below.'},
  ],
  LoRa: [
    {name: 'activationType', description: 'OTAA or ABP'},
    {name: 'devEui', description: ''},
    {name: 'appKey', description: ''},
    {name: 'devAddr', description: ''},
    {name: 'appEUI', description: ''},
    {name: 'nwkSKey', description: ''},
    {name: 'appSKey', description: ''},
  ],
  Netmore: [
    {name: 'classType', description: 'A or C'},
    {name: 'priceModelMessagesCountTypesCompositeCode', description: 'Use the connector helper tool below'},
    {name: 'externalJoinServer', description: 'true or false'},
  ],
  'Actility Thingpark': [
    {name: 'connectivityPlan', description: 'Use the connector helper tool below'},
    {name: 'deviceProfileId', description: 'LORA/GenericA.1.0.2a_ETSI_Rx2-SF12 or LORA/GenericC.1.0.2a_ETSI_Rx2-SF12'},
  ],
  Generic: [
    {name: 'secret', description: ''},
  ],
};

export {
  FIELDS,
};
