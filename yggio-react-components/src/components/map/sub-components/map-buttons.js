/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {Icon} from 'react-icons-kit';
import {
  arrows,
  plus,
  minus,
  locationArrow
} from 'react-icons-kit/fa';
import toast from 'react-hot-toast';
import {MapButtonsLayer} from '../styled';
import Button from '../../button';
import {GEO_ERROR_CODES} from '../../../constants';


const MapButtons = props => {

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        props.setViewport({
          center: [pos.coords.latitude, pos.coords.longitude],
          zoom: props.viewport.zoom < 12 ? 12 : props.viewport.zoom
        });
      },
      err => {
        const duration = 10000;
        switch (err.code) {
          case GEO_ERROR_CODES.permissionDenied:
            toast.error('Browser failed permission to get location', {duration});
            break;
          case GEO_ERROR_CODES.positionUnavailabe:
            toast.error('Failed to get location', {duration});
            break;
          case GEO_ERROR_CODES.timeOut:
            toast.error('Took to long to recieve location', {duration});
            break;

          default:
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <MapButtonsLayer>
      {!props.viewOnly && (
        <Button
          margin={'3px'}
          content={<Icon size={20} icon={arrows} />}
          color={'green'}
          height={'30px'}
          width={'30px'}
          borderRadius={'5px'}
          onClick={() => props.setMovingMode(!props.movingMode)}
        />
      )}
      {
        props.showGetLocation &&
          <Button
            margin={'3px'}
            content={<Icon size={20} icon={locationArrow} />}
            color={'green'}
            height={'30px'}
            width={'30px'}
            borderRadius={'5px'}
            onClick={getLocation}
          />
      }
      <Button
        margin={'3px'}
        aria-label={'Plus'}
        content={<Icon size={20} icon={plus} />}
        color={'green'}
        height={'30px'}
        width={'30px'}
        borderRadius={'5px'}
        onClick={() => {
          if (props.viewport.zoom <= 25) {
            props.setViewport({...props.viewport, zoom: props.viewport.zoom + 1});
          }
        }}
      />
      <Button
        margin={'3px'}
        aria-label={'Minus'}
        content={<Icon size={20} icon={minus} />}
        color={'green'}
        height={'30px'}
        width={'30px'}
        borderRadius={'5px'}
        onClick={() => {
          if (props.viewport.zoom >= 3) {
            props.setViewport({...props.viewport, zoom: props.viewport.zoom - 1});
          }
        }}
      />
    </MapButtonsLayer>
  );
};

export default MapButtons;
