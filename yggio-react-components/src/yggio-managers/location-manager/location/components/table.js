/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {lineChart} from 'react-icons-kit/fa/lineChart';
import {Icon} from 'react-icons-kit';
import {StyledDeviceRow, StyledIconLink, StyledTableItem, StyledTableRow, StyledTableRowDropdown} from '../styled';
import {COLORS} from '../../../../constants';
import {FlexWrapper, MarginWrapper} from '../../../../global/styled';
import {ChevronDownIconButton, EditIconButton} from '../../../../yggio-components/buttons';
import {ChevronUpIconButton} from '../../../../yggio-components/buttons/icons';

const TableItem = props => {
  return <StyledTableItem {...props}>
    {props.children}
  </StyledTableItem>
};

const TableRow = props => {
  return <StyledTableRow {...props}>
    {props.children}
  </StyledTableRow>
};

const TableHeader = props => {
  return <TableRow background={COLORS.greenRacing} color={COLORS.white}>
    <TableItem>Name</TableItem>
    <TableItem>Options</TableItem>
  </TableRow>
};

const TableBody = props => {
  return _.map(props.items, item => {
    return (
      <React.Fragment key={item._id}>
        <TableRow>
          <TableItem cursor={'pointer'} onClick={props.onClick(item._id)}>
            {item.name || 'Unknown'}
          </TableItem>
          <TableItem>
            <FlexWrapper style={{width: '50px', justifyContent: 'space-between'}}>
              <EditIconButton
                onClick={(evt) => {
                  evt.stopPropagation();
                  props.router.push(`/locations/${_.get(props, 'currentLocation._id')}/${item._id}/edit`)
                }}
              />
              {_.get(props, `openedLayers.${item._id}`)
                ? <ChevronUpIconButton onClick={() => props.toggleLayer(item._id)} />
                : <ChevronDownIconButton onClick={() => props.toggleLayer(item._id)} />
              }
            </FlexWrapper>
          </TableItem>

        </TableRow>
        <StyledTableRowDropdown open={_.get(props, `openedLayers.${item._id}`)}>
          {_.size(item.items)
            ? (
              _.map(item.items, deviceItem => (
                <StyledDeviceRow key={deviceItem.deviceId}>
                  {_.get(props.devices[deviceItem.deviceId], 'name')}
                  <StyledIconLink
                    onClick={() => {
                      props.router.push(`/devices/${_.get(deviceItem, 'deviceId')}/charts`)
                    }}
                  >
                    <Icon icon={lineChart}/>
                  </StyledIconLink>
                </StyledDeviceRow>
              ))
            ) : <MarginWrapper><i>No devices found</i></MarginWrapper>}
        </StyledTableRowDropdown>
      </React.Fragment>

    )
  })
}

const Table = props => {
  return (
    <>
      <TableHeader/>
      <TableBody {...props} />
    </>
  )
};

export default Table;