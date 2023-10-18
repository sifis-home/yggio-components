/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {LogTypes} from 'yggio-models';

import {logsRequests, logsTypes} from '../../../api';
import Button from '../../../components/button';
import {formatTime, formatFullTime} from '../utils';
import {
  LogContainer,
  MiddleSection,
  RightSection,
  TopSection,
  BottomSection,
  Type,
  Message,
  Time,
  Resource,
  Category,
  PriorityPill,
} from '../styled';

interface LogProps {
  log: logsTypes.FetchedLog;
  shouldShowResource: boolean;
}

const Log = (props: LogProps) => {
  const queryClient = useQueryClient();
  const updateLogMutation = useMutation(
    async (updates: LogTypes.UpdateLogData) => logsRequests.update(props.log._id, updates),
    {
      onSuccess: async () => {
        // TODO: More specific invalidation
        await queryClient.invalidateQueries(['logs']);
      },
      onError: (err: Error) => {
        toast.error(`Failed to update log: ${err.message}`);
      },
    }
  );
  const isOfSevereOrHighPrioriy = props.log.priority === 'severe' || props.log.priority === 'high';
  return (
    <LogContainer>
      <MiddleSection>
        <TopSection>
          <Type type={props.log.type} />
          <Message>{props.log.message}</Message>
        </TopSection>
        <BottomSection>
          {props.shouldShowResource && (
            <Link href={`devices/${props.log.resourceId}/logs`}>
              <Resource title='Click to see only this devices logs'>
                {props.log.resourceName || props.log.resourceId}
              </Resource>
            </Link>
          )}
          <Category>{_.capitalize(props.log.category)}</Category>
          {!props.log.isVerified && props.log.priority !== 'low' && (
            <PriorityPill priority={props.log.priority}>
              {props.log.priority} priority
            </PriorityPill>
          )}
        </BottomSection>
      </MiddleSection>
      <RightSection>
        <Time title={formatFullTime(props.log.createdAt)}>
          {formatTime(props.log.createdAt)}
        </Time>
        {isOfSevereOrHighPrioriy && !props.log.isVerified && (
          <Button
            label='Verify'
            width='70px'
            height='24px'
            ghosted
            color='blue'
            isLoading={updateLogMutation.isLoading}
            onClick={() => updateLogMutation.mutate({isVerified: true})}
          />
        )}
        {isOfSevereOrHighPrioriy && props.log.isVerified && (
          <Button
            label='Unverify'
            width='80px'
            height='24px'
            ghosted
            isLoading={updateLogMutation.isLoading}
            onClick={() => updateLogMutation.mutate({isVerified: false})}
          />
        )}
      </RightSection>
    </LogContainer>
  );
};

export default Log;
