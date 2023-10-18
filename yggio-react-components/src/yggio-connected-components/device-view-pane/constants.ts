import {
  MdInfoOutline as GeneralInfoIcon,
  MdMemory as SpecificationsIcon,
  MdSubject as DataIcon,
  MdBarChart as ChartsIcon,
  MdOutlineDescription as LogsIcon,
  MdContentCut as TranslatorsIcon,
  MdLocationOn as PositionIcon,
  MdSupervisorAccount as AccessRightsIcon,
  MdKeyboardDoubleArrowRight as ChannelsIcon,
  MdMode as ContextualParametersIcon,
  MdCallMissedOutgoing as CommandsIcon,
  MdOutlineCalculate as CalculationsIcon,
  MdOutlineCampaign as ReportIntervalIcon,
  MdSettings as ToolsIcon,
  MdCloudUpload as LoraControlIcon,
  MdBusiness as RealEstateCoreIcon,
} from 'react-icons/md';

import {CALCULATIONS_TYPES} from '../../constants';
import {TabItem} from './types';

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

const TAB_ITEMS: Record<string, TabItem> = {
  generalInfo: {
    name: 'generalInfo',
    path: 'general-info',
    icon: {
      file: GeneralInfoIcon,
      size: 18,
    }
  },
  specifications: {
    name: 'specifications',
    path: 'specifications',
    icon: {
      file: SpecificationsIcon,
      size: 19,
    }
  },
  data: {
    name: 'data',
    path: 'data',
    icon: {
      file: DataIcon,
      size: 16,
      topPosition: 1,
    }
  },
  charts: {
    name: 'charts',
    path: 'charts',
    width: 1200,
    icon: {
      file: ChartsIcon,
      size: 17,
      topPosition: -1,
    }
  },
  logs: {
    name: 'logs',
    path: 'logs',
    icon: {
      file: LogsIcon,
      size: 16,
    }
  },
  translators: {
    name: 'translators',
    path: 'translators',
    icon: {
      file: TranslatorsIcon,
      size: 15,
    }
  },
  position: {
    name: 'position',
    path: 'position',
    icon: {
      file: PositionIcon,
      size: 17,
    }
  },
  accessrights: {
    name: 'accessrights',
    path: 'access-rights',
    icon: {
      file: AccessRightsIcon,
      size: 17,
    }
  },
  channels: {
    name: 'channels',
    path: 'channels',
    icon: {
      file: ChannelsIcon,
      size: 20,
    }
  },
  contextualParameters: {
    name: 'contextualParameters',
    path: 'contextual-parameters',
    icon: {
      file: ContextualParametersIcon,
      size: 14,
    }
  },
  commands: {
    name: 'commands',
    path: 'commands',
    icon: {
      file: CommandsIcon,
      size: 18,
      topPosition: 1,
    }
  },
  calculations: {
    name: 'calculations',
    path: 'calculations',
    icon: {
      file: CalculationsIcon,
      size: 17,
    }
  },
  reportInterval: {
    name: 'reportInterval',
    path: 'report-interval',
    icon: {
      file: ReportIntervalIcon,
      size: 17,
    }
  },
  tools: {
    name: 'tools',
    path: 'tools',
    icon: {
      file: ToolsIcon,
      size: 15,
    }
  },
};

const LORA_TAB_ITEMS: Record<string, TabItem> = {
  loraControl: {
    name: 'loraControl',
    path: 'lora-control',
    icon: {
      file: LoraControlIcon,
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
      file: LoraControlIcon,
      size: 14,
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
    file: RealEstateCoreIcon,
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

const DEFAULT_TAB_WIDTH = 900;

const RULES_ACTIONS_OPTIONS = [
  {label: 'Turn On', value: 'turnOn'},
  {label: 'Turn Off', value: 'turnOff'},
  {label: '100%', value: 'percentage100'},
  {label: '75%', value: 'percentage75'},
  {label: '50%', value: 'percentage50'},
  {label: '25%', value: 'percentage25'},
  {label: '0%', value: 'percentage0'},
  {label: 'Up', value: 'up'},
  {label: 'Down', value: 'down'},
  {label: 'Open', value: 'open'},
  {label: 'Close', value: 'close'},
];

const LORA_IMPORT_COMMANDS: Record<string, string> = {
  Netmore: 'importSensorsFromNetmore',
  ActilityThingpark: 'importDevicesFromThingpark',
};

const DEFAULT_DELTA_CONTROLS_SETTINGS = `[
  {
    "sourceField": "",
    "deviceNumber": 0,
    "objectType": "",
    "instance": "",
    "propertyName": "",
    "createMissing": true,
    "objectName": "",
    "priority": "",
    "dataType": ""
  }
]`;

export {
  TAB_ITEMS,
  LORA_TAB_ITEMS,
  BOX2_TAB_ITEMS,
  SPECIFIC_TAB_ITEMS,
  CHIRP_STACK_COMMANDS,
  LORA_SERVERS,
  TIME_PERIOD_TYPES,
  TIME_PERIODS,
  transformations,
  ONE_DAY,
  DATA_DISPLAY_OPTIONS,
  CALCULATION_LABELS,
  DEFAULT_TAB_WIDTH,
  RULES_ACTIONS_OPTIONS,
  SPECIFIC_TAB_KEYS,
  REAL_ESTATE_CORE_TAB_ITEM,
  LORA_IMPORT_COMMANDS,
  DEFAULT_DELTA_CONTROLS_SETTINGS,
};
