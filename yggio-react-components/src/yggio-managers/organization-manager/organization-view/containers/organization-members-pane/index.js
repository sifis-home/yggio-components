/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {compose} from 'lodash/fp';
import {createSelector} from 'reselect';
import {withReselect} from '../../../../../hocs';
import {withYggio} from '../../../../../yggio-context';

import {
  MembersListContainer,
} from './styled';

import {MemberItem} from './sub-components';

import {ORGANIZATION_ACCESS_TYPES} from '../../../constants';
import Button from '../../../../../components/button';

// /////
// BasicOrganizationMembersPane - uses only fully processed data
// /////

const BasicOrganizationMembersPane = props => (
  <MembersListContainer>

    <h1>{`All members in the organization`}</h1>

    {_.map(props.members, (member, index) => (
      <MemberItem
        key={member._id}
        member={member}
        index={index}
      />
    ))}

    {props.isAnyUnitManager && (
      <Button
        content={'Create new member'}
        color={'green'}
        onClick={() => props.router.push(`/organizations/${props.orgId}/createMember`)}
      />
    )}

  </MembersListContainer>
);

BasicOrganizationMembersPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  // from reselect (i.e. processed yggio data)
  members: PropTypes.array.isRequired,
  isAnyUnitManager: PropTypes.bool.isRequired,
};

// /////
// Data processing layers & local state
// /////

// extract organization
const organizationSelector = createSelector(
  props => props.organizations,
  props => props.orgId,
  (organizations, orgId) => {
    const organization = _.get(organizations, orgId);
    return organization;
  },
);

// extract all members
const membersSelector = createSelector(
  organizationSelector,
  props => props.users,
  (organization, users) => {
    const memberIds = _.get(organization, 'members', []);
    const members = _(memberIds)
      .map(memberId => users[memberId])
      .compact()
      .value();
    return members;
  },
);

const isAnyUnitManagerSelector = createSelector(
  props => props.user,
  organizationSelector,
  (user, organization) => {
    const userId = _.get(user, '_id');
    const ownerId = _.get(organization, 'ownerId');
    const tokens = _.get(organization, 'accessTokens');
    const unitManagerTokens = _.find(tokens, {
      memberId: userId,
      accessType: ORGANIZATION_ACCESS_TYPES.MANAGE_ACCESS,
    });
    const isOwner = userId === ownerId;
    return _.size(unitManagerTokens) > 0 || isOwner;
  },
);

const reselectors = {
  members: membersSelector,
  isAnyUnitManager: isAnyUnitManagerSelector,
};

// ////
// RawUnitMembersPane - disconnected from yggio
// ////

const RawOrganizationMembersPane = compose(
  withReselect(reselectors),
)(BasicOrganizationMembersPane);

RawOrganizationMembersPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  // from yggio
  organizations: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  user: PropTypes.object, // can be null
};

// /////
// OrganizationMembersPane - fully yggio connected
// /////

const yggio = {
  mapYggioStateToProps: yggioState => ({
    organizations: yggioState.database.organizations,
    users: yggioState.database.users,
    user: yggioState.database.auth.user
  }),
};

const OrganizationMembersPane = compose(
  withYggio(yggio),
)(RawOrganizationMembersPane);

OrganizationMembersPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
};

// /////
// exports
// /////

export default OrganizationMembersPane;
export {
  BasicOrganizationMembersPane,
  RawOrganizationMembersPane,
};
