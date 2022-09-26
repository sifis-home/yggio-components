/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import DatePicker from './index';
import {YggioFontDecorator} from '../../decorators';

const main = {
  title: 'Components/Date Picker',
  component: DatePicker,
  decorators: [YggioFontDecorator],
};

const Template = args => <DatePicker {...args} />;

const Primary = Template.bind({});
Primary.args = {};

export default main;
export {
  Primary,
};
