/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  padding: 13px 15px;
  border: 1px solid green;
  font-size: ${props => props.fontSize || '13px'}
`;

const Dash = styled.p`
  margin: 0 7px;
  cursor: default;
  &:hover{
  text-decoration: none;
  }
`;

const Item = styled.p`
  margin: 0px;
  cursor: pointer;
  &:hover{
    text-decoration: underline;
  }
`;

export {
  Container,
  Dash,
  Item,
};
