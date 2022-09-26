/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import Logo from './index';
import {DEFAULTS} from './constants';
import {img} from './story-data.json';
import {YggioFontDecorator} from '../../decorators';

const main = {
  title: 'Components/Logo',
  component: Logo,
  decorators: [YggioFontDecorator],
  argTypes: {
    src: {
      control: false,
    },
    width: {
      table: {defaultValue: {summary: DEFAULTS.width}}
    },
    height: {
      table: {defaultValue: {summary: DEFAULTS.height}}
    },
    margin: {
      table: {defaultValue: {summary: DEFAULTS.margin}}
    },
    color: {
      table: {defaultValue: {summary: DEFAULTS.color}}
    },
    backgroundColor: {
      table: {defaultValue: {summary: DEFAULTS.backgroundColor}}
    },
  }
};

const Template = args => <Logo {...args} />;

const Primary = Template.bind({});
Primary.args = {
  src: img,
};

export default main;
export {
  Primary,
};
