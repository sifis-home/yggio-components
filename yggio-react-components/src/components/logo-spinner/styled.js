/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';

const GridWrapper = styled.div`
  display: grid;
  width: ${({size, borderSize}) => size + borderSize * 2}px;
  height: ${({size, borderSize}) => size + borderSize * 2}px;
`;
const StackSpinner = styled.div`
  grid-column: 1;
  grid-row: 1;
  z-index: 1;
`;
const StackLogoIcon = styled.div`
  grid-column: 1;
  grid-row: 1;
  z-index: 2;
  margin: ${({margin}) => margin}px;
`;
const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${({size}) => size}px;
    height: ${({size}) => size}px;
    border: ${({borderSize}) => borderSize}px solid ${({color}) => color};
    border-radius: 50%;
    animation: lds-ring ${({speed}) => speed * 1.2}s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({color}) => color} transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -${({speed}) => speed * 0.45}s;
  }
  div:nth-child(2) {
    animation-delay: -${({speed}) => speed * 0.3}s;
  }
  div:nth-child(3) {
    animation-delay: -${({speed}) => speed * 0.15}s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

`;
export {
  GridWrapper,
  StackSpinner,
  StackLogoIcon,
  Spinner,
};
