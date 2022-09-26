/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {compose} from 'lodash/fp';

import TabBar from './index';
import state from './state';
import data from './data.json';
import {withState} from '../../hocs';
import {YggioDefaultDecorator} from '../../decorators';

const StatefulTabBar = compose(withState(state))(TabBar);

const main = {
  title: 'Components/Tab Bar',
  component: StatefulTabBar,
  decorators: [YggioDefaultDecorator],
};

const Template = args => <StatefulTabBar {...args} />;

const Primary = Template.bind({});
Primary.args = {
  tabItems: data.normal,
};

export default main;
export {
  Primary,
};
