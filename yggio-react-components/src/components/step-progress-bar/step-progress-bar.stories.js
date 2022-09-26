/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import StepProgressBar from './index';
import {DEFAULTS} from './constants';
import {YggioDefaultDecorator} from '../../decorators';

const main = {
  title: 'Components/Step Progress Bar',
  component: StepProgressBar,
  decorators: [YggioDefaultDecorator],
  argTypes: {
    margin: {
      table: {defaultValue: {summary: DEFAULTS.margin}}
    },
    finished: {
      table: {defaultValue: {summary: false}},
    },
  }
};

const Template = args => <StepProgressBar {...args} />;

const Primary = Template.bind({});
Primary.args = {
  steps: [
    'Step 1',
    'Step 2',
    'Step 3',
  ],
  currentStep: 1,
};

export default main;
export {
  Primary,
};
