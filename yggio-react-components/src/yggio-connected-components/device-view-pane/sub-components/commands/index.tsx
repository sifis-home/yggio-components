/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react';

// Logic
import PublishMqttMessage from './sub-components/publish-mqtt-message';
import CommandButtons from './sub-components/command-buttons';
import {Device} from '../../../../types';

interface CommandsProps {
  device: Device;
}

const Commands = (props: CommandsProps) => {
  return (
    <Tabs>
      <TabList>
        <Tab>Publish MQTT message</Tab>
        <Tab>Command buttons</Tab>
      </TabList>
      <TabPanels>
        <TabPanel p={0}>
          <PublishMqttMessage />
        </TabPanel>
        <TabPanel p={0}>
          <CommandButtons device={props.device} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Commands;
