/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// access-constants.js

const GLOBAL_ACCESS_USER_GROUP_REF = 'GLOBAL_ACCESS_USER_GROUP_REF';
const GLOBAL_ACCESS_RESOURCE_GROUP_REF = 'GLOBAL_ACCESS_RESOURCE_GROUP_REF';
const PUBLIC_ACCESS_RESOURCE_GROUP_REF = 'PUBLIC_ACCESS_RESOURCE_GROUP_REF';

const ACCESS_USER_GROUP_TYPES = {
  // structural (automatically administrated through AccessEngine.api)
  global: 'global', // administrated automatically - every user is included
  singleton: 'singleton', // every user maps onto a singleton group
  // yggio originated
  group: 'group', // yggio user-group associated
  orgUnit: 'orgUnit', // yggio organization.unit associated
};

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

const ACCESS_RESOURCE_TYPES = {
  // structural
  userGroup: 'userGroup', // yggio wrapper
  resourceGroup: 'resourceGroup', // yggio wrapper
  // the rest
  calculation: 'calculation',
  oauthClient: 'oauthClient',
  basicCredentialsSet: 'basicCredentialsSet',
  device: 'device',
};

const ACCESS_SCOPES = {
  admin: 'admin',
  peek: 'peek',
  read: 'read',
  write: 'write',
};


const ACCESS_ORG_UNIT_SCOPES = {
  peek: 'peek',
  read: 'read',
  write: 'write',
  emplacement: 'emplacement',
};

// organization is only allowed to handle a strict subset of resourceType for now
// it might be nice to be able to retain some constraints on resourceType visibility
const ACCESS_ORG_UNIT_RESOURCE_TYPES = [
  ACCESS_RESOURCE_TYPES.device,
];


export {
  GLOBAL_ACCESS_USER_GROUP_REF,
  GLOBAL_ACCESS_RESOURCE_GROUP_REF,
  PUBLIC_ACCESS_RESOURCE_GROUP_REF,
  ACCESS_USER_GROUP_TYPES,
  ACCESS_RESOURCE_GROUP_TYPES,
  ACCESS_SCOPES,
  ACCESS_RESOURCE_TYPES,
  ACCESS_ORG_UNIT_SCOPES, // needs changes
  ACCESS_ORG_UNIT_RESOURCE_TYPES,
};
