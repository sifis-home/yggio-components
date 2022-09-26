/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {ic_info_outline as generalInfoIcon} from 'react-icons-kit/md/ic_info_outline';
import {ic_subject as dataIcon} from 'react-icons-kit/md/ic_subject';
import {ic_memory as specificationsIcon} from 'react-icons-kit/md/ic_memory';
import {ic_gps_fixed as positionIcon} from 'react-icons-kit/md/ic_gps_fixed';
import {calculator as calculationsIcon} from 'react-icons-kit/fa/calculator';
import {angleDoubleRight as channelsIcon} from 'react-icons-kit/fa/angleDoubleRight';
import {ic_person as accessRightsIcon} from 'react-icons-kit/md/ic_person';
import {ic_edit as contextualParametersIcon} from 'react-icons-kit/md/ic_edit';
import {ic_show_chart as chartIcon} from 'react-icons-kit/md/ic_show_chart';
import {bullhorn as reportIntervalIcon} from 'react-icons-kit/iconic/bullhorn';
import {ic_cloud_upload as controlIcon} from 'react-icons-kit/md/ic_cloud_upload';
import {ic_settings as cogIcon} from 'react-icons-kit/md/ic_settings';
import {ic_business as realEstateCoreIcon} from 'react-icons-kit/md/ic_business';

import {Scope} from '../../types';
import {CALCULATIONS_TYPES} from '../../constants';
import {DataFilter} from './types';

const CHIRP_STACK_COMMANDS = {
  loraAppServerQueueDownlink: 'loraAppServerQueueDownlink',
  loraAppServerGetDeviceQueue: 'loraAppServerGetDeviceQueue',
  loraAppServerFlushQueue: 'loraAppServerFlushQueue',
};

enum LORA_SERVERS {
  chirpStack = 'ChirpStack',
  netmore = 'Netmore',
  actilityThingpark = 'ActilityThingpark',
}

const ONE_DAY = 60 * 60 * 24 * 1000;

interface TabItem {
  name: string;
  path: string;
  icon: {
    file: object;
    size: number;
    topPosition: number;
  }
}

const TAB_ITEMS: Record<string, TabItem> = {
  generalInfo: {
    name: 'generalInfo',
    path: 'general-info',
    icon: {
      file: generalInfoIcon as object,
      size: 18,
      topPosition: -1,
    }
  },
  specifications: {
    name: 'specifications',
    path: 'specifications',
    icon: {
      file: specificationsIcon as object,
      size: 19,
      topPosition: 0,
    }
  },
  data: {
    name: 'data',
    path: 'data',
    icon: {
      file: dataIcon as object,
      size: 16,
      topPosition: -1,
    }
  },
  charts: {
    name: 'charts',
    path: 'charts',
    icon: {
      file: chartIcon as object,
      size: 18,
      topPosition: -1,
    }
  },
  // Removed until translators tab is done
  // translators: {
  //   name: 'translators',
  //   icon: {
  //     file: transIcon as object,
  //     size: 17,
  //     topPosition: -1,
  //   }
  // },
  position: {
    name: 'position',
    path: 'position',
    icon: {
      file: positionIcon as object,
      size: 18,
      topPosition: -1
    }
  },
  accessrights: {
    name: 'accessrights',
    path: 'access-rights',
    icon: {
      file: accessRightsIcon as object,
      size: 17,
      topPosition: -1,
    }
  },
  channels: {
    name: 'channels',
    path: 'channels',
    icon: {
      file: channelsIcon as object,
      size: 20,
      topPosition: -2,
    }
  },
  contextualParameters: {
    name: 'contextualParameters',
    path: 'contextual-parameters',
    icon: {
      file: contextualParametersIcon as object,
      size: 15,
      topPosition: -1,
    }
  },
  calculations: {
    name: 'calculations',
    path: 'calculations',
    icon: {
      file: calculationsIcon as object,
      size: 13,
      topPosition: -2,
    }
  },
  reportInterval: {
    name: 'reportInterval',
    path: 'report-interval',
    icon: {
      file: reportIntervalIcon as object,
      size: 14,
      topPosition: -1,
    }
  },
  tools: {
    name: 'tools',
    path: 'tools',
    icon: {
      file: cogIcon as object,
      size: 15,
      topPosition: -1,
    }
  },
};

const LORA_TAB_ITEMS: Record<string, TabItem> = {
  loraControl: {
    name: 'loraControl',
    path: 'lora-control',
    icon: {
      file: controlIcon as object,
      size: 14,
      topPosition: -1,
    }
  },
};

const BOX2_TAB_ITEMS: Record<string, TabItem> = {
  downlink: {
    name: 'downlink',
    path: 'downlink',
    icon: {
      file: controlIcon as object,
      size: 14,
      topPosition: 0,
    }
  },
};

const SPECIFIC_TAB_KEYS = {
  ChirpStack: 'ChirpStack',
  Netmore: 'Netmore',
  ActilityThingpark: 'ActilityThingpark',
  box2: 'box2-node',
};

const REAL_ESTATE_CORE_TAB_ITEM: TabItem = {
  name: 'realEstateCore',
  path: 'real-estate-core',
  icon: {
    file: realEstateCoreIcon as object,
    size: 16,
    topPosition: -2,
  }
};

const SPECIFIC_TAB_ITEMS = {
  [SPECIFIC_TAB_KEYS.ChirpStack]: LORA_TAB_ITEMS,
  [SPECIFIC_TAB_KEYS.Netmore]: LORA_TAB_ITEMS,
  [SPECIFIC_TAB_KEYS.ActilityThingpark]: LORA_TAB_ITEMS,
  [SPECIFIC_TAB_KEYS.box2]: BOX2_TAB_ITEMS,
};

const RIGHT_TYPES: Record<Scope, Scope> = {
  admin: 'admin',
  write: 'write',
  read: 'read',
  peek: 'peek',
};

const TIME_PERIOD_TYPES = {
  hour: 'hour',
  day: 'day',
  week: 'week',
  month: 'month',
  custom: 'custom',
};

const TIME_PERIODS = {
  [TIME_PERIOD_TYPES.hour]: {
    name: 'Last 60 minutes',
    timeFormat: 'HH:mm',
    time: 1000 * 60 * 60, // 1 hour
    ticks: {
      interval: 60 * 10, // 10 minutes
      count: 6,
      lastTickStartOf: 'minute',
    },
    resolutions: {
      low: 60, // 1 minute => 60 points
      high: 5, // = 5 seconds => 720 points
    },
  },
  [TIME_PERIOD_TYPES.day]: {
    name: 'Last 24 hours',
    timeFormat: 'HH:mm',
    time: ONE_DAY, // 1 day
    ticks: {
      interval: 60 * 60 * 2, // 2 hours
      count: 12,
      lastTickStartOf: 'hour',
    },
    resolutions: {
      low: 60 * 15, // 15 minutes => 96 points
      high: 60 * 2, // 2 minutes => 720 points
    },
  },
  [TIME_PERIOD_TYPES.week]: {
    name: 'Last 7 days',
    timeFormat: 'dd/MM',
    time: 1000 * 60 * 60 * 24 * 7, // 7 days
    ticks: {
      interval: 60 * 60 * 24, // 1 day
      count: 7,
      lastTickStartOf: 'day',
    },
    resolutions: {
      low: 60 * 60 * 2, // 2 hours => 84 points
      high: 60 * 10, // 10 minutes => 1008 points
    },
  },
  [TIME_PERIOD_TYPES.month]: {
    name: 'Last 30 days',
    timeFormat: 'dd/MM',
    time: 1000 * 60 * 60 * 24 * 30, // 30 days
    ticks: {
      interval: 60 * 60 * 24 * 5, // 5 days
      count: 6,
      lastTickStartOf: 'day',
    },
    resolutions: {
      low: 60 * 60 * 8, // 8 hours => 90 points
      high: 60 * 60, // 1 hour => 720 points
    },
  },
  [TIME_PERIOD_TYPES.custom]: {
    name: 'Custom time period',
    timeFormat: 'yyyy-MM-dd HH:mm',
    resolutions: {
      low: 100,
      high: 1000,
    },
  }
};

const transformations = {
  door: {
    closed: 0,
    open: 1,
    locked: 2,
  },
  presence: {
    no: 0,
    yes: 1,
  },
  tamper: {
    no: 0,
    yes: 1,
  },
};

const CALCULATION_LABELS = {
  [CALCULATIONS_TYPES.averageAggregatedValueOverTime]: 'Aggregated average value over time (average of sum)',
  [CALCULATIONS_TYPES.aggregatedValueOverTime]: 'Aggregated value over time',
  [CALCULATIONS_TYPES.sumLastValues]: 'Accumulation of last reported values',
  [CALCULATIONS_TYPES.averageLastValues]: 'Average of last reported values',
  [CALCULATIONS_TYPES.maxLastValues]: 'Maximum of last reported values',
  [CALCULATIONS_TYPES.minLastValues]: 'Minimum of last reported values',
  [CALCULATIONS_TYPES.sumEachNode]: 'Sum of each node',
  [CALCULATIONS_TYPES.monthlySumPerEachNode]: 'Monthly sum per each node',
  [CALCULATIONS_TYPES.totalMonthlySum]: 'Total monthly sum',
  [CALCULATIONS_TYPES.monthlyDiffFromTotalEachNode]: 'Monthly difference from total on each node',
  [CALCULATIONS_TYPES.monthlyDiffFromTotal]: 'Monthly difference from total grouped',
};

const SPEC_SECTIONS = {
  lora: 'LoRa',
  nibe: 'Nibe',
  netmore: 'Netmore',
  chirpstack: 'ChirpStack',
};

const DATA_FILTER_OPTIONS = {
  [DataFilter.values]: {
    label: 'Values',
    value: 'values',
    noValuesText: 'The device has no values',
  },
  [DataFilter.all]: {
    label: 'All',
    value: 'all',
    noValuesText: 'The device has no data',
  },
  [DataFilter.lora]: {
    label: 'LoRa',
    value: 'lora',
    noValuesText: 'The device has no LoRa values',
  },
  [DataFilter.box2]: {
    label: 'BoX2',
    value: 'box2',
    noValuesText: 'The device has no BoX2 values',
  },
};

const DATA_DISPLAY_OPTIONS = [
  {
    label: 'Pretty',
    value: 'pretty',
  },
  {
    label: 'Raw',
    value: 'raw',
  },
];

const SIDEBAR_SIBLING_WIDTH = 1200;

const RULES_ACTIONS_OPTIONS = [
  {label: 'Turn On', value: 'turnOn'},
  {label: 'Turn Off', value: 'turnOff'},
];

const MAX_COORDINATE_LENGTH = 17;

export {
  TAB_ITEMS,
  LORA_TAB_ITEMS,
  BOX2_TAB_ITEMS,
  SPECIFIC_TAB_ITEMS,
  CHIRP_STACK_COMMANDS,
  LORA_SERVERS,
  RIGHT_TYPES,
  TIME_PERIOD_TYPES,
  TIME_PERIODS,
  MAX_COORDINATE_LENGTH,
  transformations,
  ONE_DAY,
  DATA_DISPLAY_OPTIONS,
  DATA_FILTER_OPTIONS,
  CALCULATION_LABELS,
  SIDEBAR_SIBLING_WIDTH,
  SPEC_SECTIONS,
  RULES_ACTIONS_OPTIONS,
  SPECIFIC_TAB_KEYS,
  REAL_ESTATE_CORE_TAB_ITEM,
};
