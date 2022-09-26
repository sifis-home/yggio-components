/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

import Chip from '../../../components/chip';
import {
  FilterBarContainer,
  FilterBarLeftSection,
  FilterBarMiddleSection,
  FilterBarRightSection,
} from '../styled';

const FilterBar = props => {
  return (
    <FilterBarContainer>
      <FilterBarLeftSection>
        {props.t('titles.activeFilters')}:
      </FilterBarLeftSection>
      <FilterBarMiddleSection>
        {_.map(props.filterTags, tag => (
          <Chip
            text={tag.text}
            key={tag.inputName}
            color={'blue'}
            showRemoveButton
            onRemoveClick={() => {
              if (tag.inputName === 'filterCheckedTypes') {
                props.setInputValue(tag.inputName, []);
              } else {
                props.setInputValue(tag.inputName, '');
              }
            }}
            ghosted
            margin={'0 4px 0 0'}
          />
        ))}
      </FilterBarMiddleSection>
      <FilterBarRightSection>
        <p>{props.t('titles.filteredOut')} <b>{props.numFilteredDevices} / {props.deviceTotalCount}</b></p>
      </FilterBarRightSection>
    </FilterBarContainer>
  );
};

FilterBar.propTypes = exact({
  filterTags: PropTypes.array,
  numFilteredDevices: PropTypes.number,
  deviceTotalCount: PropTypes.string,
  setInputValue: PropTypes.func,
  handleTypeCheckbox: PropTypes.func,
  t: PropTypes.func,
});

export default FilterBar;
