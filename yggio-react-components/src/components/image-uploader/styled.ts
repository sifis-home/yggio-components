/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';
import {COLORS} from '../../constants';

const ImageDropZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLORS.greyLightAlt};
  color: ${COLORS.greyMedium};
  border: 1px solid ${COLORS.greenRacing};
  border-radius: 5px;
  width: 220px;
  height: 100px;
  transition: background 0.2s;

  &:hover {
    background: ${COLORS.greyLight};
    transition: background 0.2s;
  }
`;

export {
  ImageDropZone,
};
