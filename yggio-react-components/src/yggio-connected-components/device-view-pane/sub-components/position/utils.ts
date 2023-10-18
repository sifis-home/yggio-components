import {FormInputs, Device} from '../../../../types';


const getCurrentCoordinates = (device: Device) => {
  if (device?.latlng) return device.latlng;
  return (
    (device?.lat && device.lng)
      ? [device.lat, device.lng]
      : []
  );
};

const checkPositionHasChanged = (formInputs: FormInputs, currentCoordinates: number[]) => {
  if (!formInputs.latitude.value || !formInputs.longitude.value) {
    return false;
  }
  return Number(formInputs.latitude.value) !== currentCoordinates[0] ||
    Number(formInputs.longitude.value) !== currentCoordinates[1];
};

export {
  getCurrentCoordinates,
  checkPositionHasChanged,
};
