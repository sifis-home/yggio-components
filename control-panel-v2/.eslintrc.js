/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

module.exports = {
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  extends: [
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  rules: {
    'react/prop-types': 0,
    'filename-rules/match': 0,
  }
};
