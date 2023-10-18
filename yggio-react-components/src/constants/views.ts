const ALLOWED_DATA_KEYS = [
  'filterConnector',
  'filterDevEui',
  'filterDeviceModelName',
  'filterName',
  'filterType',
  'filterContextualParameterKey',
  'filterContextualParameterValue',
  'filterQ',
  'columns',
  'currentPage',
  'cursorDirection',
  'cursorId',
  'filterCollapsed',
  'pageSize',
  'sortingField',
  'sortingOrder',
] as const;

const ALLOWED_COLUMN_DATA_KEYS = [
  'property',
  'threshold',
] as const;

const VIEW_TYPES = {
  deviceList: 'deviceList',
  column: 'column',
} as const;

export {
  ALLOWED_DATA_KEYS,
  ALLOWED_COLUMN_DATA_KEYS,
  VIEW_TYPES,
};
