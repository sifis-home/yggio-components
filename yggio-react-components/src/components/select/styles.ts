/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {StylesConfig} from 'react-select';
import {Option} from './types';

const createStyles = (height?: string): StylesConfig<Option, false> => ({
  container: provided => ({
    ...provided,
    fontFamily: 'Lato,Arial,sans-serif',
    fontSize: '13px',
  }),
  control: (base, state) => ({
    ...base,
    boxShadow: state.isFocused ? '0 0 2px 1px #4287f5' : 'none',
    border: state.isFocused ? '1px solid #ccc' : 'solid 1px #ccc',
    cursor: 'pointer',
    height: height || base.height,
    minHeight: height || base.minHeight,
  }),
  input: provided => ({
    ...provided,
    height: '29px',
  }),
  valueContainer: provided => ({
    ...provided,
    paddingLeft: '10px',
  }),
  option: provided => ({
    ...provided,
  }),
});

export {
  createStyles,
};
