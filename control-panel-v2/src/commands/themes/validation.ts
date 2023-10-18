/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import z from 'zod';

import {Theme} from '../../types';

const themeSchema = z.object({
  _id: z.string().nonempty(),
  ownerId: z.string().nonempty(),
  orgId: z.string().nonempty(),
  logo: z.object({
    data: z.string().nonempty(),
    file: z.object({
      name: z.string().nonempty(),
      type: z.string().nonempty(),
    }),
  }),
});

const themeCreationSchema = themeSchema.omit({
  _id: true,
});

const validateThemeCreationData = (theme: Omit<Theme, '_id'>) => {
  const parsed = themeCreationSchema.parse(theme);
  return parsed;
};

const validateThemeUpdateData = (theme: Omit<Theme, '_id'>) => {
  const parsed = themeCreationSchema.parse(theme);
  return parsed;
};

export {
  themeSchema,
  themeCreationSchema,
  validateThemeCreationData,
  validateThemeUpdateData,
};
