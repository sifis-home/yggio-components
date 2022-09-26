/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import TranslatorSelector from './index';

const initialTranslators = [
  {
    name: 'translator-123',
    username: 'marcus',
    selectedVersion: '1.0.0',
    versions: ['1.2.1', '1.2.0', '1.0.1', '1.0.0'],
    updateOption: 'minor',
  },
  {
    name: 'h21-asd-122',
    username: 'micke',
    selectedVersion: '1.0.0',
    versions: ['1.2.1', '1.2.0', '1.0.1', '1.0.0'],
    updateOption: 'minor',
  },
  {
    name: 'translator-farenheit',
    username: 'marcus',
    selectedVersion: '1.0.0',
    versions: ['1.2.1', '1.2.0', '1.0.1', '1.0.0'],
    updateOption: 'minor',
  },
  {
    name: 'translator-celcius',
    username: 'marcus',
    selectedVersion: '1.0.0',
    versions: ['1.2.1', '1.2.0', '1.0.1', '1.0.0'],
    updateOption: 'minor',
  },
];

const main = {
  title: 'Components/Translator Selector',
  component: TranslatorSelector,
  argTypes: {
    id: {
      description: 'A page that showcase the translator selector'
    }
  }
};

const Template = args => <TranslatorSelector {...args} />;

const Primary = Template.bind({});
Primary.args = {
  onChange: addedTranslators => console.info('addedTranslators: ', addedTranslators),
  shouldAddDefaultTranslator: false,
  initialTranslators,
  availableTranslators: [
    {
      name: 'mickes-strips',
      username: 'michael',
      version: '1.0.0',
    },
    {
      name: 'mickes-strips',
      username: 'micke',
      version: '4.0.0',
    },
    {
      name: 'mickes-strips',
      username: 'micke',
      version: '5.0.0',
    },
    {
      name: 'mickes-strips',
      username: 'micke',
      version: '5.1.0',
    },
    {
      name: 'mickes-strips',
      username: 'micke',
      version: '5.1.1',
    },
  ]
};

export default main;
export {
  Primary,
};
