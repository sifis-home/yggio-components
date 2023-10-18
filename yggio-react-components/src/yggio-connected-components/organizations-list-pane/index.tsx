/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {NextRouter} from 'next/router';

import {organizationsApi, userApi} from '../../api';
import {selectUserOrganization} from './selectors';
import {
  OrganizationsListPaneContainer,
  ButtonContainer,
  Heading,
  NoOrganizationsNote,
  OrganizationListHeader,
  CreateContainer,
  LoadingView,
} from './styled';
import ContainerBox from '../../components/container-box';
import Spinner from '../../components/spinner';
import Button from '../../components/button';
import {CenteredPage} from '../../global/components';

interface OrgListPaneProps {
  router: NextRouter;
}

const OrganizationsListPane = (props: OrgListPaneProps) => {
  const userQuery = userApi.useTokenUser();

  const organizationsQuery = organizationsApi.useOrganizationsQuery();

  const userOrgs = selectUserOrganization({
    user: userQuery?.data,
    organizations: organizationsQuery?.data,
  });

  return (
    <OrganizationsListPaneContainer>
      <CenteredPage>
        <ContainerBox>
          <Heading>
            Organizations
          </Heading>

          {organizationsQuery?.isLoading && (
            <LoadingView>
              <Spinner size={27} />
            </LoadingView>
          )}

          {_.isEmpty(userOrgs) &&
            <NoOrganizationsNote>No organizations available</NoOrganizationsNote>}

          {!organizationsQuery?.isLoading && !_.isEmpty(organizationsQuery?.data) &&
            <>
              <OrganizationListHeader>Select organization:</OrganizationListHeader>
              {_.map(userOrgs, organization => (
                <ButtonContainer key={organization._id}>
                  <Button
                    content={organization.name}
                    onClick={async () => props.router.push(`/organizations/${organization._id}/summary`)}
                  />
                </ButtonContainer>
              ))}
            </>}

          {!_.get(userQuery?.data, 'organization') && (
            <CreateContainer>
              <p>{'You may also:'}</p>
              <Button
                width='180px'
                content={'Create new organization'}
                color={'green'}
                onClick={async () => props.router.push('/organizations/new')}
              />
            </CreateContainer>
          )}

          {!userQuery?.data && (
            <p>{'User not found'}</p>
          )}
        </ContainerBox>
      </CenteredPage>
    </OrganizationsListPaneContainer>
  );
};

export default OrganizationsListPane;
