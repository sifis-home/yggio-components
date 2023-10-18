/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const ACCESS_RESOURCE_GROUP_TYPES = {
  // structural (automatically administrated through AccessEngine.api)
  global: 'global', // the global group - every resource is included
  public: 'public', // the public group - only member management should be user-controllable
  singleton: 'singleton', // every resource maps onto a singleton group
  owner: 'owner', // every resource is inherently owned by some user (every user has one of these groups)
  // yggio oriniated
  group: 'group', // yggio user-group associated
  orgUnit: 'orgUnit', // yggio organization.unit associated
};

export {
  ACCESS_RESOURCE_GROUP_TYPES,
};
