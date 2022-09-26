/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import TextArea from './index';
import {DEFAULTS} from './constants';

const main = {
  title: 'Components/Text Area',
  component: TextArea,
  argTypes: {
    height: {
      table: {defaultValue: {summary: DEFAULTS.height}}
    },
    resize: {
      table: {defaultValue: {summary: DEFAULTS.resize}}
    },
  }
};

const Template = args => <TextArea {...args} onChange={() => null} />;

const Primary = Template.bind({});
Primary.args = {};

export default main;
export {
  Primary,
};
