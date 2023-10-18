/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';

import {CollapsibleProps} from './types';
import {CollapsibleElement, Content, Label} from './styled';

const Collapsible = (props: CollapsibleProps) => {
  return (
    <CollapsibleElement
      openedHeight={props.openedHeight}
      closedHeight={props.closedHeight}
      open={props.open}
    >
      <Label
        onClick={props.onClick}
      >
        {props.label}
      </Label>

      <Content
        open={props.open}
      >
        {props.children}
      </Content>
    </CollapsibleElement>
  );
};

export default Collapsible;
