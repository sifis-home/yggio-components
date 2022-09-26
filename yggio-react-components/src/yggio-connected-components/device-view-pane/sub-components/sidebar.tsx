/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {Icon} from 'react-icons-kit';
import {ic_arrow_back as backIcon} from 'react-icons-kit/md/ic_arrow_back';
import {NextRouter} from 'next/router';

import {Modal} from '../../../components/modal';
import {StatusPopup} from './status-popup';
import {SmallStatusChip, StatusChipIcon} from '../../styled';
import {getTabItems} from '../utils';
import {Sidebar as SidebarContainer} from '../../../components/sidebar-components';
import {resolveDeviceType, formatTimeSinceLastReported, getDeviceStatus} from '../../../utils';
import {Device, IdKeyedCalculations, Translate} from '../../../types';
import {
  SidebarTopSection,
  BackButton,
  BackButtonText,
  SidebarInfoSection,
  SidebarDeviceNameHeading,
  SidebarDeviceName,
  SidebarInfoRow,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuItemLeftSection,
  SidebarMenuItemTitle,
  SidebarMenuItemIconWrapper,
  SidebarMenuItemNumberChip,
} from '../styled';

interface DetailsSidebarProps {
  isSidebarOpen: boolean;
  siblingWidth: number;
  device: Device;
  closeSidebar: () => void;
  openSidebar: () => void;
  tabId: string;
  t: Translate;
  router: NextRouter;
  hasRecConnector: boolean;
  statusModal: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  }
  numItems: Record<string, number>;
  calculations?: IdKeyedCalculations;
}

const DetailsSidebar = (props: DetailsSidebarProps) => {

  const tabItems = getTabItems(props.device, props.hasRecConnector);

  const deviceStatus = getDeviceStatus(props.t, props.device, props.calculations);

  return (
    <SidebarContainer
      isSidebarOpen={props.isSidebarOpen}
      closeSidebar={props.closeSidebar}
      openSidebar={props.openSidebar}
      siblingWidth={900}
      isUsingNavbar
    >
      <SidebarTopSection>
        <BackButton onClick={async () => props.router.push('/devices')}>
          <Icon icon={backIcon as object} size={14} />
          <BackButtonText>
            {_.capitalize(props.t('labels.backToDeviceList'))}
          </BackButtonText>
        </BackButton>
      </SidebarTopSection>

      <SidebarInfoSection>
        <SidebarDeviceNameHeading>
          {_.capitalize(props.t('common.device'))}:
        </SidebarDeviceNameHeading>
        <SidebarDeviceName>
          {_.get(props, 'device.name') || 'no-name'}
        </SidebarDeviceName>
        <SidebarInfoRow>
          <div>{_.capitalize(props.t('common.type'))}:</div>
          <div>{resolveDeviceType(props.device)}</div>
        </SidebarInfoRow>
        <SidebarInfoRow>
          <div>{_.capitalize(props.t('common.lastReported'))}:</div>
          <div>
            {formatTimeSinceLastReported(_.get(props, 'device.reportedAt'))}
          </div>
        </SidebarInfoRow>
        <SidebarInfoRow>
          <div>{_.capitalize(props.t('common.status'))}:</div>
          {
            deviceStatus
              ? (
                <SmallStatusChip
                  type={deviceStatus.worstStatusType}
                  onClick={() => props.statusModal.open()}
                >
                  <StatusChipIcon type={deviceStatus.worstStatusType} />
                  {_.size(deviceStatus.items)}
                </SmallStatusChip>
              ) : <p>-</p>
          }
        </SidebarInfoRow>
        <Modal
          isOpen={props.statusModal.isOpen}
          close={props.statusModal.close}
          padding={'25px'}
        >
          <StatusPopup
            title={'Device status'}
            deviceStatus={deviceStatus}
            onClose={props.statusModal.close}
          />
        </Modal>
      </SidebarInfoSection>

      <SidebarMenu>
        {_.map(tabItems, item => (
          <SidebarMenuItem
            active={item.path === props.tabId}
            onClick={async () => props.router.push(`/devices/${props.device._id}/${item.path}`)}
            key={item.name}
          >
            <SidebarMenuItemLeftSection>
              <SidebarMenuItemIconWrapper
                topPosition={item.icon.topPosition}
                active={item.name === props.tabId}
              >
                <Icon icon={item.icon.file} size={item.icon.size} />
              </SidebarMenuItemIconWrapper>
              <SidebarMenuItemTitle active={item.name === props.tabId}>
                {_.capitalize(props.t(`titles.${item.path}`))}
              </SidebarMenuItemTitle>
            </SidebarMenuItemLeftSection>
            <SidebarMenuItemNumberChip
              hidden={_.isNil(props.numItems[item.name])}
              active={item.name === props.tabId}
            >
              {props.numItems[item.name]}
            </SidebarMenuItemNumberChip>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

    </SidebarContainer>
  );
};

export default DetailsSidebar;
