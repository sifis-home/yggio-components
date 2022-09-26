/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {compose} from 'lodash/fp';
import {NextRouter} from 'next/router';

import {Device, Location} from '../../../types';
import Map from '../../../components/map';
import Spinner from '../../../components/spinner';
import ContainerBox from '../../../components/container-box';
import {RESOURCE_TYPES} from '../../../constants';
import {MapLoader} from './styled';
import {CenterContentContainer} from '../../../global/styled';
import {Table} from './sub-components';
import Button from '../../../components/button';
import {withLanguage} from '../../../hocs';
import {useLocationsQuery} from '../../../api/locations/hooks';
import {useDevicesQuery} from '../../../api/devices/hooks';
import {devicesApi, locationsApi} from '../../../api';

interface LocationsProps {
  router: NextRouter;
  t(): void;
}

const Locations = (props: LocationsProps) => {

  /// ////////////////////////
  //
  // HOOKS
  //
  /// ///////////////////////

  const queryClient = useQueryClient();
  const locations = useLocationsQuery();

  const useRemoveLocation = locationsApi.useRemoveLocation(queryClient);
  const useUpdateLocation = locationsApi.useUpdateLocation(queryClient);
  const useUpdateDevice = devicesApi.useUpdateDevice(queryClient);

  const devices = useDevicesQuery({
    params: {},
    select: React.useCallback(
      data => data,
      [],
    ),
  });

  /// ////////////////////////
  //
  // EVENTS
  //
  /// ///////////////////////

  const removeLocation = (locationId: string) => {
    useRemoveLocation.mutate(locationId);
  };

  interface UpdateDevice {
    deviceId: string;
    updates: Partial<Device>;
  }

  const updateDevice = ({deviceId, updates}: UpdateDevice) => {
    useUpdateDevice.mutate({deviceId, updates});
  };

  const updateLocation = (data: Location) => {
    useUpdateLocation.mutate(data);
  };

  //
  //
  // RENDERING
  //
  //

  if (locations.isLoading || devices.isLoading) {
    return (
      <MapLoader>
        <Spinner size={50} />
      </MapLoader>
    );
  }

  return (
    <CenterContentContainer>
      <ContainerBox
        position={'relative'}
        display={'flex'}
        width={'20%'}
        height={'92vh'}
        maxWidth={'100%'}
        flexDirection={'column'}
        margin={'10px'}
        includeMarginInHeight
        includeMarginInWidth
      >
        <Button
          color={'green'}
          ghosted
          margin={'10px'}
          width={'140px'}
          content={'+ New location'}
          onClick={async () => props.router.push('/locations/new')}
        />
        <Table
          t={props.t}
          removeLocation={removeLocation}
          router={props.router}
          items={locations.data}
        />
      </ContainerBox>
      <ContainerBox
        position={'relative'}
        width={'80%'}
        maxWidth={'100%'}
        height={'100%'}
        padding={'0'}
        margin={'10px'}
      >
        <Map
          router={props.router}
          height={'92vh'}
          width={'100%'}
          mapLayers={{
            devices: {
              _id: 'devices',
              items: devices?.data,
              URI: RESOURCE_TYPES.devices,
              saveMarker: updateDevice,
              markerShape: 'round',
            },
            locations: {
              _id: 'locations',
              items: locations?.data,
              URI: RESOURCE_TYPES.locations,
              saveMarker: updateLocation, // TODO: fix further down,
            },
          }}
        />
      </ContainerBox>
    </CenterContentContainer>
  );
};

export default compose(
  withLanguage(),
)(Locations);
