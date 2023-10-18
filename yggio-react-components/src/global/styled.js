/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled, {css} from 'styled-components';
import {MEASUREMENTS, COLORS} from '../constants';

const MarginWrapper = styled.div`
  margin: ${({margin}) => margin || '5px'};
`;

const CommonWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: ${({justifyContent}) => justifyContent};
  align-items: ${({alignItems}) => alignItems};
  width: ${({maxWidth}) => maxWidth && '100%'};
  margin: ${({margin}) => margin};
`;

const FlexColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({justifyContent}) => justifyContent};
  align-items: ${({alignItems}) => alignItems};
  margin: ${({margin}) => margin};
`;

const FlexColSpaceBetweenWrapper = styled(FlexColWrapper)`
  justify-content: space-between;
  height: 100%;
`;

const FlexSpaceBetweenWrapper = styled(FlexWrapper)`
  justify-content: space-between;
`;

const FlexMaxWidthWrapper = styled(FlexWrapper)`
  width: 100%;
  padding: ${({padding}) => padding};
`;

const FlexMaxWidthCenterWrapper = styled(FlexMaxWidthWrapper)`
  justify-content: center;
  align-items: center;
`;

const FlexMaxWidthSpaceAroundWrapper = styled(FlexMaxWidthWrapper)`
  justify-content: space-around;
  align-items: center;
`;

const FlexMaxWidthSpaceBetweenWrapper = styled(FlexMaxWidthWrapper)`
  justify-content: space-between;
  align-items: center;
`;

const FlexColMaxWidthWrapper = styled(FlexColWrapper)`
  width: 100%;
  margin: ${({margin}) => margin};
`;

const FlexColCenterMaxWidthWrapper = styled(FlexColMaxWidthWrapper)`
  align-items: center;
  justify-content: center;
`;

const ComponentWrapper = styled.div`
  height: calc(100vh - ${MEASUREMENTS.navDefaultHeight});
`;

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #eee;
`;

const CenterContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const commonInputStyles = css`
  border: solid 1px ${props => (props.isInvalid ? '#ff8787' : COLORS.grey)};
  border-radius: 4px;
  padding-left: 10px;
  font-size: 13px;
  margin: 0;
  outline: none;
  color: ${COLORS.greyDark};
  &:disabled {
    background: #f2f2f2;
    border-color: #e6e6e6;
  }
`;

const resolveInputFocusBoxShadow = ({isInvalid, disableBlueFocusOutline}) => {
  if (isInvalid) {
    return '0 0 2px 1px #ff8787';
  }
  if (!disableBlueFocusOutline) {
    return '0 0 2px 1px #4287f5';
  }
  return 'none';
};

const resolveInputFocusBorderColor = ({isInvalid, disableBlueFocusOutline}) => {
  if (!disableBlueFocusOutline || isInvalid) {
    return 'transparent';
  }
  return COLORS.greyMedium;
};

const inputFocusStyle = css`
  &:focus {
    box-shadow: ${props => resolveInputFocusBoxShadow(props)};
    border-color: ${props => resolveInputFocusBorderColor(props)}
  }
`;

const HorizontalLine = styled.div`
  width: ${({width}) => width || '100%'};
  height: ${({height}) => height || '1px'};
  margin: ${({margin}) => margin || '5px 0 5px'};
  background: ${({background}) => background || COLORS.grey};
`;

// Heading bar

const HeadingBarContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 5px 0;
  flex-wrap: wrap;
`;

const HeadingBarLeftSection = styled.div`
  width: 40px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #ccc;
  margin: 5px 13px 5px 0;
  flex-shrink: 0;

  @media (min-width: ${({siblingWidth}) => siblingWidth + 290}px) {
    display: none;
  }
`;

const HeadingBarMiddleSection = styled.div`
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin: 5px 0;
  color: #333;
`;

const HeadingBarMiddleIcon = styled.div`
  margin: 0 7px 0 0;
  @media (max-width: ${({siblingWidth}) => siblingWidth + 289}px) {
    display: none;
  }
`;

const HeadingBarRightSection = styled.div`
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  margin: 5px 0;
`;

const ToggleSidebarButton = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    background: #ddd;
  }
`;

const TextParagraph = styled.p`
  font-size: ${({fontSize}) => fontSize};
`;

const ErrorView = styled.div`
  width: 100%;
  margin-top: 100px;
  text-align: center;
  color: #666;
  font-size: 18px;
`;

export {
  CommonWrapper,
  MarginWrapper,
  FlexWrapper,
  FlexColWrapper,
  FlexColSpaceBetweenWrapper,
  FlexMaxWidthWrapper,
  FlexMaxWidthCenterWrapper,
  FlexMaxWidthSpaceAroundWrapper,
  FlexMaxWidthSpaceBetweenWrapper,
  FlexColMaxWidthWrapper,
  FlexColCenterMaxWidthWrapper,
  ComponentWrapper,
  AppWrapper,
  CenterContentContainer,
  commonInputStyles,
  inputFocusStyle,
  FlexSpaceBetweenWrapper,
  HorizontalLine,

  HeadingBarContainer,
  HeadingBarLeftSection,
  HeadingBarMiddleSection,
  HeadingBarMiddleIcon,
  HeadingBarRightSection,
  ToggleSidebarButton,
  TextParagraph,
  ErrorView,
};
