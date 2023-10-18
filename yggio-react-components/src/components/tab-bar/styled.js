/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';
import {COLORS} from '../../constants';

const TabsContainer = styled.ol`
  display: flex;
  overflow-x: auto;
  padding: 0;
  border-bottom: ${({vertical}) => !vertical && `1px solid ${COLORS.greyLight}`};

  width: ${({vertical}) => vertical && '100%'};
  flex-direction: ${({vertical}) => vertical && 'column'};

  &::before, &::after {
    content: '';
    margin: auto;
  }
`;

const TabWrapper = styled.li`
  display: flex;
  align-items: center;
  margin: 0 0.1em 0;
  padding: 0.5em 0.9em 0.5em;
  cursor: pointer;
  font-weight: ${({isActive}) => isActive && 'bold'};
  opacity: ${({isActive}) => (isActive ? '1' : '0.7')};
  border-bottom: 2px solid ${({isActive, vertical}) => {
    if (vertical) {
      return isActive ? COLORS.greenAlt : COLORS.greyLight;
    }

    return isActive ? COLORS.greenAlt : 'transparent';
  }};
  transition: all 0.3s;

  &:hover {
    transition: all 0.3s;
    opacity: 1;
    border-bottom: 2px solid ${({isActive}) => (isActive ? COLORS.greenDark : COLORS.greyAlt)}
  }
`;

const TabLabel = styled.div`
  text-transform: capitalize;
  font-size: ${({fontSize}) => fontSize || '0.85em'};
  white-space: nowrap;
`;

const MetaBlob = styled.div`
  margin-top: 0.3em;
  margin-left: 0.5em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  border-radius: 1em;
  font-size: 0.7em;
  white-space: nowrap;
  background: ${COLORS.greyAlt};
`;

export {
  TabsContainer,
  TabWrapper,
  TabLabel,
  MetaBlob,
};
