/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import ContainerBox from './index';
import {DEFAULTS} from './constants';
import {PaddingDecorator, LightGrayBackgroundDecorator} from '../../decorators';

const main = {
  title: 'Components/Container Box',
  component: ContainerBox,
  decorators: [
    PaddingDecorator,
    LightGrayBackgroundDecorator
  ],
  argTypes: {
    maxWidth: {
      table: {defaultValue: {summary: DEFAULTS.maxWidth}}
    },
    minWidth: {
      table: {defaultValue: {summary: DEFAULTS.minWidth}}
    },
    minHeight: {
      table: {defaultValue: {summary: DEFAULTS.minHeight}}
    },
    margin: {
      table: {defaultValue: {summary: DEFAULTS.margin}}
    },
    padding: {
      table: {defaultValue: {summary: DEFAULTS.padding}}
    },
    background: {
      table: {defaultValue: {summary: DEFAULTS.background}}
    },
    position: {
      table: {defaultValue: {summary: DEFAULTS.position}}
    },
    display: {
      table: {defaultValue: {summary: DEFAULTS.display}}
    },
    flexDirection: {
      table: {defaultValue: {summary: DEFAULTS.flexDirection}}
    },
    widthReduction: {
      table: {defaultValue: {summary: DEFAULTS.widthReduction}}
    },
    heightReduction: {
      table: {defaultValue: {summary: DEFAULTS.heightReduction}}
    },
  }
};

const Template = args => (
  <ContainerBox {...args}>
    <p>Content</p>
  </ContainerBox>
);

const Primary = Template.bind({});
Primary.args = {

};

export default main;
export {
  Primary,
};
