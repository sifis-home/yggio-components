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

import {compose} from 'lodash/fp';
import {Collapse} from 'react-collapse';
import {withState} from '../../hocs';
import state from './state';

import {
  TreeItemContainer,
  TreeItemsContainer,
  TreeViewContainer,
} from './styled';

import {
  TreeItemHeader,
} from './sub-components';


const TreeItem = props => {
  const isSelected = props.node._id === props.selectedNodeId;
  const isToggled = !!props.toggleState[props.node._id];

  const onSelected = () => {
    props.onNodeSelected(props.node._id);
  };
  const onToggled = nodeId => {
    props.setToggleState(nodeId, !isToggled);
  };

  return (
    <TreeItemContainer>
      <TreeItemHeader
        node={props.node}
        isSelected={isSelected}
        isToggled={isToggled}
        onSelected={onSelected}
        onToggled={onToggled}
      />
      {!!_.get(props.node, 'children.length') && (
        <Collapse isOpened={props.toggleState[props.node._id]}>
          <TreeItemsContainer>
            {_.map(props.node.children, node => (
              <TreeItem
                key={node._id}
                node={node}
                selectedNodeId={props.selectedNodeId}
                onNodeSelected={props.onNodeSelected}
                toggleState={props.toggleState}
                setToggleState={props.setToggleState}
              />
            ))}
          </TreeItemsContainer>
        </Collapse>
      )}
    </TreeItemContainer>
  );
};
TreeItem.propTypes = {
  // from top
  node: PropTypes.object, // with "toggled" data
  selectedNodeId: PropTypes.string,
  onNodeSelected: PropTypes.func,
  // from state
  toggleState: PropTypes.object,
  setToggleState: PropTypes.func.isRequired,
};


const BasicTreeView = props => (
  <TreeViewContainer>
    <TreeItem
      node={props.treeData}
      selectedNodeId={props.selectedNodeId}
      onNodeSelected={props.onNodeSelected}
      toggleState={props.toggleState}
      setToggleState={props.setToggleState}
    />
  </TreeViewContainer>
);

BasicTreeView.propTypes = {
  // from top
  treeData: PropTypes.object, // with "toggled" data
  selectedNodeId: PropTypes.string,
  onNodeSelected: PropTypes.func,
  // from state
  toggleState: PropTypes.object,
  setToggleState: PropTypes.func.isRequired,
};

const TreeView = compose(
  withState(state),
)(BasicTreeView);


TreeView.propTypes = {
  // from top
  treeData: PropTypes.object,
  selectedNodeId: PropTypes.string,
  onNodeSelected: PropTypes.func,
};

export default TreeView;
export {
  BasicTreeView,
  state,
};
