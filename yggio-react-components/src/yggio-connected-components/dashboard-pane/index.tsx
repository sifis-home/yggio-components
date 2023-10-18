import React from 'react';
import _ from 'lodash';
import {NextRouter} from 'next/router';
import dynamic from 'next/dynamic';
import {useTranslation} from 'react-i18next';
import {BsFillBuildingsFill as OrganizationIcon} from 'react-icons/bs';
import {
  MdSmartphone as DeviceIcon,
  MdLocationOn as LocatonIcon,
  MdSettings as RuleIcon,
  MdOutlineApps as AppsIcon,
} from 'react-icons/md';

import {getConfig} from '../../yggio-config';
import {RESOURCE_TYPES, getExternalUrls} from '../../constants';
import {
  useNumLocationsQuery,
  useNumOrganizationsQuery,
  useNumAppsQuery,
} from './queries';
import {CenteredPage} from '../../global/components';
import CountBox from './sub-components/count-box';
import Logs from './sub-components/logs';
import {
  Heading,
  GreenText,
  CountBoxesWrapper,
  Version,
  MiddleContainer,
  MapWrapper,
} from './styled';
import {devicesApi, locationsApi, rulesApi} from '../../api';

const Map = dynamic(async () => import('../../components/map'), {ssr: false});

interface BasicDashboardProps {
  router: NextRouter;
  version?: string;
  children?: React.FC;
}

const DashboardPane = (props: BasicDashboardProps) => {
  const locationsQuery = locationsApi.useLocationsQuery();
  const devicesQuery = devicesApi.useDevicesQuery({params: {}});

  const numDevicesQuery = devicesApi.useNumDevicesQuery();
  const numLocationsQuery = useNumLocationsQuery();
  const numAppsQuery = useNumAppsQuery();
  const numOrganizationsQuery = useNumOrganizationsQuery();
  const rulesSizeQuery = rulesApi.useNumRulesQuery();

  const {t} = useTranslation();

  const externalUrls = getExternalUrls();

  return (
    <CenteredPage maxWidth={'1200px'}>
      <Heading>
        <>
          {t('phrases.welcomeToYour')} <GreenText>Yggio</GreenText>.
        </>
      </Heading>
      <CountBoxesWrapper>
        <CountBox
          title={_.capitalize(t('common.devices'))}
          icon={DeviceIcon}
          iconSize={34}
          query={numDevicesQuery}
          onClick={async () => props.router.push('/devices')}
        />
        <CountBox
          title={_.capitalize(t('common.locations'))}
          icon={LocatonIcon}
          iconSize={40}
          query={numLocationsQuery}
          onClick={() => window.open(externalUrls.locationManager, '_blank')}
        />
        <CountBox
          title={_.capitalize(t('common.organizations'))}
          icon={OrganizationIcon}
          iconSize={30}
          query={numOrganizationsQuery}
          onClick={async () => props.router.push('/organizations')}
        />
        <CountBox
          title={_.capitalize(t('common.rules'))}
          icon={RuleIcon}
          iconSize={36}
          query={rulesSizeQuery}
          onClick={() => window.open(externalUrls.ruleEngine, '_blank')}
        />
        <CountBox
          title={t('common.apps')}
          icon={AppsIcon}
          iconSize={34}
          query={numAppsQuery}
          onClick={async () => props.router.push('/apps')}
        />
      </CountBoxesWrapper>

      <MiddleContainer>
        <MapWrapper>
          <Map
            // @ts-ignore - seem to bug the ts-compiler for some unknown reason
            viewOnly
            router={props.router}
            width={'100%'}
            height={'100%'}
            mapLayers={{
              devices: {
                _id: 'devices',
                items: devicesQuery.data,
                URI: RESOURCE_TYPES.devices,
                markerShape: 'round',
              },
              locations: {
                _id: 'locations',
                items: locationsQuery.data,
                URI: RESOURCE_TYPES.locations,
              },
            }}
          />
        </MapWrapper>
        <Logs />
      </MiddleContainer>

      <Version>{getConfig().version || 'No version specified'}</Version>
    </CenteredPage>
  );
};

export default DashboardPane;
