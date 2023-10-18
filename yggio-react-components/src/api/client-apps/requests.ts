import {request} from '../request';
import {HTTP_METHODS, RESOURCE_TYPES} from '../../constants';
import {ClientApp} from '../../types';

const fetch = async () => request<ClientApp[]>({
  method: HTTP_METHODS.get,
  URI: RESOURCE_TYPES.clientApps,
});

export {
  fetch,
};
