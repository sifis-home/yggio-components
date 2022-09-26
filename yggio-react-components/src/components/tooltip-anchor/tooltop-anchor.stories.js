/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import TooltipAnchor from './index';

const main = {
  title: 'Components/Tooltip Anchor',
  component: TooltipAnchor,
  argTypes: {
    id: {
      description: 'A page unique id to differentiate if there are multiple TooltipAnchor instances on the same page'
    }
  }
};

const Template = args => <TooltipAnchor {...args} />;

const Primary = Template.bind({});
Primary.args = {
  id: 'myUniqueId',
  text: 'Here is some information for you'
};

export default main;
export {
  Primary,
};
