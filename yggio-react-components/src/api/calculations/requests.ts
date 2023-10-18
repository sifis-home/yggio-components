/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {request} from '../request';
import {
  HTTP_METHODS,
  RESOURCE_TYPES,
} from '../../constants';
import {CalcType, Calculation, Calculations, Interval} from '../../types';

// ////
// basic functionality
// ////

const create = async (calculation: Omit<Calculation, '_id'>) => request({
  method: HTTP_METHODS.post,
  URI: `${RESOURCE_TYPES.calculations}`,
  data: calculation,
});

const fetch = async () => request<Calculations>({
  method: HTTP_METHODS.get,
  URI: RESOURCE_TYPES.calculations
});

const get = async (calculationId: string) => request({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.calculations}/${calculationId}`,
});

const update = async (updates: Partial<Calculation>) => request({
  method: HTTP_METHODS.put,
  URI: `${RESOURCE_TYPES.calculations}/${updates._id}`,
  data: updates
});

const remove = async (calculationId: string) => request({
  method: HTTP_METHODS.delete,
  URI: `${RESOURCE_TYPES.calculations}/${calculationId}`,
});

interface PerformCalculationResult {
  result: number;
}

const perform = async (
  calculationId: string,
  calcType: CalcType,
  interval: Interval,
) => request<PerformCalculationResult>({
  method: HTTP_METHODS.put,
  URI: `${RESOURCE_TYPES.calculations}/${calculationId}/perform`,
  params: {calcType, interval},
});


// ////
//  exports
// ////

export {
  fetch,
  get,
  update,
  create,
  remove,
  perform,
};
