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
