/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';

// the primordial enum
const NODE_TYPES = {
  loraNode: 'loraNode',
  loraAppServerConnector: 'loraAppServerConnector',
  loraGateway: 'loraGateway',
  zWaveGateway: 'zWaveGateway',
  zWaveDevice: 'zWaveDevice',
  generic: 'generic',
  ttnConnector: 'ttnConnector',
  ttnDevice: 'ttnDevice',
  box2Node: 'box2Node',
  box2Gateway: 'box2Gateway',
  coap: 'coap',
  echo: 'echo',
  fiwareDevice: 'fiwareDevice',
  fusionRouter: 'fusionRouter',
  ngsiCompatibleDevice: 'ngsiCompatibleDevice',
  nibeNode: 'nibeNode',
  realEstateCoreCompatibleDevice: 'realEstateCoreCompatibleDevice',
  simpleLoraNode: 'simpleLoraNode',
  thingparkConnector: 'thingparkConnector',
  thingparkDevice: 'thingparkDevice',
};

// THE definition for natural node ordering (for consistency)
// This should probably be kept alphabetically.
// But it should definitely be kept explicitly.
const ORDERED_NODE_TYPES = [
  NODE_TYPES.loraGateway,
  NODE_TYPES.loraAppServerConnector,
  NODE_TYPES.loraNode,
  NODE_TYPES.simpleLoraNode,
  NODE_TYPES.zWaveGateway,
  NODE_TYPES.zWaveDevice,
  NODE_TYPES.generic,
  NODE_TYPES.ttnConnector,
  NODE_TYPES.ttnDevice,
  NODE_TYPES.box2Gateway,
  NODE_TYPES.box2Node,
  NODE_TYPES.coap,
  NODE_TYPES.echo,
  NODE_TYPES.fiwareDevice,
  NODE_TYPES.fusionRouter,
  NODE_TYPES.ngsiCompatibleDevice,
  NODE_TYPES.nibeNode,
  NODE_TYPES.realEstateCoreCompatibleDevice,
  NODE_TYPES.thingparkConnector,
  NODE_TYPES.thingparkDevice,
];

// secondary information, should probs be stored here (if multiple files
// are interested in them)
const NODE_TYPE_ITEMS = {
  [NODE_TYPES.loraGateway]: {
    label: 'LoRa gateway',
    value: 'lora-gateway',
    creatable: true,
  },
  [NODE_TYPES.loraAppServerConnector]: {
    label: 'LoRa app server connector',
    value: 'lora-app-server-connector',
    creatable: true,
  },
  [NODE_TYPES.loraNode]: {
    label: 'LoRa node',
    value: 'lora-node',
    creatable: true,
  },
  [NODE_TYPES.simpleLoraNode]: {
    label: 'Simple LoRa node',
    value: 'simple-lora-node',
  },
  [NODE_TYPES.zWaveGateway]: {
    label: 'Z-wave gateway',
    value: 'zwave-gateway',
    creatable: true,
  },
  [NODE_TYPES.zWaveDevice]: {
    label: 'Z-wave device',
    value: 'zwave-device',
    creatable: true,
  },
  [NODE_TYPES.ttnConnector]: {
    label: 'TTN connector',
    value: 'ttn-connector',
    creatable: true,
  },
  [NODE_TYPES.ttnDevice]: {
    label: 'TTN device',
    value: 'ttn-device',
  },
  [NODE_TYPES.box2Gateway]: {
    label: 'BOX2 gateway',
    value: 'box2-gateway',
    creatable: true,
  },
  [NODE_TYPES.box2Node]: {
    label: 'BOX2 node',
    value: 'box2-node',
  },
  [NODE_TYPES.coap]: {
    label: 'COAP',
    value: 'coap',
  },
  [NODE_TYPES.echo]: {
    label: 'Echo',
    value: 'echo',
  },
  [NODE_TYPES.generic]: {
    label: 'Generic',
    value: 'generic',
    creatable: true,
  },
  [NODE_TYPES.fiwareDevice]: {
    label: 'Fiware device',
    value: 'fiware-device',
  },
  [NODE_TYPES.fusionRouter]: {
    label: 'Fusion router',
    value: 'fusion-router',
  },
  [NODE_TYPES.ngsiCompatibleDevice]: {
    label: 'NGSI compatible device',
    value: 'ngsi-compatible-device',
  },
  [NODE_TYPES.nibeNode]: {
    label: 'NIBE node',
    value: 'nibe-node',
  },
  [NODE_TYPES.realEstateCoreCompatibleDevice]: {
    label: 'Real estate core compatible device',
    value: 'real-estate-core-compatible-device',
  },
  [NODE_TYPES.thingparkConnector]: {
    label: 'Thingpark connector',
    value: 'thingpark-connector',
    creatable: true,
  },
  [NODE_TYPES.thingparkDevice]: {
    label: 'Thingpark device',
    value: 'thingpark-device',
  },
};

// derivative values
// This is a good place to implement filter functions

// the naturally ordered items
const getFilteredItems = nodeTypes => {
  const items = _.map(nodeTypes, nodeType => {
    const item = NODE_TYPE_ITEMS[nodeType];
    if (!item) {
      throw new Error(`DevErr: Invalid nodeType ${nodeType}`);
    }
    return item;
  });
  return items;
};
const getCreatableItems = nodeTypes => {
  const items = _.map(nodeTypes, nodeType => {
    const item = NODE_TYPE_ITEMS[nodeType];
    if (!item) {
      throw new Error(`DevErr: Invalid nodeType ${nodeType}`);
    }
    if (item.creatable) {
      return item;
    }
  });
  return _.compact(items);
};
const ORDERED_NODE_TYPE_ITEMS = getFilteredItems(ORDERED_NODE_TYPES);
const CREATABLE_NODE_TYPE_ITEMS = getCreatableItems(ORDERED_NODE_TYPES);

const TRANSLATOR_ELIGIBLE_NODE_TYPES = [
  'generic',
  'lora-node',
  'zwave-device',
  'ttn-device',
  'box2-device',
];

export {
  NODE_TYPES,
  ORDERED_NODE_TYPES,
  NODE_TYPE_ITEMS,
  ORDERED_NODE_TYPE_ITEMS,
  CREATABLE_NODE_TYPE_ITEMS,
  TRANSLATOR_ELIGIBLE_NODE_TYPES,
};
