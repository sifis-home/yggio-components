/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import TreeView from './index';
import storiesData from './stories-data.json';

const main = {
  title: 'Components/Tree View',
  component: TreeView,
};

const Template = args => <TreeView {...args} />;

const Primary = Template.bind({});
Primary.args = {
  treeData: storiesData.root,
  onNodeSelected: () => null,
};

export default main;
export {
  Primary,
};
