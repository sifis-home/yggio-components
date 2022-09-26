/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {Icon} from 'react-icons-kit';
import {ic_gps_fixed as crosshairsIcon} from 'react-icons-kit/md/ic_gps_fixed';
import {ic_delete as deleteIcon} from 'react-icons-kit/md/ic_delete';
import {pencil as editIcon} from 'react-icons-kit/fa/pencil';
import {chevronDown as chevronDownIcon} from 'react-icons-kit/fa/chevronDown';
import {chevronUp as chevronUpIcon} from 'react-icons-kit/fa/chevronUp';
import {IconWrapper} from './styled';

const DEFAULT_ICON_SIZE = 20;

const MapPointerIconButton = props => {
  return (
    <IconWrapper {...props}>
      <Icon size={DEFAULT_ICON_SIZE} icon={crosshairsIcon} />
    </IconWrapper>
  );
};

const DeleteIconButton = props => {
  return (
    <IconWrapper {...props}>
      <Icon size={DEFAULT_ICON_SIZE} icon={deleteIcon} />
    </IconWrapper>
  );
};

const EditIconButton = props => {
  return (
    <IconWrapper {...props}>
      <Icon size={DEFAULT_ICON_SIZE} icon={editIcon} />
    </IconWrapper>
  );
};

const ChevronDownIconButton = props => {
  return (
    <IconWrapper {...props}>
      <Icon size={DEFAULT_ICON_SIZE} icon={chevronDownIcon} />
    </IconWrapper>
  );
};

const ChevronUpIconButton = props => {
  return (
    <IconWrapper {...props}>
      <Icon size={DEFAULT_ICON_SIZE} icon={chevronUpIcon} />
    </IconWrapper>
  );
};

export {
  MapPointerIconButton,
  DeleteIconButton,
  EditIconButton,
  ChevronDownIconButton,
  ChevronUpIconButton,
};
