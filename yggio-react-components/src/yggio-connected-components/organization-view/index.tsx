import React from 'react';
import _ from 'lodash';
import {NextRouter} from 'next/router';
import OrganizationTabBar from './containers/organization-tab-bar';
import OrganizationSidebar from '../organization-sidebar';
import {FlexColWrapper, FlexMaxWidthWrapper} from '../../global/styled';
import {CenteredPage} from '../../global/components';
import OrganizationSummaryPane from './containers/organization-summary-pane';
import OrganizationMembersPane from './containers/organization-members-pane';
import OrganizationDevicesPane from './containers/organization-devices-pane';
import CreateMemberPane from './containers/create-member-pane';
import EditOrganizationPane from './containers/edit-organization-pane';
import ContainerBox from '../../components/container-box';
import {themesApi} from '../../api';
import {ORG_TAB_ITEMS} from '../../constants';

const NOT_FOUND = 'NOT_FOUND';

interface OrganizationViewProps {
  router: NextRouter;
  orgId: string;
  tabId: keyof typeof ORG_TAB_ITEMS;
}

const OrganizationView = (props: OrganizationViewProps) => {
  const [logo, setLogo] = React.useState<string | null>(null);
  const getThemeLogoQuery = themesApi.useThemesQuery({
    orgId: props.orgId,
  });

  React.useEffect(() => {
    const themeData = getThemeLogoQuery.data;
    const theme = _.find(themeData, data => data.orgId === props.orgId);
    if (theme) {
      const themeLogo = theme.logo?.data as string;
      if (themeLogo) {
        const setFile = () => {
          setLogo(themeLogo);
        };
        void setFile();
      }
    } else {
      setLogo(null);
    }

  }, [getThemeLogoQuery.data]);
  return (
    <FlexMaxWidthWrapper>
      <OrganizationSidebar
        logo={logo}
        router={props.router}
        orgId={props.orgId}
        tabId={props.tabId}
      />
      <CenteredPage>
        <ContainerBox>
          <FlexColWrapper>
            <OrganizationTabBar
              router={props.router}
              orgId={props.orgId}
              tabId={props.tabId}
            />
            {{
              [ORG_TAB_ITEMS.summary]: (
                <OrganizationSummaryPane
                  logo={logo}
                  orgId={props.orgId}
                  router={props.router}
                />
              ),
              [ORG_TAB_ITEMS.members]: (
                <OrganizationMembersPane
                  orgId={props.orgId}
                  router={props.router}
                />
              ),
              [ORG_TAB_ITEMS.devices]: (
                <OrganizationDevicesPane
                  orgId={props.orgId}
                  router={props.router}
                />
              ),
              [ORG_TAB_ITEMS.createMember]: (
                <CreateMemberPane
                  orgId={props.orgId}
                  router={props.router}
                />
              ),
              [ORG_TAB_ITEMS.edit]: (
                <EditOrganizationPane
                  orgId={props.orgId}
                  router={props.router}
                />
              ),
              [NOT_FOUND]: (
                <h1>{'No organization TAB match found'}</h1>
              ),
            }[ORG_TAB_ITEMS[props.tabId] || NOT_FOUND]}
          </FlexColWrapper>
        </ContainerBox>
      </CenteredPage>
    </FlexMaxWidthWrapper>
  );
};

export default OrganizationView;
