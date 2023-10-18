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
