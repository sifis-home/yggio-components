/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
interface Organization {
  name: string;
  accessTokens: string[];
  description: string;
  members: string[];
  ownerId: string;
  rootUnit: Organization;
  createdAt: string;
  updatedAt: string;
  version: number;
  _id: string;
}

type Organizations = Organization[];
type IdKeyedOrganizations = {[_id: string]: Organization};

export {
  Organization,
  Organizations,
  IdKeyedOrganizations,
};
