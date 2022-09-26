/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
module.exports = {
  extends: [
    '../../../.eslintrc.js',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
  ],
  // yggio-context and yggio-links to be thrown out the window soon
  ignorePatterns: [
    '**/yggio-links/*',
    '**/yggio-context/*',
    'config/*',
  ],
  globals: {
    localStorage: 'writable',
  },
  rules: {
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0,
    'react/display-name': 0,
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
