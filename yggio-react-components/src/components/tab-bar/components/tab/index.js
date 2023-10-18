/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
  TabLabel,
  MetaBlob,
  TabWrapper,
} from '../../styled';


const Tab = props => {
  return (
    <TabWrapper
      vertical={props.vertical}
      onClick={() => props.onTabClick(props.tabId)}
      isActive={props.isActive}
    >
      <TabLabel fontSize={props.fontSize}>
        {props.label}
      </TabLabel>

      {props.meta && (
        <MetaBlob>
          {props.meta}
        </MetaBlob>
      )}
    </TabWrapper>
  );
};

Tab.propTypes = {
  onTabClick: PropTypes.func,
  isActive: PropTypes.bool,
  tabId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.string,
};

export default Tab;
