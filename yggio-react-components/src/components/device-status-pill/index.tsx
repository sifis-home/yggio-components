/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {
  MdCheck as CheckIcon,
  MdWarning as WarningIcon,
  MdError as ErrorIcon,
  MdOutlineInfo as InfoIcon,
} from 'react-icons/md';

import {StatusTypeNames} from '../../constants';

import {
  Container,
  Text,
} from './styled';

interface DeviceStatusPillProps {
  type: StatusTypeNames;
  text: string;
  size?: 'small' | 'large';
  margin?: string;
  onClick?: () => void;
}

const iconsByType = {
  [StatusTypeNames.ok]: <CheckIcon />,
  [StatusTypeNames.warning]: <WarningIcon />,
  [StatusTypeNames.error]: <ErrorIcon />,
  [StatusTypeNames.info]: <InfoIcon />,
};

const DeviceStatusPill = (props: DeviceStatusPillProps) => {
  return (
    <Container
      type={props.type}
      size={props.size || 'small'}
      onClick={() => props.onClick && props.onClick()}
      margin={props.margin}
    >
      {iconsByType[props.type]}
      <Text>{props.text}</Text>
    </Container>
  );
};

export default DeviceStatusPill;
