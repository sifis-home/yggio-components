/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import DataViewer from './index';
import {DEFAULTS} from './constants';
import {YggioFontDecorator} from '../../decorators';

const main = {
  title: 'Components/Data Viewer',
  component: DataViewer,
  decorators: [YggioFontDecorator],
  argTypes: {
    data: {
      description: 'The data to display',
      control: false,
    },
    width: {
      table: {defaultValue: {summary: DEFAULTS.width}}
    },
    margin: {
      table: {defaultValue: {summary: DEFAULTS.margin}}
    },
  }
};

const data = {
  devEui: '70b3d52c00000208',
  sensorType: undefined,
  timestamp: '2021-08-11T15:01:26.701124Z',
  payload: '',
  spreadingFactor: null,
  anarray: [
    5,
    7,
  ],
  anobject: {
    name: 'michael',
    age: 29,
  },
  aBool: true,
  rssi: -106,
  snr: {
    anobject: {
      name: 'michael',
      age: 29,
      anobject: {
        name: 'michael',
        age: 29,
        anobject: {
          name: 'michael',
          age: 29,
          anobject: {
            name: 'michael',
            age: 29,
          },
        },
      },
    },
  },
  gatewayIdentifier: 538,
  fPort: 1,
};


const Template = args => <DataViewer {...args} />;

const Primary = Template.bind({});
Primary.args = {
  data,
};

export default main;
export {
  Primary,
};
