import _ from 'lodash';
import {createSelector} from 'reselect';
import {UseQueryResult} from '@tanstack/react-query';

import {
  ResourceAccessRight,
  Users,
  User,
  ScopeItem,
} from '../../types';

import {ACCESS_RIGHT_TYPES} from './constants';

const createRightsList = (rights: ScopeItem[]) => {
  const acc: Record<ScopeItem, boolean> = {
    admin: false,
    write: false,
    read: false,
    peek: false,
  };
  return _.reduce(ACCESS_RIGHT_TYPES, (result, type) => {
    const right = _.find(rights, right => _.eq(right, type));
    result[type] = !!right;
    return result;
  }, acc);
};

const selectAccessRightsUserIds = createSelector(
  (props: {accessRights?: ResourceAccessRight[]}) => props.accessRights,
  accessRights => {
    if (!accessRights) {
      return [];
    }
    const acl = _.map(accessRights, right => {
      return right?.userId;
    });
    return acl;
  }
);

const selectAccessRightsUsers = createSelector(
  (props: {currentUserId: string | null}) => props.currentUserId,
  (props: {accessRights?: ResourceAccessRight[]}) => props.accessRights,
  (props: {users?: Users}) => props.users,
  (currentUserId, accessRights, users) => {
    if (!accessRights) {
      return [];
    }
    const acl = _.map(accessRights, right => {
      const user = _.find(users, user => user._id === right.userId);
      if (user) {
        return {
          ...right,
          name: user?.username || 'unknown',
          scope: createRightsList(right?.scope),
          isOwnedByCurrentUser: right.userId === currentUserId,
        };
      }
    });
    return _.orderBy(_.compact(acl), ['isOwnedByCurrentUser', 'name'], ['desc', 'asc']);
  }
);

interface getValidationErrorMessageParams {
  username: string;
  userQuery: UseQueryResult<User, unknown>;
  accessUserIds: string[];
}

const getValidationErrorMessage = ({username, userQuery, accessUserIds}: getValidationErrorMessageParams) => {
  const isUsernameMissing = !username;
  const isUserQueryFetching = userQuery.isFetching;
  const isUserQueryDataAvailable = !!userQuery.data;
  const isUserAlreadyAdded = isUserQueryDataAvailable && _.includes(accessUserIds, userQuery.data._id);
  if (isUsernameMissing || isUserQueryFetching) {
    return null;
  }
  if (isUserQueryDataAvailable && isUserAlreadyAdded) {
    return 'This user is already added';
  }
  if (isUserQueryDataAvailable) {
    return null;
  }
  return 'No user found';
};

export {
  selectAccessRightsUserIds,
  selectAccessRightsUsers,
  getValidationErrorMessage,
};
