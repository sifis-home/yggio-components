/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';

const InteractiveLayerContainer = styled.div`
width: 100%;
height: 100%;
position: relative;
user-select: none;
cursor: ${({position}) => (position ? 'grabbing' : 'default')};
`;

export {
  InteractiveLayerContainer,
};
