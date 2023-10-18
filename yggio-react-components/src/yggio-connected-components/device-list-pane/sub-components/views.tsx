import React from 'react';
import _ from 'lodash';
import {
  MdAssuredWorkload as ViewIcon,
  MdSave as SaveIcon
} from 'react-icons/md';
import {
  FaFileExport as ExportIcon,
  FaFileImport as ImportIcon,
} from 'react-icons/fa';
import {
  Heading,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../../../constants';
import Button from '../../../components/button';
import {SaveViews, ViewsPresets, ExportView, ImportView} from '.';

import type {ListStateProps} from '../types';
import type {Form} from '../../../types';

interface ViewsProps {
  listState: ListStateProps;
  filterState: Form;
  onClose: () => void;
}

const Views = (props: ViewsProps) => {
  const {t} = useTranslation();

  return (
    <Flex
      h='600px'
      direction='column'
    >
      <Flex
        w='100%'
        h='60px'
        borderBottom={`1px solid ${COLORS.greyLight}`}
        justify='space-between'
        align='center'
        p='20px'
      >
        <h1>{_.capitalize(t('labels.views'))}</h1>
        <Button
          content={t('common.done')}
          onClick={props.onClose}
          ghosted
          width={'fit'}
          height={'30px'}
          padding={'0 15px'}
        />
      </Flex>
      <Tabs>
        <TabList>
          <Tab m='auto'>
            <ViewIcon size={19} />
            <Heading m='0 4px 0' size='xs'>Presets</Heading>
          </Tab>
          <Tab m='auto'>
            <SaveIcon size={19} />
            <Heading m='0 4px 0' size='xs'>Save</Heading>
          </Tab>
          <Tab m='auto'>
            <ExportIcon size={19} />
            <Heading m='0 4px 0' size='xs'>Export</Heading>
          </Tab>
          <Tab m='auto'>
            <ImportIcon size={19} />
            <Heading m='0 4px 0' size='xs'>Import</Heading>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ViewsPresets
              listState={props.listState}
              filterState={props.filterState}
              onClose={props.onClose}
            />
          </TabPanel>
          <TabPanel>
            <SaveViews
              listState={props.listState}
              filterState={props.filterState}
              onClose={props.onClose}
            />
          </TabPanel>
          <TabPanel>
            <ExportView />
          </TabPanel>
          <TabPanel>
            <ImportView />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Views;
