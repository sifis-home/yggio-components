import _ from 'lodash';
import {ObjectId} from 'mongodb';
import {newYggioError, ErrorCodes} from 'yggio-errors';

import type {Collection} from 'mongodb';
import type {View, ViewQuery} from 'yggio-react-components';

import {REQUEST_METHODS, ERROR_CONTEXTS, SERVICE} from '../../constants';
import {
  validateViewCreationData,
  validateViewUpdateData,
  validateOwnerId,
} from './validation';

import type {Bodies, CommandData, Queries} from '../../types';

// type predicates
const isViewGetQuery = (data: Queries): data is ViewQuery => {
  const typeQuery = !_.isNil((data as ViewQuery).type);
  return !!typeQuery;
};

const isViewIdQuery = (data: Queries): data is ViewQuery => {
  return !_.isNil((data as ViewQuery)._id);
};

const isViewBody = (data: Bodies): data is View => {
  return _.some([
    !_.isUndefined((data as View).name),
    !_.isUndefined((data as View).orgId),
    !_.isUndefined((data as View).data),
  ]);
};

const getViewCommands = (
  coll: Collection,
) => ({
  [REQUEST_METHODS.get]: async ({user, query}: CommandData) => {
    if (isViewGetQuery(query)) {
      const orgId = query.orgId && new ObjectId(query.orgId);
      if (orgId) {
        const cursor = await coll
          .find({
            $and: [{orgId}, {type: query.type}],
          })
          .toArray();
        return cursor;
      }
      const cursor = await coll
        .find({
          $and: [{ownerId: user}, {type: query.type}],
        })
        .toArray();
      return cursor;
    }

    throw newYggioError({
      context: {
        module: ERROR_CONTEXTS.commandHandler,
        payload: {query},
        service: SERVICE,
      },
      publicMessage: 'type: Required',
      yggioErrorCode: ErrorCodes.VALIDATION,
    });
  },
  [REQUEST_METHODS.post]: async ({user, data}: CommandData) => {
    if (isViewBody(data)) {
      const cursor = await coll
        .find({
          ownerId: user,
          type: data.type,
          name: data.name,
        })
        .toArray();

      if (!_.isEmpty(cursor)) {
        throw newYggioError({
          publicMessage: 'Name is already taken, please choose another one',
          yggioErrorCode: ErrorCodes.CONFLICT,
        });
      }

      const validatedOwnerId = validateOwnerId(user!);
      const validatedData = validateViewCreationData(data);

      const orgId = data.orgId && new ObjectId(data.orgId);

      const result = await coll
        .insertOne({...validatedData, orgId, ownerId: validatedOwnerId});

      return result;
    }

    throw newYggioError({
      context: {
        module: ERROR_CONTEXTS.commandHandler,
        payload: {data},
        service: SERVICE,
      },
      publicMessage: 'name: Required',
      yggioErrorCode: ErrorCodes.VALIDATION,
    });
  },
  [REQUEST_METHODS.put]: async ({query, data}: CommandData) => {
    if (isViewBody(data) && isViewIdQuery(query)) {
      const validatedData = validateViewUpdateData(data);

      const orgId = data.orgId && new ObjectId(data.orgId);
      const _id = ObjectId.isValid(query._id!)
        ? new ObjectId(query._id)
        : undefined;
      const updated = await coll
        .updateOne(
          {_id},
          {$set: {...validatedData, orgId}},
        );

      return !!updated.matchedCount;
    }

    throw newYggioError({
      context: {
        module: ERROR_CONTEXTS.commandHandler,
        payload: {query},
        service: SERVICE,
      },
      publicMessage: 'Missing query id or body data',
      yggioErrorCode: ErrorCodes.VALIDATION,
    });
  },
  [REQUEST_METHODS.delete]: async ({query}: CommandData) => {
    if (isViewIdQuery(query)) {
      const _id = ObjectId.isValid(query._id!)
        ? new ObjectId(query._id)
        : undefined;
      const {deletedCount} = await coll
        .deleteOne({_id});

      return !!deletedCount;
    }
  },
});

export default getViewCommands;
