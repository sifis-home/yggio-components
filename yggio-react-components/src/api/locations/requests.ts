/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {request} from '../request';
import {HTTP_METHODS, RESOURCE_TYPES} from '../../constants';
import {Location, Locations} from '../../types';

interface FetchParams {
  device?: string;
}

const fetch = async (params?: FetchParams) => request<Locations>({
  method: HTTP_METHODS.Get,
  URI: RESOURCE_TYPES.locations,
  params,
});

const fetchOne = async (locationId: string) => request<Location>({
  method: HTTP_METHODS.Get,
  URI: `${RESOURCE_TYPES.locations}/${locationId}`,
});

const create = async (location: Location) => request<Location>({
  method: HTTP_METHODS.Post,
  URI: `${RESOURCE_TYPES.locations}`,
  data: location,
});

const update = async (location: Partial<Location>) => request<Location>({
  method: HTTP_METHODS.Put,
  URI: `${RESOURCE_TYPES.locations}/${location._id}`,
  data: location,
});

const remove = async (locationId: string) => request<Location>({
  method: HTTP_METHODS.Delete,
  URI: `${RESOURCE_TYPES.locations}/${locationId}`,
});

export {
  fetch,
  fetchOne,
  create,
  update,
  remove,
};
