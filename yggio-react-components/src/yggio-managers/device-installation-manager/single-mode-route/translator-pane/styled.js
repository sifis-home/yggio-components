/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';
import COLORS from '../../../../constants/colors';

const FetchTranslatorLoadingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CollapsableButtonIconWrapper = styled.div`
  display: inline-block;
  color: ${COLORS.black};
`;

const CollapsableButton = styled.div`
  justify-content: center;
  cursor: pointer;
  display: inline-block;
  color: ${COLORS.greenDark};
  display: flex;
  font-size: 13px;
  align-items: center;
  margin-top: 10px;
`;

const SubLink = styled.p`
  display: inline-block;
  color: ${COLORS.greenDark};
  text-decoration: underline;
  margin: 0 0 5px 0;
  cursor: pointer;
`;

const CurrentlyUsing = styled.p`
  margin: 0;
  text-align: center;
`;

const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 25% 20% 25%;
  font-size: 13px;
  margin-top: 15px;
`;

const InfoItem = styled.div`
  margin: 0 0 5px 0;
`;

export {
  FetchTranslatorLoadingContainer,
  CollapsableButtonIconWrapper,
  CollapsableButton,
  SubLink,
  CurrentlyUsing,
  TitleContainer,
  InfoItem,
};
