/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {createSelector} from 'reselect';
import {Organizations, User} from '../../../types';

const selectUserOrganization = createSelector(
  (props: {user: User | undefined}) => props.user,
  (props: {organizations: Organizations | undefined}) => props.organizations,
  (user, organizations) => {
    const userOrgId = _.get(user, 'organization') as string;
    if (!userOrgId) {
      // sort or something?
      return _.map(organizations, organization => organization);
    }
    if (userOrgId) {
      const organization = _.find(organizations, org => org._id === userOrgId);
      return organization ? [organization] : [];
    }
  },
);

export {
  selectUserOrganization,
};
