/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// styled.js

import styled from 'styled-components';

const ItemWrapper = styled.div`
  width: 100%;
  background-color: blue;
  display: flex;
  align-items: center;
`;

const ThumbImage = styled.img`
  margin-top: 4px;
  margin-left: 4px;
  margin-bottom: 4px;
  width: 120px;
  height: 120px;
  object-fit: contain;
`;

const NameLabel = styled.div`
  color: white;
`;


export {
  ItemWrapper,
  ThumbImage,
  NameLabel,
};
