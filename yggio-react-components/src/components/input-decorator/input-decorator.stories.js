/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import InputDecorator from './index';
import {DEFAULTS} from './constants';
import {YggioFontDecorator} from '../../decorators';

const main = {
  title: 'Components/Input Decorator',
  component: InputDecorator,
  decorators: [YggioFontDecorator],
  argTypes: {
    margin: {
      table: {defaultValue: {summary: DEFAULTS.margin}}
    },
    width: {
      table: {defaultValue: {summary: DEFAULTS.width}}
    },
    isRequired: {
      table: {defaultValue: {summary: false}}
    },
    isOptional: {
      table: {defaultValue: {summary: false}}
    },
    fullHeight: {
      description: 'Display the bottom part even it is empty',
      table: {defaultValue: {summary: false}}
    },
  },
};

const Template = args => <InputDecorator {...args} />;

const Primary = Template.bind({});
Primary.args = {
  label: 'Im a input decorator'
};

export default main;
export {
  Primary,
};
