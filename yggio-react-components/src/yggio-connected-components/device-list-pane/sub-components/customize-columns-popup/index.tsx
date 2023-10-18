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
