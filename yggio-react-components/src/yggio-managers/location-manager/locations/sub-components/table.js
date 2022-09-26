/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {confirmAlert} from 'react-confirm-alert';
import {DeleteIconButton, EditIconButton} from '../../../../yggio-components/buttons';
import {COLORS} from '../../../../constants';
import {StyledTableItem, StyledTableRow} from '../styled';
import {FlexWrapper} from '../../../../global/styled';

const TableHeader = props => {
  return <StyledTableRow background={COLORS.greenRacing} color={COLORS.white}>
    <StyledTableItem>Name</StyledTableItem>
    <StyledTableItem>Options</StyledTableItem>
  </StyledTableRow>
};

const TableBody = props => _.map(props.items, item => (
  <React.Fragment key={item._id}>
    <StyledTableRow>
      <StyledTableItem
        cursor={'pointer'}
        onClick={() => props.router.push(`/locations/${item._id}/${_.get(item, 'defaultLayer._id')}`)}
      >
        {item.name}
      </StyledTableItem>
      <StyledTableItem>
        <FlexWrapper>
          <EditIconButton
            onClick={() => props.router.push(`/locations/${item._id}/edit`)}
          />
          <DeleteIconButton
            onClick={(evt) => {
              const buttons = [
                {label: _.capitalize(props.t('common.yes')), onClick: () => props.removeLocation(item._id)},
                {label: _.capitalize(props.t('common.no')), onClick: () => {}}
              ];
              confirmAlert({
                title: _.capitalize(props.t('labels.confirmation')),
                message: props.t('phrases.removeDevicesVerification'),
                buttons,
              });
            }}
          />
        </FlexWrapper>
      </StyledTableItem>
    </StyledTableRow>
  </React.Fragment>
));

const Table = (props) => (
  <>
    <TableHeader/>
    <TableBody {...props} />
  </>
);

export default Table;