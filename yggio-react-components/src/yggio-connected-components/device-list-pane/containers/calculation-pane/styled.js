/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';
import ContainerBox from '../../../../components/container-box';
import {COLORS} from '../../../../constants';
import {FlexColWrapper, FlexMaxWidthSpaceBetweenWrapper, FlexWrapper} from '../../../../global/styled';
import DatePicker from '../../../../components/date-picker';

const CalculationPaneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 45px);
`;

const CalculationContainerBox = styled(ContainerBox)`
  display: flex;
  flex-direction: column;

  @media (min-width:800px)  {
    width: 800px;
    padding: 20px;
  }
`;

const CalculationProgressContainer = styled.div`
  width: 800px;
  margin: 20px 0 5px;
`;

const CalculationTitle = styled(FlexWrapper)`
  align-items: center;
`;

const CreateCalculationText = styled.span`
  color: ${COLORS.greyMedium};
`;

const CreateCalculationDescription = styled.span`
  font-size: 0.8em;
  display: flex;
  align-items: center;
  height: 60px;
`;

const CreateCalculationButtonContainer = styled(FlexMaxWidthSpaceBetweenWrapper)`
  height: 100px;
  align-items: flex-end;
`;

const CalculationParagraph = styled.p`
  font-size: 0.8em;
`;

const CalculationSpan = styled.span`
  font-size: 0.8em;
`;

const MarginFlexColWrapper = styled(FlexColWrapper)`
  margin: 10px;
`;

const CalculationIntervalContainer = styled(FlexWrapper)`
  width: 500px;
  margin-bottom: 10px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 220px;
`;

export {
  CalculationPaneWrapper,
  CalculationContainerBox,
  CalculationProgressContainer,
  CalculationTitle,
  CreateCalculationText,
  CreateCalculationDescription,
  CreateCalculationButtonContainer,
  CalculationParagraph,
  CalculationSpan,
  MarginFlexColWrapper,
  CalculationIntervalContainer,
  StyledDatePicker,
};
