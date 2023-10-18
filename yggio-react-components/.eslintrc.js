/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

module.exports = {
  settings: {
    react: {
      version: 'detect'
    },
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  extends: [
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
  ],
  ignorePatterns: [
    'config/*',
  ],
  globals: {
    localStorage: 'writable',
  },
  rules: {
    'default-param-last': 0,
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0,
    'react/jsx-curly-brace-presence': 0,
    'react/jsx-handler-names': 0,
    'import/no-unresolved': 'off',
    'import/no-cycle': 'off',
    'no-void': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'no-plusplus': 'off',
  }
};
