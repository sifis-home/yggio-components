import {Translators} from '../../types';
import {request} from '../request';
import {HTTP_METHODS, RESOURCE_TYPES} from '../../constants';

const fetch = async (deviceModelName?: string) => request<Translators>({
  method: HTTP_METHODS.get,
  URI: RESOURCE_TYPES.translators,
  params: {deviceModelName}
});

export {
  fetch,
};
