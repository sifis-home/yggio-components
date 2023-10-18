import _ from 'lodash';
import {NextRouter} from 'next/router';
import React from 'react';
import {createSelector} from 'reselect';
import {Image, Text, Flex} from '@chakra-ui/react';

import {FlexSpaceBetweenWrapper} from '../../../../global/styled';
import {Organization, User} from '../../../../types';
import {
  OrganizationSummaryWrapper,
  Heading,
  OrganizationParagraph,
} from './styled';
import Button from '../../../../components/button';
import Spinner from '../../../../components/spinner';
import {userApi, organizationsApi} from '../../../../api';

interface OrganizationSummaryProps {
  orgId: string;
  logo: string | null;
  router: NextRouter;
}

const OrganizationSummaryPane = (props: OrganizationSummaryProps) => {
  const organizationQuery = organizationsApi.useOrganizationQuery(props.orgId);
  const userQuery = userApi.useTokenUser();

  const canEditMeta = canEditMetaSelector({
    organization: organizationQuery.data,
    user: userQuery.data,
  });

  if (organizationQuery.isFetching) {
    return (
      <OrganizationSummaryWrapper>
        <Flex
          justifyContent='center'
          alignItems='center'
          w='100%'
          h='200px'
        >
          <Spinner size={30} />
        </Flex>
      </OrganizationSummaryWrapper>
    );
  }

  return (
    <OrganizationSummaryWrapper>
      <Heading>Name:</Heading>
      <OrganizationParagraph>
        {_.get(organizationQuery.data, 'name', 'Organization not found')}
      </OrganizationParagraph>

      <Heading>Description:</Heading>
      <OrganizationParagraph>
        {_.get(organizationQuery.data, 'description', 'This is a description')}
      </OrganizationParagraph>

      <Heading>Logo</Heading>
      <OrganizationParagraph>
        {!props.logo && (
          <Text size='sm'>No logo available</Text>
        )}
        {props.logo && (
          <Image
            borderRadius='5px'
            mb='10px'
            h='50px'
            alt='organization logo'
            src={props.logo}
          />
        )}
      </OrganizationParagraph>

      <FlexSpaceBetweenWrapper>
        {canEditMeta && (
          <Button
            color='green'
            content={'Edit'}
            onClick={async () => props.router.push(`/organizations/${props.orgId}/edit`)}
          />
        )}
        {/* TODO: Enable when API has org removal capability
            <Button
            color={'red'}
            content={'Delete'}
            onClick={() => {
            const buttons = [
              {
                label: 'Yes',
                onClick: () => {},
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ];
            confirmAlert({
              title: 'Remove organization?',
              message: `Are you sure you want the remove organization
                : "${_.get(props.organization, 'res.name', 'Organization not found')}"?
              `,
              buttons,
            });
          }}
        />
      */}
      </FlexSpaceBetweenWrapper>
    </OrganizationSummaryWrapper>
  );
};

const canEditMetaSelector = createSelector(
  (props: {user?: User}) => props.user,
  (props: {organization?: Organization}) => props.organization,
  (user, organization) => {
    const userId = _.get(user, '_id');
    const ownerId = _.get(organization, 'ownerId');
    const isOwner = userId === ownerId;
    return isOwner;
  },
);

export default OrganizationSummaryPane;
