/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import Input from './index';
import {YggioFontDecorator} from '../../decorators';

// NOTE: This component is depricated. Use textfield, select, textarea etc instead

const main = {
  title: 'Components/Input',
  component: Input,
  decorators: [YggioFontDecorator],
};

const Template = args => <Input {...args} />;

const Primary = Template.bind({});
Primary.args = {};

export default main;
export {
  Primary,
};
