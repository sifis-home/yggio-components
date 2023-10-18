import _ from 'lodash';
import {NextRouter} from 'next/router';
import React from 'react';
import {Image, Flex, Box} from '@chakra-ui/react';
import Button from '../../components/button';
import Spinner from '../../components/spinner';
import {BasicTreeView} from '../../components/tree-view';
import {
  Sidebar,
  TopSection,
  TopSectionHeadingContainer,
  TopSectionButtonsContainer,
  TreeViewNote,
} from './styled';
import {organizationsApi} from '../../api';
import {usePersistentState} from '../../hooks';
import treeState from './state';

interface OrganizationSidebarProps {
  router: NextRouter;
  orgId: string;
  tabId: string;
  unitId?: string;
  logo: string | null;
}

const OrganizationSidebar = (props: OrganizationSidebarProps) => {
  const organizationQuery = organizationsApi.useOrganizationQuery(props.orgId);
  const {toggleState, setToggleState} = usePersistentState(treeState, 'organization-tree');

  if (organizationQuery.isFetching && organizationQuery.isLoading) {
    return (
      <Sidebar>
        <Flex
          justifyContent='center'
          alignItems='center'
          w='100%'
          h='200px'
        >
          <Spinner size={30} />
        </Flex>
      </Sidebar>
    );
  }

  return (
    <Sidebar>

      <TopSection>
        <TopSectionHeadingContainer>
          <Logo logo={props.logo} />
          <h1>{_.get(organizationQuery, 'data.name', 'Organization not found')}</h1>
        </TopSectionHeadingContainer>
        <TopSectionButtonsContainer>
          <Button
            margin='5px'
            color='green'
            content={'Manage organization'}
            onClick={async () => props.router.push(`/organizations/${props.orgId}/summary`)}
            ghosted
            width="160px"
          />
          <Button
            margin='5px'
            color='green'
            content={'Switch organization'}
            onClick={async () => props.router.push('/organizations')}
            ghosted
            width="160px"
          />
        </TopSectionButtonsContainer>
      </TopSection>

      <TreeViewNote>{'Select a subunit to manage:'}</TreeViewNote>
      {organizationQuery.isSuccess && (
        <BasicTreeView
          toggleState={toggleState}
          setToggleState={setToggleState}
          treeData={organizationQuery.data?.rootUnit}
          selectedNodeId={props.unitId}
          onNodeSelected={async (unitId: string) => {
            await props.router.push(`/organizations/${props.orgId}/units/${unitId}/summary`);
          }}
        />
      )}
    </Sidebar>
  );
};

const Logo = ({logo}: {logo: string | null}) => {
  if (!logo) {
    // Box to fill space when there is no image
    // to prevent glitching UI
    return <Box boxSize='60px'/>;
  }

  return (
    <Image
      borderRadius='5px'
      mb='10px'
      h='50px'
      alt='organization logo'
      src={logo}
    />
  );
};

export default OrganizationSidebar;
