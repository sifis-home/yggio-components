import {request} from '../request';
import {HTTP_METHODS, RESOURCE_TYPES} from '../../constants';
import {Location, Locations} from '../../types';

interface FetchParams {
  device?: string;
}

const fetch = async (params?: FetchParams) => request<Locations>({
  method: HTTP_METHODS.get,
  URI: RESOURCE_TYPES.locations,
  params,
});

const fetchOne = async (locationId: string) => request<Location>({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.locations}/${locationId}`,
});

const create = async (location: Location) => request<Location>({
  method: HTTP_METHODS.post,
  URI: `${RESOURCE_TYPES.locations}`,
  data: location,
});

const update = async (location: Partial<Location>) => request<Location>({
  method: HTTP_METHODS.put,
  URI: `${RESOURCE_TYPES.locations}/${location._id}`,
  data: location,
});

const remove = async (locationId: string) => request<Location>({
  method: HTTP_METHODS.delete,
  URI: `${RESOURCE_TYPES.locations}/${locationId}`,
});

export {
  fetch,
  fetchOne,
  create,
  update,
  remove,
};
