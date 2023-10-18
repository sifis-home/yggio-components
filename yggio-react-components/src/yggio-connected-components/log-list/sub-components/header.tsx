/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState} from 'react';
import {UseQueryResult} from '@tanstack/react-query';
import {
  MdReplay as RefreshIcon,
  MdOutlineFilterAlt as FilterIcon,
} from 'react-icons/md';

import LastUpdatedNote from './last-updated-note';
import {Form} from '../../../types';
import {checkAlarmsFilterIsActive} from '../utils';
import Select from '../../../components/select';
import SelectMulti from '../../../components/select-multi';
import TextField from '../../../components/text-field';
import Button from '../../../components/button';

import {
  TYPE_FILTER_OPTIONS,
  PRIORITY_FILTER_OPTIONS,
  CATEGORY_FILTER_OPTIONS,
  VERIFIED_FILTER_OPTIONS,
} from '../constants';
import {
  HeaderContainer,
  HeaderTopSection,
  HeaderTopLeftSection,
  HeaderTopRightSection,
  FiltersContainer,
} from '../styled';

interface HeaderProps {
  setPage: (page: number) => void;
  filterForm: Form;
  logsQuery: UseQueryResult;
  numActiveFilters: number;
  resetPagination: () => void;
}

const Header = (props: HeaderProps) => {

  const [shouldShowFilters, setShouldShowFilters] = useState(false);

  const alarmsFilterIsActive = checkAlarmsFilterIsActive(props.filterForm);

  const handleQuickFilter = () => {
    props.filterForm.resetForm();
    props.resetPagination();
    if (!alarmsFilterIsActive) {
      props.filterForm.setInputValue('priorityFilter', ['high', 'severe']);
      props.filterForm.setInputValue('verifiedFilter', 'unverified');
    }
  };

  return (
    <HeaderContainer>
      <HeaderTopSection>
        <HeaderTopLeftSection>
          <Button
            label={shouldShowFilters ? `Hide filters (${props.numActiveFilters})` : `Show filters (${props.numActiveFilters})`}
            onClick={() => setShouldShowFilters(!shouldShowFilters)}
            ghosted
            width={'140px'}
            height={'35px'}
            iconSize={18}
            icon={FilterIcon}
            iconToLabelGap={3}
            margin='0 8px 0 0'
          />
          <Button
            label={'Quick filter: Alarms'}
            onClick={handleQuickFilter}
            ghosted={!alarmsFilterIsActive}
            color={alarmsFilterIsActive ? 'blue' : 'grey'}
            title={'Alarms are unverified logs of High or Severe priority'}
            height={'35px'}
            width={'140px'}
          />
        </HeaderTopLeftSection>
        <HeaderTopRightSection>
          {props.logsQuery.isSuccess && (
            <LastUpdatedNote lastUpdated={props.logsQuery.dataUpdatedAt} />
          )}
          <Button
            title={'Click to refetch logs (automatically refetches every 2 min)'}
            icon={RefreshIcon}
            iconSize={18}
            width='30px'
            height='30px'
            isLoading={props.logsQuery.isFetching}
            ghosted
            onClick={async () => props.logsQuery.refetch()}
          />
        </HeaderTopRightSection>
      </HeaderTopSection>
      {shouldShowFilters && (
        <FiltersContainer>
          <SelectMulti
            label='Type'
            options={TYPE_FILTER_OPTIONS}
            onChange={evt => {
              props.filterForm.setInputValue('typeFilter', evt.target.value);
              props.resetPagination();
            }}
            value={props.filterForm.formInputs.typeFilter.value as unknown as string[]}
            width='250px'
            isClearable={false}
          />
          <SelectMulti
            label='Priority'
            options={PRIORITY_FILTER_OPTIONS}
            onChange={evt => {
              props.filterForm.setInputValue('priorityFilter', evt.target.value);
              props.resetPagination();
            }}
            value={props.filterForm.formInputs.priorityFilter.value as unknown as string[]}
            isClearable={false}
            width='250px'
          />
          <Select
            label='Category'
            options={CATEGORY_FILTER_OPTIONS}
            value={props.filterForm.formInputs.categoryFilter.value as string}
            onChange={evt => {
              props.filterForm.setInputValue('categoryFilter', evt.target.value || '');
              props.resetPagination();
            }}
            isClearable
            width='190px'
          />
          {/* TODO: Maybe throttle so a that one request isnt being made for each key stroke */}
          <TextField
            label='Message'
            value={props.filterForm.formInputs.messageFilter.value as string}
            onChange={evt => {
              props.filterForm.setInputValue('messageFilter', evt.target.value);
              props.resetPagination();
            }}
            width='213px'
            height='38px'
          />
          <Select
            label='Verified'
            options={VERIFIED_FILTER_OPTIONS}
            value={props.filterForm.formInputs.verifiedFilter.value as string}
            onChange={evt => {
              props.filterForm.setInputValue('verifiedFilter', evt.target.value);
              props.resetPagination();
            }}
            isClearable
            width='160px'
          />
        </FiltersContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;
