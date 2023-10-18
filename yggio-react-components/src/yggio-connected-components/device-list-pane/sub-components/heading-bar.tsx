/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState} from 'react';
import {NextRouter} from 'next/router';
import _ from 'lodash';
import {useTranslation} from 'react-i18next';
import {MdOutlineMenu as SidebarIcon} from 'react-icons/md';

import {CustomizeColumnsPopup, Views} from '.';
import Button from '../../../components/button';
import Modal from '../../../components/modal';
import {HeadingTitle, NumDevicesPill} from '../styled';
import {
  HeadingBarContainer,
  HeadingBarLeftSection,
  HeadingBarMiddleSection,
  HeadingBarRightSection,
  ToggleSidebarButton,
} from '../../../global/styled';

import type {ListStateProps} from '../types';
import type {Form} from '../../../types';
import type {Column} from '../constants';

interface HeadingBarProps {
  listState: ListStateProps;
  filterState: Form;
  devicesQueryIsLoading: boolean;
  deviceTotalCount?: string;
  numFilteredDevices: number;
  setColumns: (columns: Column[]) => void;
  columns: Column[];
  isInSelectMode: boolean;
  setIsInSelectMode: (mode: boolean) => void;
  siblingWidth: number;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  router: NextRouter;
}

const HeadingBar = (props: HeadingBarProps) => {
  const {t} = useTranslation();
  const [isCustomizeColumnsModalOpen, setIsCustomizeColumnsModalOpen] = useState(false);
  const [isViewsModalOpen, setIsViewsModalOpen] = useState(false);

  return (
    <HeadingBarContainer>
      {/* @ts-ignore not yet typed */}
      <HeadingBarLeftSection siblingWidth={props.siblingWidth}>
        <ToggleSidebarButton
          onClick={() => {
            if (props.isSidebarOpen) {
              props.setIsSidebarOpen(false);
            } else {
              props.setIsSidebarOpen(true);
            }
          }}
        >
          <SidebarIcon size={18} />
        </ToggleSidebarButton>
      </HeadingBarLeftSection>
      <HeadingBarMiddleSection>
        <HeadingTitle>
          {_.capitalize(t('common.devices'))}
        </HeadingTitle>
        {!props.devicesQueryIsLoading && (
          <NumDevicesPill>
            {props.deviceTotalCount}
          </NumDevicesPill>
        )}
      </HeadingBarMiddleSection>
      <HeadingBarRightSection>
        {!props.isInSelectMode && (
          <>
            <Button
              content={_.capitalize(t('labels.views'))}
              height={'35px'}
              ghosted
              onClick={() => setIsViewsModalOpen(true)}
              margin={'0 6px 0 0'}
            />
            <Modal
              isOpen={isViewsModalOpen}
              close={() => setIsViewsModalOpen(false)}
              width={'400px'}
            >
              <Views
                listState={props.listState}
                filterState={props.filterState}
                onClose={() => setIsViewsModalOpen(false)}
              />
            </Modal>
            <Button
              content={t('labels.customizeColumns')}
              height={'35px'}
              width={'fit'}
              ghosted
              padding={'0 10px'}
              margin={'0 6px 0 0'}
              onClick={() => setIsCustomizeColumnsModalOpen(true)}
            />
            <Modal
              isOpen={isCustomizeColumnsModalOpen}
              close={() => setIsCustomizeColumnsModalOpen(false)}
              width='600px'
              height='650px'
            >
              <CustomizeColumnsPopup
                onClose={() => setIsCustomizeColumnsModalOpen(false)}
                setColumns={props.setColumns}
                columns={props.columns}
              />
            </Modal>
          </>
        )}
        {!props.isInSelectMode && !props.devicesQueryIsLoading && !!props.numFilteredDevices && (
          <Button
            content={_.capitalize(t('labels.selectMany'))}
            height={'35px'}
            ghosted
            onClick={() => props.setIsInSelectMode(!props.isInSelectMode)}
            margin={'0 6px 0 0'}
          />
        )}
        <Button
          content={_.capitalize(t('labels.newDevice'))}
          color={'green'}
          height={'35px'}
          onClick={async () => {
            await props.router.push('/devices/new');
          }}
        />
      </HeadingBarRightSection>
    </HeadingBarContainer>
  );
};

export default HeadingBar;
