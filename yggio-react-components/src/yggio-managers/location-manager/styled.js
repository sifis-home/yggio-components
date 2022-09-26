/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';
import {COLORS} from '../../constants';

const LocationManagerWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  background: ${COLORS.greyLight};
`;

const LocationManagerContainer = styled.div`
  position: relative;
  margin-left: 21%;
  height: 100%;
`;

const LinkWrapper = styled.div`
  width: 100%;
  height: 25px;
  transition: all 0.2s;
  background: ${COLORS.transparent};
  transition: background 0.3s;
  border-radius: 3px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: ${COLORS.greyDark};
    width: 100%;
    height: 100%;
  }

  &:hover {
    transition: background 0.3s;
    background: ${COLORS.grey};
  }
`;

export {
  LocationManagerWrapper,
  LocationManagerContainer,
  LinkWrapper
}
