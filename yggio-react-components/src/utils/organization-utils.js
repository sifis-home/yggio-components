/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';

// ////
// findUnit
// ////

const findSubUnit = (currUnit, targetUnitId) => {
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

const findUnit = (organization, targetUnitId) => {
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


const findSubUnitByGroupId = (currUnit, targetUnitGroupId) => {
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

const findUnitByGroupId = (organization, targetUnitGroupId) => {
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

const extractUnitDescendants = (unit, descendants) => {
  _.each(unit.children, child => {
    descendants.push(child); // MUTATE!! (this one collects ALL subunits)
    extractUnitDescendants(child, descendants);
  });
  return descendants;
};

const getAllUnits = organization => {
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

const extractUnitPath = (unit, targetUnitId, prevPath) => {
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

const decomposeUnit = (organization, targetUnitId) => {
  const unitPath = extractUnitPath(organization.rootUnit, targetUnitId, []);
  if (!unitPath) {
    return {};
  }
  const allUnits = getAllUnits(organization);
  const unit = _.find(allUnits, unit => (unit._id === targetUnitId));
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

const replaceSubUnit = (unit, path, replacement) => {
  if (unit._id !== path[0]) {
    return unit;
  }
  if (path.length === 1) {
    return replacement;
  }
  const nextPath = path.slice(1);
  const children = _.compact(_.map(unit.children, child => {
    const replacementChild = replaceSubUnit(child, nextPath, replacement);
    return replacementChild;
  }));
  return {
    ...unit,
    children,
  };
};


const replaceUnit = (organization, path, replacement) => {
  const rootUnit = replaceSubUnit(organization.rootUnit, path, replacement);
  return {
    ...organization,
    rootUnit,
  };
};

// ////
// exports
// ////

const organizationUtils = {
  findUnit,
  findUnitByGroupId,
  getAllUnits,
  decomposeUnit,
  replaceUnit,
};


export default organizationUtils;
