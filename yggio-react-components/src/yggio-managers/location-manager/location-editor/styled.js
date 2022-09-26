/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';
import {Icon} from 'react-icons-kit';
import {COLORS} from '../../../constants';

const SpinnerWrapper = styled.div`
  z-index: 10;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(50, 50, 50, 0.3);
`;

const InputWrapper = styled.div`
  position: relative;
  margin: 10px;
  width: calc(100% - 20px);
`;

const Label = styled.label`
  display: flex;
  width: ${({width}) => width};
`;

const InputPrepender = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
  color: ${({isValid}) => isValid ? COLORS.greenLight : COLORS.grey};
  height: 30px;
  width: 30px;
  top: 20px;
  right: 5px;
  transition: all 0.2s;
`;

const UploadFileButtonStyled = styled.label`
  margin: 3px;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  color: ${COLORS.greyDark};
  background: lightgreen;
  transition: background 0.2s, color 0.2s;

  &:hover {
    color: ${COLORS.black};
    background: #4cff41;
    transition: background 0.2s, color 0.2s;
  }

  cursor: pointer;
  display: flex;
  justify-content: space-around;
  align-items: center;
  input[type="file"] {
    display: none;
  }

`;

const SpinningIcon = styled(Icon)`
  -webkit-animation:spin 4s linear infinite;
  -moz-animation:spin 4s linear infinite;
  animation:spin 4s linear infinite;
  @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`;

export {
  SpinnerWrapper,
  InputWrapper,
  Label,
  InputPrepender,
  UploadFileButtonStyled,
  SpinningIcon,
}
