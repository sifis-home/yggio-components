/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import PropTypes from 'prop-types';

import {CollapsibleElement, Content, Label} from './styled';

const Collapsible = props => {
  return (
    <CollapsibleElement
      openedHeight={props.openedHeight}
      closedHeight={props.closedHeight}
      open={props.open}
    >
      <Label
        onClick={props.onClick}
        open={props.open}
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

Collapsible.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
  open: PropTypes.bool,
  openedHeight: PropTypes.string,
  closedHeight: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Collapsible;
