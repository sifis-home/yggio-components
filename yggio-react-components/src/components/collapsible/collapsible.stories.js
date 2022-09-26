/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import Collapsible from './index';
import {DEFAULT_CLOSED_HEIGHT, DEFAULT_OPENED_HEIGHT} from './constants';
import {YggioFontDecorator} from '../../decorators';

const main = {
  title: 'Components/Collapsible',
  component: Collapsible,
  decorators: [YggioFontDecorator],
  argTypes: {
    label: {control: false},
    open: {control: false},
    openedHeight: {
      description: 'Should be the height of the child element',
      table: {
        defaultValue: {
          summary: DEFAULT_OPENED_HEIGHT,
        },
      },
    },
    closedHeight: {
      description: 'Should be the height of the label element',
      table: {
        defaultValue: {
          summary: DEFAULT_CLOSED_HEIGHT,
        },
      },
    },
    children: {
      description: 'Note this is not a prop but the elements child instead',
      control: false,
    },
  },
};

const Label = () => (
  <div style={{width: '200px', background: '#999'}}>
    {'CLICK ME'}
  </div>
);

const Content = () => (
  <div style={{width: '200px', background: '#ddd'}}>
    Content
  </div>
);

const Template = args => {
  const [open, setOpen] = React.useState(false);
  return (
    <Collapsible {...args} open={open} onClick={() => setOpen(!open)}>
      <Content />
    </Collapsible>
  );
};

const Primary = Template.bind({});
Primary.args = {
  label: <Label />,
};

export default main;
export {
  Primary,
};
