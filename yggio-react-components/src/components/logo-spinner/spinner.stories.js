/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import LogoSpinner from './index';
import {DEFAULTS} from './constants';

const main = {
  title: 'Components/Logo Spinner',
  component: LogoSpinner,
  argTypes: {
    color: {
      table: {defaultValue: {summary: DEFAULTS.color}}
    },
    size: {
      table: {defaultValue: {summary: DEFAULTS.size}}
    },
    speed: {
      table: {defaultValue: {summary: DEFAULTS.speed}}
    },
  }
};

const Template = args => <LogoSpinner {...args} />;

const Primary = Template.bind({});
Primary.args = {};

export default main;
export {
  Primary,
};
