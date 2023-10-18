/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/*
  #### UUID Generation Utility ####

  This utility is used for the generation of UUID into lists
  for the purpose of rendering lists in React, which requires
  a "key" prop to work properly

  will ONLY accept the following types:
  - objects (nested)
  - arrays of objects (nested)
*/

import _ from 'lodash';
import {v4} from 'uuid';

const idKey = 'id';

const assertNoExistingIdsExist = source => {
  if (_.isArray(source)) {
    const keyedArray = _.map(source, curr => _.keys(curr));
    const keys = _.flatten(keyedArray);
    return !(_.includes(keys, 'id') || _.includes(keys, '_id'));
  }

  if (_.isPlainObject(source)) {
    const keys = _.keys(source);
    return !(_.includes(keys, 'id') || _.includes(keys, '_id'));
  }
};

const generateRecursiveUUID = source => {
  if (_.isPlainObject(source)) {
    return _.reduce(source, (acc, curr, key) => {
      if (_.isPlainObject(curr)) {
        if (assertNoExistingIdsExist(source)) {
          acc[key] = {
            ...generateRecursiveUUID(curr),
            [idKey]: v4(),
          };
        } else {
          acc[key] = {
            ...generateRecursiveUUID(curr),
          };
        }
      }

      if (_.isArray(curr)) {
        acc[key] = generateRecursiveUUID(curr);
      }
      return acc;
    }, {});
  }
  if (_.isArray(source)) {
    return _.reduce(source, (acc, curr) => {
      if (_.isPlainObject(curr)) {
        if (assertNoExistingIdsExist(source)) {
          acc.push({
            ...generateRecursiveUUID(curr),
            [idKey]: v4(),
          });
        } else {
          acc.push({
            ...generateRecursiveUUID(curr),
            [idKey]: v4(),
          });
        }
      }
      return acc;
    }, []);
  }
};

const generateArrayUUID = (source, opts) => {
  const generateDestination = _.reduce(source, (acc, curr) => {
    if (opts.nested) {
      if (_.isPlainObject(curr)) {
        if (assertNoExistingIdsExist(source)) {
          acc.push({
            ...generateRecursiveUUID(curr),
            [idKey]: v4(),
          });
        } else {
          acc.push({
            ...generateRecursiveUUID(curr),
          });
        }
      }
    } else if (assertNoExistingIdsExist(source)) {
      acc.push({
        ...curr,
        id: v4(),
      });
    } else {
      acc.push({
        ...curr,
      });
    }

    return acc;
  }, []);
  return _.defaultsDeep(generateDestination, source);
};

const generateObjectUUID = (source, opts) => {
  const generateDestination = _.reduce(source, (acc, curr, key) => {
    if (opts.nested) {
      if (_.isPlainObject(curr)) {
        if (assertNoExistingIdsExist(source)) {
          acc[key] = {
            ...generateRecursiveUUID(curr),
            [idKey]: v4(),
          };
        } else {
          acc[key] = {
            ...generateRecursiveUUID(curr),
          };
        }
      }


      if (_.isArray(curr)) {
        acc[key] = generateArrayUUID(curr, opts);
      }
    }

    if (assertNoExistingIdsExist(source)) {
      acc[idKey] = v4();
    }

    return acc;
  }, {});
  return _.defaultsDeep(generateDestination, source);
};

const generateUUID = (source, opts = {}) => {
  if (_.isArray(source)) {
    return generateArrayUUID(source, opts);
  }

  if (_.isPlainObject(source)) {
    return generateObjectUUID(source, opts);
  }

  throw new Error('DevErr: missing valid source');
};

export {
  generateUUID,
};
