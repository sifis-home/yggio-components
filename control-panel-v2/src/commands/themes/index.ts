/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {ObjectId} from 'mongodb';

import type {Collection} from 'mongodb';

import {REQUEST_METHODS} from '../../constants';
import {transformBase64StringToBinary, transformBinaryToBase64String} from './utils';
import {validateThemeCreationData, validateThemeUpdateData} from './validation';

import type {Bodies, CommandData, Queries, ThemeBody, ThemeQuery} from '../../types';

interface Logo {
  data: Buffer;
  file: {
    type: string;
  };
}

// type predicates
const isThemeQuery = (data: Queries): data is ThemeQuery => {
  return !_.isUndefined((data as ThemeQuery)?.orgId);
};
const isThemeBody = (data: Bodies): data is ThemeBody => {
  return !_.isUndefined((data as ThemeBody).orgId);
};

const getThemeCommands = (
  coll: Collection,
) => ({
  [REQUEST_METHODS.get]: async ({query}: CommandData) => {
    if (isThemeQuery(query)) {
      const cursor = await coll
        .find({orgId: new ObjectId(query.orgId)})
        .toArray();
      const response = _.map(cursor, (theme: {_id: string, orgId: string, logo: Logo}) => ({
        logo: {
          ...theme.logo,
          // Logo data is saved in mongodb as binary data
          // and needs to transformed back to base64 string
          data: transformBinaryToBase64String(theme.logo.file.type, theme.logo.data),
        },
        _id: theme._id.toString(),
        orgId: theme.orgId.toString(),
      }));
      return response;
    }
    return null;
  },
  [REQUEST_METHODS.post]: async ({user, data}: CommandData) => {
    if (isThemeBody(data)) {
      const validatedData = validateThemeCreationData({...data, ownerId: user!});

      // Convert to binary data for mongodb
      const logoData = transformBase64StringToBinary(data?.logo?.data);

      const orgId = new ObjectId(validatedData.orgId);
      const setData = {
        logo: {
          ...validatedData.logo,
          data: logoData,
        },
        orgId,
        ownerId: user!,
      };

      const result = await coll
        .insertOne(setData);

      return result;
    }
  },
  [REQUEST_METHODS.put]: async ({user, data}: CommandData) => {
    if (isThemeBody(data)) {
      const validatedData = validateThemeUpdateData({...data, ownerId: user!});

      // Convert to binary data for mongodb
      const logoData = transformBase64StringToBinary(data?.logo?.data);

      const orgId = new ObjectId(validatedData.orgId);
      const updateData = {
        logo: {
          ...data?.logo,
          data: logoData,
        },
        orgId,
        ownerId: user,
      };

      await coll
        .updateOne(
          {_id: orgId},
          {$set: updateData},
          {upsert: true},
        );

      return validatedData;
    }
  },
  [REQUEST_METHODS.delete]: async ({data}: CommandData) => {
    if (isThemeBody(data)) {
      const orgId = new ObjectId(data?.orgId);
      const {acknowledged} = await coll
        .deleteOne({orgId});
      return acknowledged;
    }
  },
});

export default getThemeCommands;
