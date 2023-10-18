import React from 'react';
import {NextRouter} from 'next/router';
import _ from 'lodash';
import {useTranslation} from 'react-i18next';

import Button from '../../../components/button';
import Select from '../../../components/select';
import {listActions} from '../utils';
import {
  SelectionBarContainer,
  SelectionBarLeftSection,
  SelectionBarRightSection,
  NumSelectedText,
} from '../styled';

interface SelectionBarProps {
  selectedDevices: string[];
  setSelectedDevices: (devices: string[]) => void;
  setIsInSelectMode: (mode: boolean) => void;
  setPage: (page: string) => void;
  router: NextRouter;
}

const SelectionBar = (props: SelectionBarProps) => {
  const {t} = useTranslation();
  return (
    <SelectionBarContainer>
      <SelectionBarLeftSection>
        <p>
          <NumSelectedText noDevices={_.isEmpty(props.selectedDevices)}>
            {_.size(props.selectedDevices)}
          </NumSelectedText>
          {t('phrases.devicesSelected')}
        </p>
      </SelectionBarLeftSection>
      <SelectionBarRightSection>
        <Button
          label={_.capitalize(t('labels.cancel'))}
          margin={'0 10px 0 0'}
          height={'35px'}
          width={'fit'}
          padding={'0 10px'}
          ghosted
          onClick={() => {
            props.setIsInSelectMode(false);
            props.setSelectedDevices([]);
          }}
        />
        <Select
          disabled={_.isEmpty(props.selectedDevices)}
          width={'150px'}
          placeholder={'Select action'}
          name={'selection'}
          options={[
            {value: 'configure', label: 'Configure'},
            {value: 'calculate', label: 'Calculate'},
            {value: 'channels', label: 'Channels'},
            {value: 'charts', label: 'Charts'},
            {value: 'remove', label: 'Delete'},
            {value: 'edit', label: 'Edit'},
            {value: 'setReportInterval', label: 'Set report interval'},
            {value: 'synchronize', label: 'Synchronize'},
            {value: 'setConnector', label: 'Set connector'},
          ]}
          onChange={async evt => {
            const value = evt.target.value as keyof typeof listActions;
            await listActions[value]({
              setPage: props.setPage,
              selectedDevices: props.selectedDevices,
              router: props.router,
            });
          }}
        />
      </SelectionBarRightSection>
    </SelectionBarContainer>
  );
};

export default SelectionBar;
