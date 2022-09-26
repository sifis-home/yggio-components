/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';

import Button from '../../../components/button';
import Select from '../../../components/select';
import {
  SelectionBarContainer,
  SelectionBarLeftSection,
  SelectionBarRightSection,
  NumSelectedText,
} from '../styled';
import {listActions} from '../utils';

const SelectionBar = props => {
  return (
    <SelectionBarContainer>
      <SelectionBarLeftSection>
        <p>
          <NumSelectedText noDevices={_.isEmpty(props.selectedDevices.length)}>
            {_.size(props.selectedDevices)}
          </NumSelectedText>
          {props.t('phrases.devicesSelected')}
        </p>
      </SelectionBarLeftSection>
      <SelectionBarRightSection>
        <Button
          label={_.capitalize(props.t('labels.cancel'))}
          margin={'0 20px 0'}
          height={'35px'}
          width={'fit'}
          padding={'0 10px'}
          ghosted
          onClick={() => {
            props.setSelectMode(false);
            props.setSelectedDevices([]);
          }}
        />
        <Select
          disabled={_.isEmpty(props.selectedDevices)}
          width={'150px'}
          placeholder={_.capitalize(props.t('placeholders.action'))}
          name={'selection'}
          options={[
            {value: 'configure', label: 'Configure'},
            {value: 'calculate', label: 'Calculate'},
            {value: 'channels', label: 'Channels'},
            {value: 'charts', label: 'Charts'},
            {value: 'remove', label: 'Delete'},
            {value: 'edit', label: 'Edit'},
            {value: 'setReportInterval', label: 'Set report interval'},
            {value: 'setConnector', label: 'Set connector'},
          ]}
          onChange={evt => {
            listActions[evt.target.value](props);
          }}
        />
      </SelectionBarRightSection>
    </SelectionBarContainer>
  );
};

export default SelectionBar;
