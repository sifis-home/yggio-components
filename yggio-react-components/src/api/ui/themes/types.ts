/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {Theme} from '../../../types';


interface ThemesQuery {
  orgId: string;
}

interface ThemeCreation {
  data: Theme;
}

interface ThemeUpdate {
  data: Theme;
}

interface ThemeDeletion {
  data: Partial<Theme>;
}

export type {
  ThemesQuery,
  ThemeCreation,
  ThemeUpdate,
  ThemeDeletion,
};
