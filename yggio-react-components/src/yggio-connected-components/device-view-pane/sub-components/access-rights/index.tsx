import React from 'react';

import ResourceAccessRightsEditor from '../../../resource-access-rights-editor';

interface Props {
  deviceId: string;
}

const AccessRights = (props: Props) => {
  return (
    <ResourceAccessRightsEditor resourceId={props.deviceId} resourceType={'device'} />
  );
};

export default AccessRights;
