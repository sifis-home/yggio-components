/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import ObjectId from 'bson-objectid';
import _ from 'lodash';
import z from 'zod';
import type {View} from 'yggio-react-components';

import {deviceSchema} from './devices';
import {ALLOWED_DATA_KEYS, ALLOWED_COLUMN_DATA_KEYS, VIEW_TYPES} from '../constants';

const viewType = z.enum([
  VIEW_TYPES.deviceList,
  VIEW_TYPES.column,
]);

const allowedDeviceListDataKeysSchema = z.nativeEnum(_.keyBy(ALLOWED_DATA_KEYS));
const allowedColumnDataKeysSchema = z.nativeEnum(_.keyBy(ALLOWED_COLUMN_DATA_KEYS));

const allowedDataKeysSchemas = {
  [VIEW_TYPES.deviceList]: allowedDeviceListDataKeysSchema,
  [VIEW_TYPES.column]: allowedColumnDataKeysSchema,
};

const columnSchema = z.object({
  comparison: z.enum(['gt', 'lt', 'eq']),
  value: z.number(),
  color: z.string(),
});

const ownerIdSchema = z
  .string()
  .uuid();

const createAllowedDataSchema = (type: keyof typeof VIEW_TYPES) => z.record(
  allowedDataKeysSchemas[type],
  z
    .string()
    .nullable()
    .or(z.number())
    .or(z.array(z.string().or(columnSchema)))
    .or(z.record(z.string(), z.boolean())),
);

const baseViewSchema = z
  .object({
    name: z.string().min(1).max(50),
    type: viewType,
    orgId: z
      .string()
      .refine(val => val && ObjectId.isValid(val), {
        message: 'Must be valid ObjectId',
      })
      .optional(),
    data: z.unknown(),
  })
  .strict();

const viewSchema = baseViewSchema.extend({
  _id: z
    .string()
    .refine(val => val && ObjectId.isValid(val), {
      message: 'Must be valid ObjectId',
    }),
  ownerId: ownerIdSchema,
});

const refineDataCreation = ({data, type}: Omit<View, '_id' | 'ownerId'>) => {
  try {
    const allowedDataSchema = createAllowedDataSchema(type);
    return allowedDataSchema.parse(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      err.issues[0].path.unshift('data');
      throw err;
    }
  }
};

const refineDataUpdate = ({data, type}: Partial<Omit<View, '_id' | 'ownerId'>>) => {
  try {
    if (data && !type) {
      throw new z.ZodError([{
        code: 'custom',
        path: ['type'],
        message: 'Missing type'},
      ]);
    }
    if (type && data) {
      const allowedDataSchema = createAllowedDataSchema(type);
      return allowedDataSchema.parse(data);
    }
    return true;
  } catch (err) {
    if (err instanceof z.ZodError) {
      err.issues[0].path.unshift('data');
      throw err;
    }
  }
};

const viewCreationSchema = baseViewSchema
  .refine(refineDataCreation);

const viewUpdateSchema = baseViewSchema
  .partial()
  .refine(refineDataUpdate);

const allowedDataSchema = allowedDeviceListDataKeysSchema;

const viewSchemaCreator = <T extends z.ZodType<object>>(dataSchema: T) => {
  return viewSchema.extend({
    data: dataSchema,
  });
};

const thresholdSchema = z.object({
  comparison: z.enum(['gt', 'lt', 'eq']),
  value: z.number(),
  color: z.string(),
});

const columnViewSchema = viewSchemaCreator(z.object({
  property: deviceSchema.keyof(),
  threshold: z.array(thresholdSchema)
}));

const deviceListViewSchema = viewSchemaCreator(z.object({
  columns: z.array(z.string()),
  filterConnector: z.string(),
  filterDevEui: z.string(),
  filterDeviceModelName: z.string(),
  filterName: z.string(),
  filterType: z.string(),
  filterContextualParameterKey: z.string(),
  filterContextualParameterValue: z.string(),
  filterQ: z.string(),
  currentPage: z.number(),
  cursorDirection: z.enum(['next', 'prev']),
  cursorId: z.string(),
  filterCollapsed: z.unknown(),
  pageSize: z.number(),
  sortingField: z.string(),
  sortingOrder: z.enum(['asc', 'desc']),
}));

export {
  viewType,
  ownerIdSchema,
  allowedDataSchema,
  viewSchema,
  viewCreationSchema,
  viewUpdateSchema,
  columnViewSchema,
  deviceListViewSchema,
};
