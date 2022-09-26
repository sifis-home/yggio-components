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
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import {ic_dehaze as SidebarIcon} from 'react-icons-kit/md/ic_dehaze';

import CustomizeColumnsPopup from './customize-columns-popup';
import Button from '../../../components/button';
import {Modal} from '../../../components/modal';
import {
  HeadingTitle,
  NumDevicesPill,
} from '../styled';
import {
  HeadingBarContainer,
  HeadingBarLeftSection,
  HeadingBarMiddleSection,
  HeadingBarRightSection,
  ToggleSidebarButton,
} from '../../../global/styled';

const HeadingBar = props => {
  return (
    <HeadingBarContainer>
      <HeadingBarLeftSection siblingWidth={props.siblingWidth}>
        <ToggleSidebarButton
          onClick={() => {
            if (props.isSidebarOpen) {
              props.closeSidebar();
            } else {
              props.openSidebar();
            }
          }}
        >
          <Icon icon={SidebarIcon} size={17} />
        </ToggleSidebarButton>
      </HeadingBarLeftSection>
      <HeadingBarMiddleSection>
        <HeadingTitle>
          {_.capitalize(props.t('common.devices'))}
        </HeadingTitle>
        {!props.isLoading && (
          <NumDevicesPill>
            {props.deviceTotalCount}
          </NumDevicesPill>
        )}
      </HeadingBarMiddleSection>
      <HeadingBarRightSection>
        {!props.selectMode && (
          <>
            <Button
              content={props.t('labels.customizeColumns')}
              height={'30px'}
              width={'fit'}
              ghosted
              padding={'0 10px'}
              margin={'0 6px 0 0'}
              onClick={() => props.customizeColumnsModal.open()}
            />
            <Modal
              isOpen={props.customizeColumnsModal.isOpen}
              close={props.customizeColumnsModal.close}
              width={'400px'}
            >
              <CustomizeColumnsPopup
                onClose={props.customizeColumnsModal.close}
                setColumns={props.setColumns}
                columns={props.columns}
                t={props.t}
              />
            </Modal>
          </>
        )}
        {!props.selectMode && !props.isLoading && !!props.numFilteredDevices && (
          <Button
            content={_.capitalize(props.t('labels.selectMany'))}
            height={'30px'}
            ghosted
            onClick={() => props.setSelectMode(!props.selectMode)}
            margin={'0 6px 0 0'}
          />
        )}
        <Button
          content={_.capitalize(props.t('labels.newDevice'))}
          color={'green'}
          height={'30px'}
          onClick={() => {
            props.router.push('/devices/new');
          }}
        />
      </HeadingBarRightSection>
    </HeadingBarContainer>
  );
};

HeadingBar.propTypes = exact({
  router: PropTypes.object.isRequired,
  customizeColumnsModal: PropTypes.object,
  deviceTotalCount: PropTypes.string,
  isLoading: PropTypes.bool,
  isSidebarOpen: PropTypes.bool,
  closeSidebar: PropTypes.func,
  openSidebar: PropTypes.func,
  setSelectMode: PropTypes.func,
  selectMode: PropTypes.bool,
  devices: PropTypes.object,
  numFilteredDevices: PropTypes.number,
  columns: PropTypes.array,
  setColumns: PropTypes.func,
  siblingWidth: PropTypes.number,
  t: PropTypes.func,
});

export default HeadingBar;
