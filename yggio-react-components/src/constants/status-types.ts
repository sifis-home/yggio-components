enum StatusTypeNames {
  'info',
  'ok',
  'warning',
  'error',
}

interface StatusType {
  name: StatusTypeNames;
  severity: number;
}
type StatusTypes = Record<StatusTypeNames, StatusType>;


const STATUS_TYPES: StatusTypes = {
  [StatusTypeNames.info]: {name: StatusTypeNames.info, severity: 0},
  [StatusTypeNames.ok]: {name: StatusTypeNames.ok, severity: 1},
  [StatusTypeNames.warning]: {name: StatusTypeNames.warning, severity: 2},
  [StatusTypeNames.error]: {name: StatusTypeNames.error, severity: 3},
};

export type {
  StatusType,
  StatusTypes,
};
export {
  StatusTypeNames,
  STATUS_TYPES,
};
