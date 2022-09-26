/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const DEFAULTS = {
  width: '100%',
  margin: '0',
};

const VALUE_STYLES = {
  bool: {
    color: '#00805d',
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  string: {
    color: '#bf2615',
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  number: {
    color: '#00608a',
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  noValue: {
    color: '#555',
    fontWeight: 'normal',
    fontStyle: 'italic',
  },
};

export {
  DEFAULTS,
  VALUE_STYLES,
};
