/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import InfoBox from './index';
import {DEFAULTS} from './constants';
import {YggioFontDecorator} from '../../decorators';

const main = {
  title: 'Components/Info Box',
  component: InfoBox,
  decorators: [YggioFontDecorator],
  argTypes: {
    content: {
      description: 'Either a string or a react component',
      control: {type: 'text'},
    },
    type: {
      table: {defaultValue: {summary: DEFAULTS.type}}
    },
    margin: {
      table: {defaultValue: {summary: DEFAULTS.margin}}
    },
  }
};

const Template = args => <InfoBox {...args} />;

const Primary = Template.bind({});
Primary.args = {
  heading: 'Im an info box'
};

export default main;
export {
  Primary,
};
