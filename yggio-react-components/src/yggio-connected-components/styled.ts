/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';

const DeviceManagerContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MainContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

interface MainContentContainerProps {
  maxWidth: number;
}

const MainContentContainer = styled.div<MainContentContainerProps>`
  width: 100%;
  max-width: ${({maxWidth}) => maxWidth}px;
  padding: 30px 20px 60px;
  box-sizing: border-box;

  @media (max-width: 700px) {
    padding: 10px 10px 60px;
  };
`;

const InputWrapper = styled.div`
  width: 100%;
  margin: 5px;
`;

const ErrorMessageContainer = styled.p`
  color: 'black';
`;

// STATUS POPUP

const StatusPopupHeadingSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatusPopupTitle = styled.p`
  font-size: 13px;
  margin: 5px 0 20px 0;
  width: 175px;
  word-wrap: break-word;
`;

const StatusPopupCloseButton = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  color: white;
  &:hover {
    background: #999;
  }
`;

export {
  DeviceManagerContainer,
  MainContentWrapper,
  MainContentContainer,
  InputWrapper,
  ErrorMessageContainer,
  StatusPopupHeadingSection,
  StatusPopupTitle,
  StatusPopupCloseButton,
};
