/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {NextRouter} from 'next/router';

import {
  TableCell,
} from './styled';
import Button from '../../../../components/button';
import {OrganizationDevice} from '../../../../types';

interface AccessSourceCellProps {
  orgId: string;
  deviceItem: Partial<OrganizationDevice>;
  router: NextRouter;
}

const AccessSourceCell = (props: AccessSourceCellProps) => {
  return (
    <TableCell>
      <Button
        content={props.deviceItem.unitName}
        onClick={async () => await props.router.push(`/organizations/${props.orgId}/units/${props.deviceItem.unitId}/summary`)}
        margin='20px 0 0 0'
        style={{
          color: '#003',
          textDecoration: 'underline',
        }}
      />
    </TableCell>
  );
};

export {
  AccessSourceCell,
};
