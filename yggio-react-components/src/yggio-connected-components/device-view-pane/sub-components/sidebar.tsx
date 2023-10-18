import React, {useState} from 'react';
import _ from 'lodash';
import {MdKeyboardBackspace as BackArrowIcon} from 'react-icons/md'; // Back arrow
import {NextRouter} from 'next/router';
import {useTranslation} from 'react-i18next';

import DeviceStatusPill from '../../../components/device-status-pill';
import Modal from '../../../components/modal';
import {StatusPopup} from '../../status-popup';
import {Sidebar as SidebarContainer} from '../../../components/sidebar-components';
import {resolveDeviceType, formatTimeSinceLastReported, getDeviceStatus} from '../../../utils';
import {Device, IdKeyedCalculations} from '../../../types';
import {TabItem} from '../types';
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

interface SidebarProps {
  tabItems: TabItem[];
  isSidebarOpen: boolean;
  siblingWidth: number;
  device: Device;
  closeSidebar: () => void;
  openSidebar: () => void;
  tabId: string;
  router: NextRouter;
  numItems: Record<string, number>;
  calculations?: IdKeyedCalculations;
}

const Sidebar = (props: SidebarProps) => {
  const {t} = useTranslation();

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const deviceStatus = getDeviceStatus(t, props.device, props.calculations);

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
          <BackArrowIcon size={14} />
          <BackButtonText>
            {_.capitalize(t('labels.backToDeviceList'))}
          </BackButtonText>
        </BackButton>
      </SidebarTopSection>

      <SidebarInfoSection>
        <SidebarDeviceNameHeading>
          {_.capitalize(t('common.device'))}:
        </SidebarDeviceNameHeading>
        <SidebarDeviceName>
          {_.get(props, 'device.name') || 'no-name'}
        </SidebarDeviceName>
        <SidebarInfoRow>
          <div>{_.capitalize(t('common.type'))}:</div>
          <div>{resolveDeviceType(props.device)}</div>
        </SidebarInfoRow>
        <SidebarInfoRow>
          <div>{_.capitalize(t('common.lastReported'))}:</div>
          <div>
            {formatTimeSinceLastReported(_.get(props, 'device.reportedAt'))}
          </div>
        </SidebarInfoRow>
        <SidebarInfoRow>
          <div>{_.capitalize(t('common.status'))}:</div>
          {
            deviceStatus
              ? (
                <DeviceStatusPill
                  type={deviceStatus.worstStatusType}
                  text={_.size(deviceStatus.items).toString()}
                  onClick={() => setIsStatusModalOpen(true)}
                />
              ) : <p>-</p>
          }
        </SidebarInfoRow>
        <Modal
          isOpen={isStatusModalOpen}
          close={() => setIsStatusModalOpen(false)}
          padding={'25px'}
        >
          <StatusPopup
            title={'Device status'}
            deviceStatus={deviceStatus}
            onClose={() => setIsStatusModalOpen(false)}
          />
        </Modal>
      </SidebarInfoSection>

      <SidebarMenu>
        {_.map(props.tabItems, item => (
          <SidebarMenuItem
            active={item.path === props.tabId}
            onClick={async () => props.router.push(`/devices/${props.device._id}/${item.path}`)}
            key={item.name}
          >
            <SidebarMenuItemLeftSection>
              <SidebarMenuItemIconWrapper
                topPosition={item.icon.topPosition}
                active={item.path === props.tabId}
              >
                <item.icon.file size={item.icon.size} />
              </SidebarMenuItemIconWrapper>
              <SidebarMenuItemTitle active={item.path === props.tabId}>
                {_.capitalize(t(`titles.${item.path}`))}
              </SidebarMenuItemTitle>
            </SidebarMenuItemLeftSection>
            <SidebarMenuItemNumberChip
              hidden={_.isNil(props.numItems[item.name])}
              active={item.path === props.tabId}
            >
              {props.numItems[item.name]}
            </SidebarMenuItemNumberChip>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

    </SidebarContainer>
  );
};

export default Sidebar;
