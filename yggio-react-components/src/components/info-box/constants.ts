import {
  MdInfo as InfoIcon,
  MdWarning as WarningIcon,
  MdError as ErrorIcon,
  MdCheckCircle as SuccessIcon,
} from 'react-icons/md';

const TYPES = {
  info: 'info',
  neutral: 'neutral',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

const TYPE_STYLES = {
  [TYPES.info]: {
    icon: InfoIcon,
    iconColor: '#549DE2',
    background: '#EBF5FF',
    border: '#84BEF5',
  },
  [TYPES.neutral]: {
    icon: InfoIcon,
    iconColor: '#888',
    background: '#F4F4F4',
    border: '#CCC',
  },
  [TYPES.success]: {
    icon: SuccessIcon,
    iconColor: '#3D9F4A',
    background: '#E9F4EB',
    border: '#70B579',
  },
  [TYPES.warning]: {
    icon: WarningIcon,
    iconColor: '#D1A400',
    background: '#FFF9E1',
    border: '#D1A400',
  },
  [TYPES.error]: {
    icon: ErrorIcon,
    iconColor: '#CB5D5D',
    background: '#FFEEEE',
    border: '#FF8F8F',
  },
};

const DEFAULTS = {
  type: TYPES.info,
  margin: '0',
};

export {
  TYPES,
  TYPE_STYLES,
  DEFAULTS,
};
