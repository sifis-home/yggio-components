/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import NumberField from './index';
import {DEFAULTS} from './constants';
import {YggioFontDecorator} from '../../decorators';

const main = {
  title: 'Components/Number Field',
  component: NumberField,
  decorators: [YggioFontDecorator],
  argTypes: {
    isDisabled: {
      table: {defaultValue: {summary: DEFAULTS.isDisabled}}
    },
    fullHeight: {
      table: {defaultValue: {summary: DEFAULTS.fullHeight}}
    },
  }
};

const Template = args => <NumberField {...args} />;

const Primary = Template.bind({});
Primary.args = {};

export default main;
export {
  Primary,
};
