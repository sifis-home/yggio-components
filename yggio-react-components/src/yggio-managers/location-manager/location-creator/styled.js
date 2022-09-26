/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';
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

export {
  SpinnerWrapper,
  InputWrapper,
  InputPrepender,
}
