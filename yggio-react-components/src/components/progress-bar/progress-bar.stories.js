/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import ProgressBar from './index';
import {DEFAULTS} from './constants';
import {YggioFontDecorator} from '../../decorators';

const main = {
  title: 'Components/Progress Bar',
  component: ProgressBar,
  decorators: [YggioFontDecorator],
  argTypes: {
    barColor: {
      table: {defaultValue: {summary: DEFAULTS.barColor}}
    },
    fillColor: {
      table: {defaultValue: {summary: DEFAULTS.fillColor}}
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
  }
};

const Template = args => <ProgressBar {...args} />;

const Primary = Template.bind({});
Primary.args = {
  progress: 60,
};

export default main;
export {
  Primary,
};
