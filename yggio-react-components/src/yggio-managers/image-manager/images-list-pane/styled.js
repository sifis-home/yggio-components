/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// styled.js

import styled from 'styled-components';

const ImagesListWrapper = styled.div`
  width: 100%;
  background-color: blue;
  padding: 6px;
`;

const ItemWrapper = styled.div`
  width: 100%;
  background-color: #234;
  padding-left: 4px;
  padding-bottom: 4px;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  border-radius: 5px;
`;

const DeletionWrapper = styled.div`
  width: 100%;
  height: 120px;
  background-color: #534;
  padding-left: 4px;
  padding-bottom: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
  border-radius: 5px;
`

const ThumbImage = styled.img`
  background: #345;
  margin-top: 6px;
  margin-left: 4px;
  margin-bottom: 6px;
  width: 120px;
  height: 120px;
  object-fit: contain;
`;

const NameLabel = styled.div`
  color: white;
  padding-left: 10px;
  padding-bottom: 5px;
`;


export {
  ImagesListWrapper,
  ItemWrapper,
  DeletionWrapper,
  ThumbImage,
  NameLabel,
};
