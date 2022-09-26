/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import Breadcrumbs from './index';
import {YggioFontDecorator} from '../../decorators';

const main = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  decorators: [YggioFontDecorator],
  argTypes: {
    crumbs: {
      control: false,
    }
  }
};

const Template = args => <Breadcrumbs {...args} />;

const Primary = Template.bind({});
Primary.args = {
  crumbs: ['Devices', 'MyDevice', 'Details'],
};

export default main;
export {
  Primary,
};
