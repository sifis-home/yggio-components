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
import {SourceInfo} from './types';

interface AccessSourceCellProps {
  sourceInfo: SourceInfo;
  orgId: string;
  router: NextRouter;
}

const AccessSourceCell = (props: AccessSourceCellProps) => {
  if (props.sourceInfo.owner) {
    return (
      <TableCell>{'Owner Access'}</TableCell>
    );
  }
  if (props.sourceInfo.orgUnit) {
    return (
      <TableCell>
        <Button
          content={props.sourceInfo.orgUnit.unitName}
          onClick={async () => await props.router.push(`/organizations/${props.orgId}/units/${props.sourceInfo.orgUnit.unitId}/summary`)}
          margin={'20px 0 0 0'}
          style={{
            color: '#003',
            textDecoration: 'underline',
          }}
        />
      </TableCell>
    );
  }

  if (props.sourceInfo.user) {
    return (
      <TableCell>{'User Access'}</TableCell>
    );
  }
  if (props.sourceInfo.userGroup) {
    return (
      <TableCell>{`UserGroup Access`}</TableCell>
    );
  }
  return (
    <TableCell>{`<<Unknown Access Type>>`}</TableCell>
  );
};

export {
  AccessSourceCell,
};
