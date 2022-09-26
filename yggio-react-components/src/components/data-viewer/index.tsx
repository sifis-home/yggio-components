/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {Box, Text, Flex} from '@chakra-ui/react';
import Tree, {useTreeState, DefaultNodeProps} from 'react-hyper-tree';
import Icon from 'react-icons-kit';
import {ic_chevron_right as chevronRightIcon} from 'react-icons-kit/md/ic_chevron_right';
import {ic_expand_more as chevronDownIcon} from 'react-icons-kit/md/ic_expand_more';

import {COLORS} from '../../constants';
import {DataViewerProps} from './types';
import {createTreeData} from './utils';
import {VALUE_STYLES} from './constants';

type DataName = {
  name: {
    key: string;
    type: keyof typeof VALUE_STYLES;
    value: string;
  };
};

const CustomNode = (props: DefaultNodeProps) => {
  const {name} = props.node.data as DataName;

  return (
    <Flex
      fontSize={'0.8rem'}
      cursor={'pointer'}
      transition={'all 0.2s'}
      _hover={{
        background: COLORS.greyAlt,
      }}
      h={'20px'}
      onClick={props.onToggle}
    >
      {props.node.options.hasChildren && (
        <Text margin={'0 5px 0 0'}>
          {!props.node.options.opened
            ? <Icon icon={chevronRightIcon as object} />
            : <Icon icon={chevronDownIcon as object} />} {name.key}
        </Text>
      )}
      {!props.node.options.hasChildren && (
        <Text padding={'0 0 0 18px'} margin={'0 5px 0 0'}>
          {name.key}:
        </Text>
      )}
      <Text
        color={VALUE_STYLES[name.type]?.color}
        fontStyle={VALUE_STYLES[name.type]?.fontStyle}
        fontWeight={VALUE_STYLES[name.type]?.fontWeight}
      >
        {name.value}
      </Text>
    </Flex>
  );
};


const DataViewer = (props: DataViewerProps) => {
  const data = createTreeData(props.data);
  const {required, handlers} = useTreeState({
    data,
    id: 'data',
  });

  return (
    <Box>
      <Tree
        renderNode={CustomNode}
        disableLines
        {...required}
        {...handlers}
      />
    </Box>
  );
};

export default DataViewer;
