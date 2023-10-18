import {request} from '../request';
import {HTTP_METHODS, RESOURCE_TYPES} from '../../constants';

const get = async () => request<number>({
  method: HTTP_METHODS.get,
  URI: RESOURCE_TYPES.requestBodySizeLimit,
});

export {
  get,
};
