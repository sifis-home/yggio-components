import React, {useEffect} from 'react';
import _ from 'lodash';
import dynamic from 'next/dynamic';
import {NextRouter} from 'next/router';
import {UseQueryResult, useQueryClient} from '@tanstack/react-query';

// Logic
import {devicesApi} from '../../../../api';
import {Device} from '../../../../types';
import {getValidationErrorMessage, isFormValid} from '../../../../utils/form-wizard';
import formState from './state';
import {useLocalState} from '../../../../hooks';
import {checkPositionHasChanged, getCurrentCoordinates} from './utils';

// UI
import {FlexWrapper} from '../../../../global/styled';
import TextField from '../../../../components/text-field';
import Button from '../../../../components/button';
import {MapWrapper} from './styled';

const Map = dynamic(async () => import('../../../../components/map'), {ssr: false});

interface MapEvt {
  latlng: {
    lat: string;
    lng: string;
  }
}

interface PositionProps {
  deviceQuery: UseQueryResult<Device, unknown>;
  router: NextRouter;
}

const Position = (props: PositionProps) => {

  const form = useLocalState(formState);

  const queryClient = useQueryClient();
  const updateDeviceMutation = devicesApi.useUpdateDevice(queryClient);

  const device = props.deviceQuery.data!;

  const currentCoordinates = getCurrentCoordinates(device);

  useEffect(() => {
    if (!_.isEmpty(currentCoordinates)) {
      form.setInputValue('latitude', currentCoordinates[0].toString());
      form.setInputValue('longitude', currentCoordinates[1].toString());
    }
  }, []);

  const saveChanges = async () => {
    const latlng = [
      Number(form.formInputs.latitude.value),
      Number(form.formInputs.longitude.value),
    ];
    updateDeviceMutation.mutate({
      updates: {latlng},
      deviceId: device._id,
    });
    await props.deviceQuery.refetch();
  };

  const onCancelClick = () => {
    form.setInputValue('latitude', currentCoordinates[0].toString());
    form.setInputValue('longitude', currentCoordinates[1].toString());
  };

  const isChanged = checkPositionHasChanged(form.formInputs, currentCoordinates);

  const formIsValid = isFormValid(form.formInputs);

  return (
    <>
      <FlexWrapper>
        <TextField
          label={'Latitude'}
          margin={'10px 5px 10px'}
          width='200px'
          value={form.formInputs.latitude.value as string}
          onChange={evt => form.setInputValue('latitude', evt.target.value)}
          validationErrorMessage={getValidationErrorMessage(form.formInputs.latitude)}
        />
        <TextField
          label={'Longitude'}
          margin={'10px 5px 10px'}
          width='200px'
          value={form.formInputs.longitude.value as string}
          onChange={evt => form.setInputValue('longitude', evt.target.value)}
          validationErrorMessage={getValidationErrorMessage(form.formInputs.longitude)}
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
              ...(formIsValid && {
                items: [{
                  latlng: [
                    Number(form.formInputs.latitude.value),
                    Number(form.formInputs.longitude.value)
                  ],
                  alone: true
                }]
              }),
              URI: 'devices',
              markerShape: 'round',
            }
          }}
          onClick={(evt: MapEvt) => {
            const {lat, lng} = evt.latlng;
            form.setInputValue('latitude', lat.toString());
            form.setInputValue('longitude', lng.toString());
          }
          }
        />
      </MapWrapper>
      <FlexWrapper style={{width: '500px'}}>
        <Button
          color={'green'}
          content={'Save new position'}
          disabled={!isChanged || !formIsValid}
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
