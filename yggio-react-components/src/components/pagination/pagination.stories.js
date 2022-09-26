/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import Pagination from './index';
import {YggioFontDecorator} from '../../decorators';
import t from '../../utils/translation-prop';

const main = {
  title: 'Components/Pagination',
  component: Pagination,
  decorators: [YggioFontDecorator],
};

const Template = args => {
  return <Pagination {...args} />;
};

const Primary = Template.bind({});
Primary.args = {
  totalItemsCount: 120,
  pageSize: 20,
  page: 1,
  onChange: () => null,
  t,
};

export default main;
export {
  Primary,
};
