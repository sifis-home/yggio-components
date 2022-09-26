/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';
import {COLORS} from '../../constants';


const HeaderBase = styled.div`
  display: inline-block;
  vertical-align: top;
  color: ${COLORS.black};
`;

const HeaderTitleName = styled.span`
  font-weight: ${({isSelected}) => (isSelected && 'bold')};
  line-height: 28px;
  vertical-align: middle;
  cursor: pointer;
  font-size: 14px;
`;

const HeaderTitleMeta = styled.span`
  font-weight: bold;
  color: ${COLORS.greyDark};
  padding-left: 15px;
  line-height: 24px;
  vertical-align: middle;
`;

const HeaderToggleBase = styled.button`
  margin-left: 5px;
  height: 24px;
  width: 24px;
`;

const TreeItemContainer = styled.div`
  width: 100%;
`;

const TreeItemsContainer = styled.div`
  margin: 0 0 0 15px;
  padding: 5px 3px 3px 5px;
  width: 100%;
  font-weight: 300;
  border-left: 1px solid #ccc;
`;


const TreeViewContainer = styled.div`
  margin: 3px 0 0 3px;
  padding: 5px 3px 3px 5px;
  width: 100%;
  font-weight: 300;
  border-radius: 5px;
`;

export {
  TreeItemContainer,
  TreeItemsContainer,
  TreeViewContainer,

  HeaderBase,
  HeaderTitleName,
  HeaderTitleMeta,
  HeaderToggleBase,
};
