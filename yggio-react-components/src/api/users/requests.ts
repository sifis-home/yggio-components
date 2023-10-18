import {User, Users} from '../../types';
import {request} from '../request';
import {
  HTTP_METHODS,
  RESOURCE_TYPES,
} from '../../constants';

const fetch = async () => request<Users>({
  method: HTTP_METHODS.get,
  URI: RESOURCE_TYPES.users,
});

const seek = async (userIds?: string[]) => request<Users>({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.users}/seek`,
  params: {userIds},
});

const get = async (params: Partial<{id: string, username: string}>) => request<User>({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.users}/search`,
  params,
});

const create = async ({username, email, password}: User) => request({
  method: HTTP_METHODS.post,
  URI: RESOURCE_TYPES.users,
  data: {username, email, password},
});

const update = async (data: Partial<User>) => {
  return request({
    method: HTTP_METHODS.put,
    URI: RESOURCE_TYPES.users,
    data,
  });
};

export {
  fetch,
  seek,
  get,
  create,
  update,
};
