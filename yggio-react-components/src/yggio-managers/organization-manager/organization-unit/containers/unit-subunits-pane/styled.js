/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';
import {COLORS} from '../../../../../constants';

const Wrapper = styled.div`
  padding: 20px 0 0 0;
  h1 {
    font-size: 20px;
    margin: 0 0 20px 0;
  }
`;

const Subunit = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 5px;
  border-bottom: 1px solid ${COLORS.greyLight};
`;

const SubunitName = styled.p`
  text-decoration: underline;
  cursor: pointer;
`;

const SubunitNumChildren = styled.p`
  color: gray;
`;

export {
  Wrapper,
  Subunit,
  SubunitName,
  SubunitNumChildren,
};
