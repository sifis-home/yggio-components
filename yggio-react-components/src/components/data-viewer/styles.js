/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {DEFAULTS} from './constants';

const styles = props => ({
  root: {
    maxWidth: props.width || DEFAULTS.width,
    margin: props.margin || DEFAULTS.margin,
    flexGrow: 1,
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    height: '25px',
    fontSize: '13px',
  },
  labelName: {
    marginRight: '5px',
  },
  valueFalsy: {
    color: '#555',
    fontStyle: 'italic',
  },
  valueString: {
    color: '#bf2615',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
  valueBoolean: {
    color: '#00805d',
    fontWeight: 'bold',
  },
  valueNumber: {
    color: '#00608a',
    fontWeight: 'bold',
  },
  valueDefault: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default styles;
