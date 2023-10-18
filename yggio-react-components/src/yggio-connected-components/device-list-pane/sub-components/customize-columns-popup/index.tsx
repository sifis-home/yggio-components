/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {
  Tabs,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';


import Header from './header';
import Panel from './panel';
import NewColumn from './new';

import type {Column} from '../../constants';

interface CustomizeColumnsPopupProps {
  onClose: () => void;
  setColumns: (columns: Column[]) => void;
  columns: Column[];
}

const CustomizeColumnsPopup = (props: CustomizeColumnsPopupProps) => {
  const [tabIndex, setTabIndex] = React.useState(0);


  return (
    <>
      <Tabs index={tabIndex} onChange={index => setTabIndex(index)} variant='unstyled'>
        <Header
          tabIndex={tabIndex}
          onClose={props.onClose}
        />
        <TabPanels>
          <TabPanel>
            <Panel
              columns={props.columns}
              setColumns={props.setColumns}
            />
          </TabPanel>
          <TabPanel>
            <NewColumn
              setTabIndex={setTabIndex}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default CustomizeColumnsPopup;
