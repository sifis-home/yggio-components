/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React, {useEffect} from 'react';
import dynamic from 'next/dynamic';
import {NextRouter} from 'next/router';
import {UseQueryResult, useQueryClient} from '@tanstack/react-query';
import _ from 'lodash';

import {MAX_COORDINATE_LENGTH} from '../constants';
import {devicesApi} from '../../../api';
import {Device} from '../../../types';
import {selectPositionIsChanged} from '../selectors';
import {MapWrapper} from '../styled';
import {positionFormState} from '../state';
import {useLocalState} from '../../../hooks';
import {FlexWrapper} from '../../../global/styled';
import TextField from '../../../components/text-field';
import Button from '../../../components/button';

const Map = dynamic(async () => import('../../../components/map'), {ssr: false});

interface PositionProps {
  deviceQuery: UseQueryResult<Device, unknown>;
  router: NextRouter;
}

const Position = (props: PositionProps) => {

  const queryClient = useQueryClient();
  const updateDeviceMutation = devicesApi.useUpdateDevice(queryClient);

  const positionState = useLocalState(positionFormState);
  const device = props.deviceQuery.data;

  const getCurrentCoordinates = () => {
    if (device?.latlng) return device.latlng;
    return (
      (device?.lat && device.lng)
        ? [device.lat, device.lng]
        : []
    );
  };
  const currentCooridates = getCurrentCoordinates();

  useEffect(() => {
    if (!_.isEmpty(currentCooridates)) {
      positionState.populateInputValues({
        latitude: currentCooridates[0].toString(),
        longitude: currentCooridates[1].toString()
      });
    }
  }, []);

  const saveChanges = async () => {
    const newPosition = [
      Number(positionState.formInputs.latitude.value),
      Number(positionState.formInputs.longitude.value),
    ];
    updateDeviceMutation.mutate({
      updates: {latlng: newPosition},
      deviceId: device!._id,
    });
    await props.deviceQuery.refetch();
  };

  const onPositionInputChanged = (key: string, value: string) => {
    const isValidNumber = !Number.isNaN(Number(value)) && value.length <= MAX_COORDINATE_LENGTH;
    if (value.length === 0 || isValidNumber) {
      positionState.setInputValue(key, value);
    }
  };

  const onCancelClick = () => {
    positionState.setInputValue('latitude', currentCooridates[0]);
    positionState.setInputValue('longitude', currentCooridates[1]);
  };

  const isChanged = selectPositionIsChanged({
    formInputs: positionState.formInputs,
    currentCooridates
  });

  return (
    <>
      <FlexWrapper>
        <TextField
          label={'Latitude'}
          margin={'10px 5px 10px'}
          width='200px'
          value={positionState.formInputs.latitude.value as string}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => onPositionInputChanged('latitude', evt.target.value)}
        />
        <TextField
          label={'Longitude'}
          margin={'10px 5px 10px'}
          width='200px'
          value={positionState.formInputs.longitude.value as string}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => onPositionInputChanged('longitude', evt.target.value)}
        />
      </FlexWrapper>
      <MapWrapper>
        <Map
          // @ts-ignore - seem to bug the ts-compiler for some unknown reason
          viewOnly
          showGetLocation
          router={props.router}
          height={'50vh'}
          width={'100%'}
          mapLayers={{
            devices: {
              _id: 'devices',
              items: [{
                latlng: [
                  Number(positionState.formInputs.latitude.value),
                  Number(positionState.formInputs.longitude.value)
                ],
                alone: true
              }],
              URI: 'devices',
              markerShape: 'round',
            }
          }}
          onClick={(evt: {latlng: {lat: string, lng: string}}) => {
            positionState.setInputValue('latitude', evt.latlng.lat);
            positionState.setInputValue('longitude', evt.latlng.lng);
          }
          }
        />
      </MapWrapper>
      <FlexWrapper style={{width: '500px'}}>
        <Button
          color={'green'}
          content={'Save new position'}
          disabled={!isChanged}
          onClick={saveChanges}
          width={'140px'}
        />
        <Button
          color={'grey'}
          margin={'0px 10px'}
          disabled={!isChanged}
          content={'Cancel'}
          onClick={onCancelClick}
        />
      </FlexWrapper>
    </>

  );
};

export default Position;
