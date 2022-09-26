/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {NextRouter} from 'next/router';
import {ic_stay_current_portrait as deviceIcon} from 'react-icons-kit/md/ic_stay_current_portrait';
import {ic_location_on as locationIcon} from 'react-icons-kit/md/ic_location_on';
import {office as organizationIcon} from 'react-icons-kit/icomoon/office';
import {thLarge as providerIcon} from 'react-icons-kit/fa/thLarge';
import {cog as ruleIcon} from 'react-icons-kit/fa/cog';
import dynamic from 'next/dynamic';

import {withLanguage} from '../../hocs';
import {getConfig} from '../../yggio-config';
import {RESOURCE_TYPES, getExternalUrls} from '../../constants';
import {
  useNumLocationsQuery,
  useNumOrganizationsQuery,
  useNumProvidersQuery,
} from './queries';
import {CenteredPage} from '../../global/components';
import CountBox from './sub-components/count-box';
import {
  Heading,
  GreenText,
  CountBoxesWrapper,
  Version,
  MapWrapper,
} from './styled';
import {devicesApi, locationsApi, rulesApi} from '../../api';

const Map = dynamic(async () => import('../../components/map'), {ssr: false});

interface BasicDashboardProps {
  router: NextRouter;
  version?: string;
  children?: React.FC;
  t(key: string): string;
}

const DashboardPane = (props: BasicDashboardProps) => {
  const locationsQuery = locationsApi.useLocationsQuery();
  const devicesQuery = devicesApi.useDevicesQuery({
    params: {},
    select: data => data,
  });

  const numDevicesQuery = devicesApi.useNumDevicesQuery();
  const numLocationsQuery = useNumLocationsQuery();
  const numProvidersQuery = useNumProvidersQuery();
  const numOrganizationsQuery = useNumOrganizationsQuery();
  const rulesSizeQuery = rulesApi.useNumRulesQuery();

  const externalUrls = getExternalUrls();

  return (
    <CenteredPage maxWidth={'1200px'}>
      <Heading>{props.t('phrases.welcomeToYour')} <GreenText>Yggio</GreenText>.</Heading>
      <CountBoxesWrapper>
        <CountBox
          title={_.capitalize(props.t('common.devices'))}
          icon={deviceIcon as object}
          iconSize={36}
          query={numDevicesQuery}
          onClick={async () => props.router.push('/devices')}
        />
        <CountBox
          title={_.capitalize(props.t('common.locations'))}
          icon={locationIcon as object}
          iconSize={40}
          query={numLocationsQuery}
          onClick={() => window.open(externalUrls.locationManager, '_blank')}
        />
        <CountBox
          title={_.capitalize(props.t('common.organizations'))}
          icon={organizationIcon as object}
          iconSize={32}
          query={numOrganizationsQuery}
          onClick={async () => props.router.push('/organizations')}
        />
        <CountBox
          title={_.capitalize(props.t('common.rules'))}
          icon={ruleIcon as object}
          iconSize={34}
          query={rulesSizeQuery}
          onClick={() => window.open(externalUrls.ruleEngine, '_blank')}
        />
        <CountBox
          title={props.t('common.clientApps')}
          icon={providerIcon as object}
          iconSize={34}
          query={numProvidersQuery}
          onClick={async () => props.router.push('/apps')}
        />
      </CountBoxesWrapper>

      <MapWrapper>
        <Map
          // @ts-ignore - seem to bug the ts-compiler for some unknown reason
          viewOnly
          router={props.router}
          height={'40vh'}
          width={'100%'}
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


      <Version>{getConfig().version || 'No version specified'}</Version>
    </CenteredPage>
  );
};

export default withLanguage()(DashboardPane);
