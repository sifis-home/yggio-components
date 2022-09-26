/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';
import {COLORS} from '../../constants';

const Wrapper = styled.div`
  margin: ${({margin}) => margin || '0'};
  display: flex;
  flex-direction: column;
  width: ${({width}) => width || '100%'};
`;

const BaseInput = styled.input`
  width: 100%;
  height: ${({height}) => height || '34px'};
  box-sizing: border-box;
  color: ${({color}) => color || COLORS.greyDark};
  background: ${({background}) => background || COLORS.trueWhite};
  border: ${({border, valid}) => {
    const color = valid
      ? COLORS.greenLight
      : COLORS.greyAlt;
    return border || `1px solid ${color}`;
  }};
  border-left: ${({valid}) => {
    const color = valid
      ? COLORS.greenLight
      : COLORS.greyAlt;
    return `5px solid ${color}`;
  }};
  border-radius: ${({borderRadius}) => borderRadius || '3px'};
  padding-left: 10px;
  font-size: 13px;
  transition: border-color .2s;
  &:hover {
    transition: border-color .2s;
  }
  &:focus {
    outline: none;
    transition: border-color .2s;
  }
`;

const BaseSelect = styled.select`
  width: 100%;
  height: ${({height}) => height || '34px'};
  box-sizing: border-box;
  color: ${({color}) => color || COLORS.greyDark};
  background: ${({background}) => background || COLORS.trueWhite};
  border: ${({border}) => border || `1px solid ${COLORS.greyAlt}`};
  border-radius: ${({borderRadius}) => borderRadius || '3px'};
  padding-left: 7px;
  font-size: 13px;
  transition: border-color .2s;
  &:hover {
    border-color: ${COLORS.grey};
    transition: border-color .2s;
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

const BaseTextArea = styled.textarea`
  resize: none;
  box-sizing: border-box;
  width: 100%;
  height: ${({height}) => height || '200px'};
  color: ${({color}) => color || COLORS.greyDark};
  padding: 7px 0 0 10px;
  font-size: 13px;
  background: ${({background}) => background || COLORS.trueWhite};
  border: ${({border}) => border || `1px solid ${COLORS.greyAlt}`};
  border-radius: ${({borderRadius}) => borderRadius || '3px'};
  transition: border-color .2s;
  &:hover {
    border-color: ${COLORS.grey};
    transition: border-color .2s;
  }
  &:focus {
    outline: none;
    border-color: ${COLORS.greyMedium};
    transition: border-color .2s;
  }
`;

const Label = styled.p`
  color: ${COLORS.greyDark};
  margin: 0 0 5px 5px;
  padding: 0;
  font-size: 13px;
`;

export {
  BaseInput,
  BaseSelect,
  BaseTextArea,
  Label,
  Wrapper,
};
