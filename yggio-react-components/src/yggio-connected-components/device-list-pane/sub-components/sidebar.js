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
import Icon from 'react-icons-kit';
import {ic_filter_list as filterIcon} from 'react-icons-kit/md/ic_filter_list';
import {ic_expand_more as expandIcon} from 'react-icons-kit/md/ic_expand_more';
import {ic_expand_less as collapseIcon} from 'react-icons-kit/md/ic_expand_less';

import {
  SidebarHeading,
  SidebarHeadingLeftSection,
  SidebarHeadingTitle,
  CollapsableButton,
  CollapsableButtonIconWrapper,
} from '../styled';
import Select from '../../../components/select';
import Collapsible from '../../../components/collapsible';
import {DEVICE_TYPES, FILTERING_TYPES, SIDEBAR_SIBLING_WIDTH} from '../constants';
import Button from '../../../components/button';
import TextField from '../../../components/text-field';
import {Sidebar as SidebarContainer} from '../../../components/sidebar-components';

const Sidebar = props => {
  return (
    <SidebarContainer
      isSidebarOpen={props.isSidebarOpen}
      closeSidebar={props.closeSidebar}
      openSidebar={props.openSidebar}
      siblingWidth={SIDEBAR_SIBLING_WIDTH}
      isUsingNavbar
    >
      <SidebarHeading>
        <SidebarHeadingLeftSection>
          <Icon icon={filterIcon} size={18} />
          <SidebarHeadingTitle>
            {_.capitalize(props.t('labels.filter'))}
          </SidebarHeadingTitle>
        </SidebarHeadingLeftSection>
        {!_.isEmpty(props.filterTags) && (
          <Button
            onClick={props.clearFilters}
            color={'red'}
            content={'Clear filter'}
            height={'26px'}
            width={'fit'}
            ghosted
          />
        )}
      </SidebarHeading>

      <Collapsible
        openedHeight={'110px'}
        open={_.get(props, `filterCollapsed.${FILTERING_TYPES.name}`)}
        onClick={() => (
          props.setFilterCollapsed(FILTERING_TYPES.name, {[FILTERING_TYPES.name]: true})
        )}
        label={<CollapseButton filterName='name' {...props} />}
      >
        <TextField
          name={'filterName'}
          onChange={props.handleValueChange}
          value={props.formInputs.filterName.value}
          placeholder={`Name...`}
        />
      </Collapsible>

      <Collapsible
        openedHeight={'110px'}
        open={_.get(props, `filterCollapsed.${FILTERING_TYPES.deviceModelName}`)}
        onClick={() => (
          props.setFilterCollapsed(
            FILTERING_TYPES.deviceModelName,
            {[FILTERING_TYPES.deviceModelName]: true}
          )
        )}
        label={<CollapseButton filterName='deviceModelName' {...props} />}
      >
        <TextField
          name={'filterDeviceModelName'}
          onChange={props.handleValueChange}
          value={props.formInputs.filterDeviceModelName.value}
          placeholder={`Device model name...`}
        />
      </Collapsible>

      <Collapsible
        openedHeight={'530px'}
        open={_.get(props, `filterCollapsed.${FILTERING_TYPES.type}`)}
        onClick={() => {
          props.setFilterCollapsed(FILTERING_TYPES.type, {[FILTERING_TYPES.type]: true});
        }}
        label={<CollapseButton filterName='type' {...props} />}
      >
        <Select
          isClearable
          width={'100%'}
          placeholder={_.capitalize(props.t('placeholders.select'))}
          name={'filterType'}
          options={DEVICE_TYPES}
          value={_.get(props.formInputs, 'filterType.value')}
          onChange={props.handleValueChange}
        />
      </Collapsible>

      <Collapsible
        openedHeight={'110px'}
        open={_.get(props, `filterCollapsed.${FILTERING_TYPES.devEui}`)}
        onClick={() => (
          props.setFilterCollapsed(FILTERING_TYPES.devEui, {[FILTERING_TYPES.devEui]: true})
        )}
        label={<CollapseButton filterName='devEui' {...props} />}
      >
        <TextField
          name={'filterDevEui'}
          onChange={props.handleValueChange}
          value={props.formInputs.filterDevEui.value}
          placeholder={`devEui...`}
        />
      </Collapsible>
    </SidebarContainer>
  );
};

const CollapseButton = props => (
  <CollapsableButton>
    {_.capitalize(props.t(`common.${props.filterName}`))}
    <CollapsableButtonIconWrapper>
      {
        _.get(props, `filterCollapsed.${FILTERING_TYPES[props.filterName]}`)
          ? <Icon icon={collapseIcon} size={20} />
          : <Icon icon={expandIcon} size={20} />
      }
    </CollapsableButtonIconWrapper>
  </CollapsableButton>
);

Sidebar.propTypes = exact({
  clearFilters: PropTypes.func,
  filterTags: PropTypes.array,
  setFilterCollapsed: PropTypes.func,
  filterCollapsed: PropTypes.object,
  t: PropTypes.func,
  handleTypeCheckbox: PropTypes.func,
  handleValueChange: PropTypes.func,
  formInputs: PropTypes.object,
  isSidebarOpen: PropTypes.bool,
  closeSidebar: PropTypes.func,
  openSidebar: PropTypes.func,
});

export default Sidebar;
