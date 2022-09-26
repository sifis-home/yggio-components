/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {ic_info as infoIcon} from 'react-icons-kit/md/ic_info';
import {checkmark as successIcon} from 'react-icons-kit/ionicons/checkmark';
import {ic_warning as warningIcon} from 'react-icons-kit/md/ic_warning';
import {ic_error as errorIcon} from 'react-icons-kit/md/ic_error';

const TYPES = {
  info: 'info',
  neutral: 'neutral',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

const TYPE_STYLES = {
  [TYPES.info]: {
    icon: infoIcon,
    iconColor: '#549DE2',
    background: '#EBF5FF',
    border: '#84BEF5',
  },
  [TYPES.neutral]: {
    icon: infoIcon,
    iconColor: '#888',
    background: '#F4F4F4',
    border: '#CCC',
  },
  [TYPES.success]: {
    icon: successIcon,
    iconColor: '#3D9F4A',
    background: '#E9F4EB',
    border: '#70B579',
  },
  [TYPES.warning]: {
    icon: warningIcon,
    iconColor: '#D1A400',
    background: '#FFF9E1',
    border: '#D1A400',
  },
  [TYPES.error]: {
    icon: errorIcon,
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
