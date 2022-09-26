/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 25% 25% 20% 20% 5%;
  margin-bottom: -1px;
`;

const DeviceTypeContainer = styled.div`
  text-transform: capitalize;
  margin: 13px 0px 0px 10px;
  font-size: 13px;
`;
const Item = styled.div`
  margin: 0px;
  border: solid 1px #D0D0D0;
  border-right: none;
`;

const ButtonItem = styled.div`
  border: solid 1px #D0D0D0;
`;

const ArrowContainer = styled.div`
  margin: 2px 0px 0px 0px;
  text-align: center;
`;

const RemoveButton = styled.div`
  margin-top: 12px;
  text-align: center;
  color: #ff0000;
  &:hover {
    color: #990000;
    cursor: pointer;
  }
`;

const IconContainer = styled.div`
  color: #696969;
  &:hover:hover {
  color: black;
  cursor: pointer;
}
`;

const ArrowItem = styled.div`
  margin: 0px;
  border: solid 1px #D0D0D0;
  border-right: none;
`;

export {
  Container,
  Item,
  ArrowContainer,
  RemoveButton,
  DeviceTypeContainer,
  IconContainer,
  ButtonItem,
  ArrowItem,
};
