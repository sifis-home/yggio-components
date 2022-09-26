/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import SegmentedControl from './index';
import {DEFAULTS} from './constants';
import {YggioFontDecorator} from '../../decorators';

const main = {
  title: 'Components/Segmented Control',
  component: SegmentedControl,
  decorators: [YggioFontDecorator],
  argTypes: {
    segmentWidth: {
      table: {defaultValue: {summary: DEFAULTS.segmentWidth}}
    },
    height: {
      table: {defaultValue: {summary: DEFAULTS.height}}
    },
  }
};

const Template = args => <SegmentedControl {...args} />;

const Primary = Template.bind({});
Primary.args = {
  options: [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Orange',
      value: 'orange',
    },
  ],
  value: 'apple',
  onChange: () => null,
};

export default main;
export {
  Primary,
};
