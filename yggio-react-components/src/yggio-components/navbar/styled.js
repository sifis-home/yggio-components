/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled, {css} from 'styled-components';

import {COLORS, MEASUREMENTS} from '../../constants';
import {DEFAULTS} from './constants';

const Bar = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 12px;
  height: ${MEASUREMENTS.navDefaultHeight};
  background: ${COLORS.greenRacing};
  color: ${COLORS.white};
  user-select: none;
`;

const ContentWrapper = styled.div`
  width: 100%;
  ${({centered = DEFAULTS.centered, contentWidth = DEFAULTS.contentWidth}) => centered && `max-width: ${contentWidth}px`};
  display: flex;
  justify-content: space-between;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
`;

const navButtonStyles = css`
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transition: background 0.2s;
  }
`;

const NavButtonWithDropdown = styled.div`
  position: relative;
`;

const NavButton = styled.div`
  ${navButtonStyles}
  color: ${({color}) => color || '#E4EEEA'};
  ${({isActive}) => isActive && css`
    background: rgba(255, 255, 255, 0.15);
  `};
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: normal;
`;

const HorizontalMenuStyled = styled.section`
  display: flex;
  margin-left: 30px;
  height: 100%;
  align-items: center;

  @media (max-width: 550px) {
    display: none;
  }
`;

const VerticalMenuStyled = styled.section`
  display: flex;
  position: absolute;
  width: 100%;
  top: ${MEASUREMENTS.navDefaultHeight};
  left: 0;
  background: ${COLORS.greenAlt};
  flex-direction: column;
  padding: 5px 0;

  @media (min-width: 550px) {
    display: none;
  }
`;

const HorizontalLinkButton = styled.div`
  ${navButtonStyles};
  display: flex;
  font-size: 13px;
  margin: 0 5px;
  color: ${COLORS.white};
  text-decoration: none;
  background: ${({active}) => (active ? 'rgba(255, 255, 255, 0.15)' : 'none')};
`;

const VerticalLinkButton = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 13px;
  padding: 0 0 0 20px;
  color: ${COLORS.white};
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  text-decoration: ${({active}) => (active ? 'underline' : 'none')};
  font-weight: ${({active}) => (active ? 'bold' : 'normal')};

  cursor: pointer;

  &:hover {
    transition: background 0.2s, color 0.2s;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ToggleButton = styled.div`
  ${navButtonStyles}
  @media (min-width: 550px) {
    display: none;
  }
`;

const Dropdown = styled.div`
  width: 200px;
  padding: 9px 0;
  background: white;
  position: absolute;
  top: 44px;
  right: 0;
  border-radius: 5px;
  border: 1px solid #d5d5d5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, .1);

  @media (max-width: 300px) {
    position: fixed;
    width: calc(100% - 16px);
    top: 51px;
    right: 8px;
  }
`;

const DropdownParagraph = styled.p`
  color: black;
  font-weight: 500;
  padding: 0 12px;
  font-size: 13px;
  margin: 0;
  word-break: ${({wordBreak}) => wordBreak || 'normal'};
`;

const DropdownHeading = styled(DropdownParagraph)`
  font-weight: 600;
  margin: 5px 0 5px 0;
`;

const DropdownButton = styled(DropdownParagraph)`
  cursor: pointer;
  padding-top: 6px;
  padding-bottom: 6px;
  text-decoration: ${({active}) => (active ? 'underline' : 'none')};
  &:hover {
    background: #eee;
  }
`;

export {
  Bar,
  ContentWrapper,
  Section,
  NavButtonWithDropdown,
  NavButton,
  Title,
  HorizontalMenuStyled,
  VerticalMenuStyled,
  HorizontalLinkButton,
  VerticalLinkButton,
  ToggleButton,
  Dropdown,
  DropdownParagraph,
  DropdownHeading,
  DropdownButton,
};
