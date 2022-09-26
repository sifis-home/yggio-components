/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import Spinner from './index';
import {DEFAULTS} from './constants';

const main = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    speed: {
      table: {defaultValue: {summary: DEFAULTS.speed}}
    },
    size: {
      table: {defaultValue: {summary: DEFAULTS.size}}
    },
    color: {
      table: {defaultValue: {summary: DEFAULTS.color}}
    },
    margin: {
      table: {defaultValue: {summary: DEFAULTS.margin}}
    },
    icon: {
      table: {defaultValue: {summary: 'react-icons-kit/icomoon/spinner4'}},
      control: false,
    },
  }
};

const Template = args => <Spinner {...args} />;

const Primary = Template.bind({});
Primary.args = {};

export default main;
export {
  Primary,
};
