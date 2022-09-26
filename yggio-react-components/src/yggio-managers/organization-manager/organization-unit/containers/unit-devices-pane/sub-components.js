/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import PropTypes from 'prop-types';

import {
  TableCell,
} from './styled';
import Button from '../../../../../components/button';


// /////
// BasicOrganizationDevicesPane - uses only fully processed data
// /////

const AccessSourceCell = props => {
  return (
    <TableCell>
      <Button
        content={props.deviceItem.unitName}
        onClick={() => props.router.push(`/organizations/${props.orgId}/units/${props.deviceItem.unitId}/summary`)}
        margin={'20px 0 0 0'}
        style={{
          color: '#003',
          textDecoration: 'underline',
        }}
      />
    </TableCell>
  );
};

AccessSourceCell.propTypes = {
  router: PropTypes.any.isRequired,
  orgId: PropTypes.string.isRequired,
  deviceItem: PropTypes.shape({
    deviceId: PropTypes.string.isRequired,
    deviceName: PropTypes.string,
    unitId: PropTypes.string.isRequired,
    unitName: PropTypes.string,
  }),
};


export {
  AccessSourceCell,
};
