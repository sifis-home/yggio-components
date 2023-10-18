/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {Box, Tooltip} from '@chakra-ui/react';

import {COLORS} from '../../constants';

const SoftwareQuality = ({quality}: {quality: number}) => {
  const determineColor = () => {
    switch (!_.isUndefined(quality)) {
      case quality < 60:
        return COLORS.red;
      case quality >= 60 && quality < 80:
        return COLORS.yellow;
      case quality >= 80:
        return COLORS.green;
      default:
        return COLORS.grey;
    }
  };
  return (
    <Tooltip label={`Software Quality: ${quality}%`} placement='auto'>
      <Box
        m='0 5px 0'
        bg={determineColor()}
        w='10px'
        h='10px'
        borderRadius={'5px'}
      />
    </Tooltip>
  );
};

export default SoftwareQuality;
