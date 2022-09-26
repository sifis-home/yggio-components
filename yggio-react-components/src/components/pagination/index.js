/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {StyledPagination} from './styled';
import {JUMP_ICON} from './constants';

/* eslint-disable camelcase */
const Pagination = props => {
  return (
    <StyledPagination
      locale={{
        items_per_page: props.t('pagination.items_per_page'),
        jump_to: props.t('pagination.jump_to'),
        jump_to_confirm: props.t('pagination.jump_to_confirm'),
        page: props.t('pagination.page'),
        prev_page: props.t('pagination.prev_page'),
        next_page: props.t('pagination.next_page'),
        prev_5: props.t('pagination.prev_5'),
        next_5: props.t('pagination.next_5'),
        prev_3: props.t('pagination.prev_3'),
        next_3: props.t('pagination.next_3'),
      }}
      pageSize={props.pageSize}
      current={props.page}
      total={props.totalItemsCount}
      onChange={props.onChange}
      showLessItems
      jumpPrevIcon={JUMP_ICON}
      jumpNextIcon={JUMP_ICON}
    />
  );
};
/* eslint-enable camelcase */

Pagination.propTypes = {
  totalItemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Pagination;
