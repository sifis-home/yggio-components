/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import Chip from './index';
import {YggioFontDecorator} from '../../decorators';

const main = {
  title: 'Components/Chip',
  component: Chip,
  decorators: [YggioFontDecorator],
  argTypes: {
    color: {
      options: ['grey', 'green', 'yellow', 'red', 'blue'],
      control: {type: 'radio'}
    },
    onRemoveClick: {
      action: {action: 'clicked'},
    },
  }
};

const Template = args => <Chip {...args} />;

const Primary = Template.bind({});
Primary.args = {
  text: 'Im a chip',
};

export default main;
export {
  Primary,
};
