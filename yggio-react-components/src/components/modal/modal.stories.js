/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import {Modal} from './index';
import {DEFAULTS} from './constants';
import {YggioFontDecorator} from '../../decorators';

const main = {
  title: 'Components/Modal',
  component: Modal,
  decorators: [YggioFontDecorator],
  argTypes: {
    width: {
      table: {defaultValue: {summary: DEFAULTS.width}}
    },
    padding: {
      table: {defaultValue: {summary: DEFAULTS.padding}}
    },
    shouldCloseOnOverlayClick: {
      table: {defaultValue: {summary: DEFAULTS.shouldCloseOnOverlayClick}}
    },
    children: {
      control: false,
    },
  }
};

const Template = args => (
  <Modal {...args}>
    <p>Content</p>
  </Modal>
);

const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
};

export default main;
export {
  Primary,
};
