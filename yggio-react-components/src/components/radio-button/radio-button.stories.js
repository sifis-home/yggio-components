/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import RadioButton from './index';
import {DEFAULTS} from './constants';

const main = {
  title: 'Components/Radio Button',
  component: RadioButton,
  argTypes: {
    isSelected: {
      table: {defaultValue: {summary: false}}
    },
    isLoading: {
      table: {defaultValue: {summary: false}}
    },
    size: {
      table: {defaultValue: {summary: DEFAULTS.containerButtonSize}}
    },
    margin: {
      table: {defaultValue: {summary: DEFAULTS.containerButtonMargin}}
    },
    padding: {
      table: {defaultValue: {summary: DEFAULTS.padding}}
    },
    containerButtonPadding: {
      table: {defaultValue: {summary: DEFAULTS.containerButtonPadding}}
    },
    disabled: {
      table: {defaultValue: {summary: false}}
    },
  }
};

const Template = args => <RadioButton {...args} />;

const Primary = Template.bind({});
Primary.args = {};

export default main;
export {
  Primary,
};
