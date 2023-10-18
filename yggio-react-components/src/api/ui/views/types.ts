/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

interface ViewsQuery {
  type: string;
  orgId?: string;
}

interface ViewCreation {
  data: {
    orgId: string;
    name: string;
    type: string;
    data: Record<string, string>;
  }
}

interface ViewUpdate {
  _id: string;
  data: Partial<{
    orgId: string;
    name: string;
    data: Record<string, string>;
  }>;
}

interface ViewDeletion {
  _id: string;
}

export type {
  ViewsQuery,
  ViewCreation,
  ViewUpdate,
  ViewDeletion,
};
