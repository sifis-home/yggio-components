/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type {AppTypes} from 'yggio-models';
import type {App} from '../../types';

interface CategorizedApps {
  yggioApps: App[];
  staticApps: App[];
}

type AppUnion = App & AppTypes.AppWithId & {metadata: {softwareQuality?: number}};

export type {
  CategorizedApps,
  AppUnion,
};
