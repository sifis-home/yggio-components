/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {Icon} from 'react-icons-kit';
import {angleRight as untoggledIcon} from 'react-icons-kit/fa/angleRight';
import {angleDown as toggledIcon} from 'react-icons-kit/fa/angleDown';

import {
  HeaderBase, HeaderTitleName,
  HeaderToggleBase,
} from './styled';


const HeaderToggleButton = props => {
  const onClick = evt => {
    evt.stopPropagation();
    props.onToggled(props.nodeId);
  };
  return (
    <HeaderToggleBase
      onClick={onClick}
    >
      <Icon
        icon={props.isToggled ? toggledIcon : untoggledIcon}
      />
    </HeaderToggleBase>
  );
};

HeaderToggleButton.propTypes = {
  nodeId: PropTypes.string,
  isToggled: PropTypes.bool,
  onToggled: PropTypes.func,
};


const TreeItemHeader = props => {
  const onClick = () => {
    props.onSelected(props.nodeId);
  };
  return (
    <HeaderBase
      onClick={onClick}
    >
      <HeaderTitleName isSelected={props.isSelected}>
        {_.get(props.node, 'name')}
      </HeaderTitleName>
      {!!_.get(props.node, 'children.length') && (
        <HeaderToggleButton
          isToggled={props.isToggled}
          nodeId={_.get(props.node, '_id')}
          onToggled={props.onToggled}
        />
      )}
    </HeaderBase>
  );
};

TreeItemHeader.propTypes = {
  node: PropTypes.object,
  isSelected: PropTypes.bool,
  onSelected: PropTypes.func,
  isToggled: PropTypes.bool,
  onToggled: PropTypes.func,
};

export {
  TreeItemHeader,
};
