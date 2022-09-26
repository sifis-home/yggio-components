/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import Icon from 'react-icons-kit';
import {
  arrows,
  undo,
  plus,
  minus,
} from 'react-icons-kit/fa';
import {ControlWrapper} from '../styled';
import Button from '../../../../components/button';

const Control = (props) => (
  <ControlWrapper>
    <Button
      onClick={props.handlePlacementMode}
      color={'green'}
      width={'40px'}
      content={<Icon icon={arrows} size={15} />}
    />

    <Button
      onClick={props.handleResetLocation}
      color={'green'}
      width={'40px'}
      content={<Icon icon={undo} size={15} />}
    />

    <Button
      onClick={props.handleZoomIn}
      color={'green'}
      width={'40px'}
      content={<Icon icon={plus} size={15} />}
    />

    <Button
      onClick={props.handleZoomOut}
      color={'green'}
      width={'40px'}
      content={<Icon icon={minus} size={15} />}
    />

  </ControlWrapper>
)

export default Control;
