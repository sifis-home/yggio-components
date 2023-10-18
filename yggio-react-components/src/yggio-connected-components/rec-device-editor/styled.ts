/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';

const RecHeading = styled.p`
  margin: 0 0 15px 0;
  font-size: 13px;
  font-weight: bold;
  color: #555;
`;

const RecItem = styled.div`
  display: flex;
  margin: 0 0 15px 0;
`;

const RecItemTitle = styled.p`
  margin: 0 8px 0 0;
  font-size: 13px;
  font-weight: bold;
`;

const RecItemText = styled.p`
  margin: 0;
  font-size: 13px;
`;

const ProvisionLoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 13px;
    margin: 0 0 0 7px;
    color: #333;
  }
`;

export {
  RecHeading,
  RecItem,
  RecItemTitle,
  RecItemText,
  ProvisionLoadingWrapper,
};
