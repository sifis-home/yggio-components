/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
