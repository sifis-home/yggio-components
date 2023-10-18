/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
  viewCreationSchema,
  viewUpdateSchema,
  ownerIdSchema,
} from 'yggio-react-components';

import type {View, ViewUpdate} from 'yggio-react-components';

const validateViewCreationData = (view: Omit<View, '_id'>) => {
  const parsed = viewCreationSchema.parse(view);
  return parsed;
};

const validateViewUpdateData = (view: ViewUpdate['data']) => {
  const parsed = viewUpdateSchema.parse(view);
  return parsed;
};

const validateOwnerId = (ownerId: string) => {
  const parsed = ownerIdSchema.parse(ownerId);
  return parsed;
};

export {
  validateViewCreationData,
  validateViewUpdateData,
  validateOwnerId,
};
