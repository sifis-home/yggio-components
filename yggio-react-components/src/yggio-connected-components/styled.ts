/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import {check as checkIcon} from 'react-icons-kit/entypo/check';
import {ic_warning as warningIcon} from 'react-icons-kit/md/ic_warning';
import {info as infoIcon} from 'react-icons-kit/entypo/info';

import {StatusTypeNames} from '../constants/status-types';

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

interface StatusChip {
  type: StatusTypeNames;
}

const StatusChip = styled.div<StatusChip>`
  display: flex;
  align-items: center;
  height: 20px;
  border-radius: 15px;
  color: white;
  font-size: 12px;
  white-space: nowrap;
  background: ${({type}) => {
    if (type === StatusTypeNames.ok) { return '#75A47B'; }
    if (type === StatusTypeNames.warning) { return '#CCC159'; }
    if (type === StatusTypeNames.error) { return '#CA6F6F'; }
    if (type === StatusTypeNames.info) { return '#6F99CA'; }
  }};
`;

const SmallStatusChip = styled(StatusChip)`
  padding: 0 7px 0 6px;
  cursor: pointer;
`;

const LargeStatusChip = styled(StatusChip)`
  margin: 0 0 7px 0;
  padding: 0 0 0 8px;
`;

const getStatusChipIcon = (type: StatusTypeNames) => {
  if (type === StatusTypeNames.info) {
    return infoIcon as object;
  } if (type === StatusTypeNames.ok) {
    return checkIcon as object;
  }
  return warningIcon as object;
};

interface StatusChipIcon {
  marginright?: string;
  type: StatusTypeNames;
}

const StatusChipIcon = styled(Icon).attrs((props: StatusChipIcon) => ({
  icon: getStatusChipIcon(props.type),
  size: 12,
}))<StatusChipIcon>`
  position: relative;
  top: -1px;
  margin-right: ${({marginright}) => marginright as string || '2px'};
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
  SmallStatusChip,
  LargeStatusChip,
  StatusChipIcon,
  StatusPopupHeadingSection,
  StatusPopupTitle,
  StatusPopupCloseButton,
};
