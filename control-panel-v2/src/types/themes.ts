/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import z from 'zod';

import {themeCreationSchema, themeSchema} from '../commands/themes/validation';

type Theme = z.infer<typeof themeSchema>;
type ThemeBody = z.infer<typeof themeCreationSchema>;

interface ThemeQuery {
  _id: string;
  orgId: string;
  owner: string;
}

export type {
  Theme,
  ThemeQuery,
  ThemeBody,
};
