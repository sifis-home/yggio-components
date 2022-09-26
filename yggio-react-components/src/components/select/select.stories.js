/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import Select from './index';
import {YggioFontDecorator} from '../../decorators';

const main = {
  title: 'Components/Select',
  component: Select,
  decorators: [YggioFontDecorator],
  argTypes: {
    value: {
      control: false,
    }
  }
};

const options = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'strawberry', label: 'Strawberry'},
  {value: 'vanilla', label: 'Vanilla'},
];

const Template = args => {
  const [value, setValue] = React.useState(null);
  return (
    <Select
      {...args}
      value={value}
      onChange={evt => {
        setValue(evt.target.value);
      }}
    />
  );
};

const Primary = Template.bind({});
Primary.args = {
  name: 'testcomponent',
  options,
  value: options[1],

};

export default main;
export {
  Primary,
};
