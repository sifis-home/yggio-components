/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {useTranslation} from 'react-i18next';
import _ from 'lodash';
import {
  TabList,
  Tab,
  Flex,
  Center,
} from '@chakra-ui/react';

import Button from '../../../../components/button';
import {
  CustomizeColumnsHeader,
} from '../../styled';
import {COLORS} from '../../../../constants';

interface HeaderProps {
  onClose: () => void;
  tabIndex: number;
}

const Header = (props: HeaderProps) => {
  const {t} = useTranslation();

  return (
    <CustomizeColumnsHeader>
      {t('labels.customizeColumns')}
      <Flex>
        <TabList m='0 5px 0'>
          <Tab w={props.tabIndex === 1 ? '60px' : '0'} h='30px' p='0'>
            {props.tabIndex === 1 && (
              <Center
                border={`1px solid ${COLORS.grey}`}
                width={'fit'}
                height={'30px'}
                padding={'0 15px'}
              >
                {_.capitalize(t('labels.back'))}
              </Center>
            )}
          </Tab>
          <Tab w={props.tabIndex === 0 ? '60px' : '0'} h='30px' p='0'>
            {props.tabIndex === 0 && (
              <Center
                fontSize='0.9em'
                color='white'
                bg='green'
                width={'fit'}
                height={'30px'}
                padding={'0 15px'}
              >
                {_.capitalize(t('common.new'))}
              </Center>
            )}
          </Tab>
        </TabList>
        <Button
          content={t('common.done')}
          onClick={props.onClose}
          ghosted
          width={'fit'}
          height={'30px'}
          padding={'0 15px'}
        />
      </Flex>
    </CustomizeColumnsHeader>

  );
};

export default Header;
