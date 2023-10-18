/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {useTranslation} from 'react-i18next';

import Chip from '../../../components/chip';
import {selectFilterTags} from '../selectors';
import {Form} from '../../../types';
import {
  FilterBarContainer,
  FilterBarLeftSection,
  FilterBarMiddleSection,
  FilterBarRightSection,
} from '../styled';

interface FilterBarProps {
  form: Form;
  numFilteredDevices: number;
  deviceTotalCount?: string;
}

const FilterBar = (props: FilterBarProps) => {
  const {t} = useTranslation();
  const filterTags = selectFilterTags({formInputs: props.form.formInputs});
  return (
    <FilterBarContainer>
      <FilterBarLeftSection>
        {t('titles.activeFilters')}:
      </FilterBarLeftSection>
      <FilterBarMiddleSection>
        {_.map(filterTags, tag => (
          <Chip
            text={tag.text}
            key={tag.inputName}
            color={'blue'}
            showRemoveButton
            onRemoveClick={() => {
              if (tag.inputName === 'filterCheckedTypes') {
                props.form.setInputValue(tag.inputName, []);
              } else {
                props.form.setInputValue(tag.inputName, '');
              }
            }}
            ghosted
            margin={'0 4px 0 0'}
          />
        ))}
      </FilterBarMiddleSection>
      <FilterBarRightSection>
        <p>{t('titles.filteredOut')} <b>{props.numFilteredDevices} / {props.deviceTotalCount}</b></p>
      </FilterBarRightSection>
    </FilterBarContainer>
  );
};

export default FilterBar;
