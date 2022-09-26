/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';

import {COLORS} from '../../constants';

const STEP_MARK_SIZE = 25;
const DESCRIPTION_SIZE = 100;

const TitleContainer = styled.div`
  width: 100%;
  height: 40px;
  text-align: center;
`;

const Title = styled.p`
  font-weight: 500;
  font-size: 15px;
  color: #333;
`;

const BarContainer = styled.div`
  width: calc(100% - 80px);
  margin: 0 40px;
  height: 36px;
  position: relative;
`;

const BarStyled = styled.div`
  width: calc(100% - ${STEP_MARK_SIZE}px);
  height: 6px;
  background: #ccc;
  position: absolute;
  top: 10px;
  left: 13px;
`;

const BarFilling = styled.div`
  width: ${({width}) => `${width}%`};
  height: 6px;
  background: ${COLORS.greenAlt};
`;

const StepMark = styled.div`
  width: ${STEP_MARK_SIZE}px;
  height: ${STEP_MARK_SIZE}px;
  border-radius: 50%;
  position: absolute;
  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 0 0 2px 0;
  box-sizing: border-box;
`;

const FirstStepMark = styled(StepMark)`
  left: 0;
  background: ${COLORS.greenAlt};
`;

const IntermediateStepMark = styled(StepMark)`
  left: ${({position}) => `calc(${position}% - ${STEP_MARK_SIZE / 2}px)`};
  ${({reached}) => reached && `background: ${COLORS.greenAlt}`};
`;

const LastStepMark = styled(StepMark)`
  left: calc(100% - ${STEP_MARK_SIZE}px);
  ${({reached}) => reached && `background: ${COLORS.greenAlt}`};
`;

const DescriptionsContainer = styled.div`
  width: calc(100% - 80px);
  height: 40px;
  margin: 0 40px;
  position: relative;
`;

const StepDescription = styled.p`
  width: 100px;
  margin: 0;
  text-align: center;
  font-size: 12px;
  position: absolute;
`;

const FirstStepDescription = styled(StepDescription)`
  left: ${-DESCRIPTION_SIZE / 2 + STEP_MARK_SIZE / 2}px;
  ${({current}) => current && `font-weight: 500`};
`;

const IntermediateStepDescriptionStyled = styled(StepDescription)`
  left: ${({position}) => `calc(${position}% - ${DESCRIPTION_SIZE / 2}px)`};
  ${({current}) => current && `font-weight: 500`};
`;

const LastStepDescription = styled(StepDescription)`
  left: calc(100% - ${DESCRIPTION_SIZE / 2 + STEP_MARK_SIZE / 2}px);
  ${({current}) => current && `font-weight: 500`};
`;

export {
  TitleContainer,
  Title,
  BarContainer,
  BarStyled,
  BarFilling,
  FirstStepMark,
  IntermediateStepMark,
  LastStepMark,
  DescriptionsContainer,
  FirstStepDescription,
  IntermediateStepDescriptionStyled,
  LastStepDescription,
};
