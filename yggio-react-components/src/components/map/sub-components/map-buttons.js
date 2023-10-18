import React from 'react';
import {
  MdOutlineZoomOutMap as MoveIcon,
  MdAdd as PlusIcon,
  MdRemove as MinusIcon,
  MdToggleOff as ToggleOffIcon,
  MdToggleOn as ToggleOnIcon,
  MdNearMe as LocationIcon,
} from 'react-icons/md';
import toast from 'react-hot-toast';
import {useTranslation} from 'react-i18next';
import {MapButtonsLayer} from '../styled';
import Button from '../../button';
import {GEO_ERROR_CODES} from '../../../constants';


const MapButtons = props => {
  const {t} = useTranslation();
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
          content={<MoveIcon size={18} />}
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
            content={<LocationIcon size={15} />}
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
        content={<PlusIcon size={22} />}
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
        content={<MinusIcon size={20}/>}
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
      {props.autoZoom && (
        <Button
          title={t('map.autoZoom')}
          margin={'3px'}
          aria-label={'ToggleOn'}
          content={<ToggleOnIcon size={20} />}
          color={'green'}
          height={'30px'}
          width={'30px'}
          borderRadius={'5px'}
          onClick={() => {
            props.setAutoZoom(false);
          }}
        />
      )}
      {!props.autoZoom && (
        <Button
          title={t('map.autoZoom')}
          margin={'3px'}
          aria-label={'ToggleOff'}
          content={<ToggleOffIcon size={20} />}
          color={'green'}
          height={'30px'}
          width={'30px'}
          borderRadius={'5px'}
          onClick={() => {
            props.setAutoZoom(true);
          }}
        />
      )}
    </MapButtonsLayer>
  );
};

export default MapButtons;
