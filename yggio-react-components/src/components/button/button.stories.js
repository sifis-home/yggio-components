/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import Button from './index';
import {YggioFontDecorator} from '../../decorators';

const main = {
  title: 'Components/Button',
  component: Button,
  decorators: [YggioFontDecorator],
  argTypes: {
    label: {
      description: 'The text in the button'
    },
    color: {
      options: ['grey', 'green', 'yellow', 'red', 'blue', 'darkBlue'],
      control: {type: 'radio'},
      description: 'A custom hex code color is also valid',
      table: {
        defaultValue: {summary: 'grey'},
      },
    },
    ghosted: {
      table: {
        defaultValue: {summary: false},
      },
    },
    size: {
      options: ['small', 'medium', 'large', 'full', 'fit'],
      control: {type: 'select'},
      description: 'Sets both width and height',
      table: {
        defaultValue: {summary: 'medium'},
      },
    },
    width: {
      options: ['small', 'medium', 'large', 'full', 'fit'],
      control: {type: 'select'},
      table: {
        defaultValue: {summary: 'medium'},
      },
    },
    height: {
      options: ['small', 'medium', 'large', 'full', 'fit'],
      control: {type: 'select'},
      table: {
        defaultValue: {summary: 'medium'},
      },
    },
    icon: {
      description: 'Show a icon in the button',
      control: false,
    },
    content: {
      description: 'A renderable react component or a text',
      control: false,
    },
  },
};

const Template = args => <Button {...args} />;

const Primary = Template.bind({});
Primary.args = {
  label: 'Im a button'
};

export default main;
export {
  Primary,
};
