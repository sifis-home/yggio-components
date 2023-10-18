/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {NextRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {
  MdOutlineNotificationsNone as NoAlarmsIcon,
  MdOutlineNotificationsActive as AlarmsIcon,
} from 'react-icons/md';


import {logsRequests} from '../../../api';
import {countLogsByPriorityType} from '../utils';
import {
  NavButton,
  AlarmsWidgetContainer,
  AlarmsCount,
  AlarmsIconWrapper,
} from '../styled';

interface AlarmsWidget {
  router: NextRouter;
}

const AlarmsWidget = (props: AlarmsWidget) => {
  const params = {
    resourceType: 'device',
    limit: 100,
    skip: 0,
    priority: 'severe,high',
    isVerified: false,
  } as const;
  const logsQuery = useQuery(
    ['logs', params],
    async () => logsRequests.fetch(params),
    {refetchOnWindowFocus: false}
  );
  const {numHigh, numSevere} = countLogsByPriorityType(logsQuery.data);
  const count = numSevere > 0 ? numSevere : numHigh;
  return (
    <NavButton onClick={async () => props.router.push('/logs?alarms')}>
      <AlarmsWidgetContainer>
        <AlarmsIconWrapper isFaded={count === 0}>
          {count > 0 ? (
            <AlarmsIcon size={18} />
          ) : (
            <NoAlarmsIcon size={18} />
          )}
        </AlarmsIconWrapper>
        {count > 0 && (
          <AlarmsCount isSevere={numSevere > 0}>{count}</AlarmsCount>
        )}
      </AlarmsWidgetContainer>
    </NavButton>
  );
};

export default AlarmsWidget;
