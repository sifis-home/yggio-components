/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {Organization, OrganizationUnit} from '../types';

const findSubUnit = (
  currUnit: OrganizationUnit,
  targetUnitId: string,
) => {
  let subUnit = _.find(currUnit.children, child => {
    return _.isEqual(targetUnitId, child._id);
  });
  if (subUnit) {
    return subUnit;
  }
  _.each(currUnit.children, child => {
    const foundUnit = findSubUnit(child, targetUnitId);
    if (foundUnit) {
      subUnit = foundUnit;
      return false; // early return
    }
  });
  return subUnit || null;
};

const findUnit = (
  organization: Organization | undefined,
  targetUnitId: string,
) => {
  const rootUnit = _.get(organization, 'rootUnit');
  if (!rootUnit) {
    return null;
  }
  if (targetUnitId === rootUnit._id) {
    return rootUnit;
  }
  const subUnit = findSubUnit(rootUnit, targetUnitId);
  return subUnit || null;
};

// ////
// findUnitByGroupId
// THESE SHOULD BE DEPRECATED & USAGE ELIMINATED
// ////


const findSubUnitByGroupId = (
  currUnit: OrganizationUnit,
  targetUnitGroupId: string,
) => {
  let subUnit = _.find(currUnit.children, child => {
    const groupIds = _.map(child.groups, group => group.groupId);
    const includesTarget = _.includes(groupIds, targetUnitGroupId);
    return includesTarget;
  });
  if (subUnit) {
    return subUnit;
  }
  _.each(currUnit.children, child => {
    const foundUnit = findSubUnitByGroupId(child, targetUnitGroupId);
    if (foundUnit) {
      subUnit = foundUnit;
      return false; // early return
    }
  });
  return subUnit || null;
};

const findUnitByGroupId = (
  organization: Organization,
  targetUnitGroupId: string,
) => {
  const rootUnit = _.get(organization, 'rootUnit');
  if (!rootUnit) {
    return null;
  }
  const groupIds = _.map(rootUnit.groups, group => group.groupId);
  if (_.includes(groupIds, targetUnitGroupId)) {
    return rootUnit;
  }
  const subUnit = findSubUnitByGroupId(rootUnit, targetUnitGroupId);
  return subUnit || null;
};

// ////
// getAllUnits
// ////

const extractUnitDescendants = (
  unit: OrganizationUnit,
  descendants: OrganizationUnit[],
) => {
  _.each(unit.children, child => {
    descendants.push(child); // MUTATE!! (this one collects ALL subunits)
    extractUnitDescendants(child, descendants);
  });
  return descendants;
};

const getAllUnits = (organization: Organization) => {
  const rootUnit = _.get(organization, 'rootUnit');
  if (!rootUnit) {
    return [];
  }
  const allUnits = extractUnitDescendants(rootUnit, [rootUnit]);
  return allUnits;
};

// ////
// decomposeUnit
// ////

const extractUnitPath = (
  unit: OrganizationUnit,
  targetUnitId: string,
  prevPath: string[],
) => {
  const path = _.concat(prevPath, unit._id);
  const isTargetUnit = _.isEqual(targetUnitId, unit._id);
  if (isTargetUnit) {
    return path;
  }
  let resolvedPath = null;
  _.each(unit.children, child => {
    const subPath = extractUnitPath(child, targetUnitId, path);
    if (subPath) {
      resolvedPath = subPath;
      return false; // early return
    }
  });
  return resolvedPath;
};

const decomposeUnit = (
  organization: Organization | undefined,
  targetUnitId: string,
) => {
  if (!organization) {
    return {};
  }
  const unitPath = extractUnitPath(organization.rootUnit, targetUnitId, []);
  if (!unitPath) {
    return {};
  }
  const allUnits = getAllUnits(organization);
  const unit = _.find(allUnits, unit => (unit._id === targetUnitId));
  if (!unit) {
    return null;
  }
  const descendants = extractUnitDescendants(unit, []);
  const ancestors = _.filter(allUnits, unit => {
    const isAncestor = (unit._id !== targetUnitId) && _.includes(unitPath, unit._id);
    return isAncestor;
  });
  return {
    unit,
    unitPath,
    ancestors,
    descendants,
  };
};

// ////
//
// ////

const replaceSubUnit = (
  unit: OrganizationUnit,
  path: string[],
  replacement: OrganizationUnit,
): OrganizationUnit => {
  if (unit._id !== path[0]) {
    return unit;
  }
  if (path.length === 1) {
    return replacement;
  }
  const nextPath = path.slice(1);
  const mapped = _.map(unit.children, child => {
    const replacementChild = replaceSubUnit(child, nextPath, replacement);
    return replacementChild;
  });

  const children = _.compact(mapped);
  return {
    ...unit,
    children,
  };
};


const replaceUnit = (
  organization: Organization,
  path: string[],
  replacement: OrganizationUnit,
) => {
  const rootUnit = replaceSubUnit(organization.rootUnit, path, replacement);
  return {
    ...organization,
    rootUnit,
  };
};

const organizationUtils = {
  findUnit,
  findUnitByGroupId,
  getAllUnits,
  decomposeUnit,
  replaceUnit,
};

export default organizationUtils;
