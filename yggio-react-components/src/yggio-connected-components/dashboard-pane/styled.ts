/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';

import ContainerBox from '../../components/container-box';
import {COLORS} from '../../constants';

const Heading = styled.h2`
  font-size: 23px;
  color: #222;
  margin: 50px 0 40px 0;
  @media (max-width: 500px){
    margin: 0 0 20px 0;
  }
`;

const GreenText = styled.span`
  color: #21752b;
`;

const CountBoxesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const CountBoxContainer = styled(ContainerBox)`
  min-height: 100px;
  width: 200px;
  height: 80px;
  box-sizing: border-box;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: border-color 200ms;

  &:hover {
    border-color: #21752b;
    transition: border-color 200ms;
  }

  @media (min-width: 980px) {
    width: 19%;
  }
  @media (max-width: 980px) and (min-width: 500px) {
    width: 49%;
  }
  @media (max-width: 500px){
    width: 100%;
  }

  h3 {
    font-size: 25px;
    margin: 0 0 3px 0;
  }
  h4 {
    font-size: 14px;
    color: #555;
    font-weight: normal;
    margin: 0;
  }
`;

const IconContainer = styled.div`
  padding: 0 20px 0 20px;
  color: #3C7D44;
`;

const Version = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px;
  font-size: 0.6em;
`;

const MapWrapper = styled.div`
  margin: 5px 0 20px 0;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, .1);
  border: 1px solid ${COLORS.greyAlt};
`;

export {
  Heading,
  GreenText,
  CountBoxesWrapper,
  CountBoxContainer,
  IconContainer,
  Version,
  MapWrapper,
};
