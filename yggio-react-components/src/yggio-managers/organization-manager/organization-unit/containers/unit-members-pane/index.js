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

import {ORGANIZATION_ACCESS_TYPES} from '../../../constants';
import {organizationUtils} from '../../../../../utils';
import {Wrapper} from './styled';

import RadioButton from '../../../../../components/radio-button';
import Button from '../../../../../components/button';

import {
  HeaderCell,
  BodyCell,
} from './sub-components';

// /////
// The BasicUnitMembersPane - uses only fully processed data
// /////

const BasicUnitMembersPane = props => (
  <Wrapper>
    {!_.isEmpty(props.memberItems) &&
      <table style={{
        width: '100% - 20px',
        marginBottom: 30,
      }}
      >
        <thead>
          <tr>
            <HeaderCell>{'Member'}</HeaderCell>
            <HeaderCell>{'Manage'}</HeaderCell>
            <HeaderCell>{'Device write'}</HeaderCell>
            <HeaderCell>{'Device read'}</HeaderCell>
            <HeaderCell>{'Device peek'}</HeaderCell>
            <HeaderCell>{'Emplace'}</HeaderCell>
          </tr>
        </thead>

        <tbody>
          {_.map(props.memberItems, item => (
            <tr key={item._id}>
              <BodyCell>{item.name}</BodyCell>

              <BodyCell>
                <RadioButton
                  isSelected={item.hasManagerToken}
                  onClick={async () => {
                    const func = item.hasManagerToken
                      ? props.revokeManagerAccess
                      : props.assignManagerAccess;
                    const arg = {
                      orgId: props.orgId,
                      unitId: props.unitId,
                      memberId: item._id,
                    };
                    try {
                      await func(arg);
                    } catch (err) {
                      // do nothing?
                    }
                  }}
                />
              </BodyCell>

              <BodyCell>
                <RadioButton
                  isSelected={item.hasDeviceWriteToken}
                  onClick={async () => {
                    const func = item.hasDeviceWriteToken
                      ? props.revokeDeviceAccess
                      : props.assignDeviceAccess;
                    const arg = {
                      orgId: props.orgId,
                      unitId: props.unitId,
                      memberId: item._id,
                      accessType: ORGANIZATION_ACCESS_TYPES.DEVICES_WRITE,
                    };
                    try {
                      await func(arg);
                      await props.fetchDeviceDetails({orgId: props.orgId});
                    } catch (err) {
                      // do nothing?
                    }
                  }}
                />
              </BodyCell>

              <BodyCell>
                <RadioButton
                  isSelected={item.hasDeviceReadToken}
                  onClick={async () => {
                    const func = item.hasDeviceReadToken
                      ? props.revokeDeviceAccess
                      : props.assignDeviceAccess;
                    const arg = {
                      orgId: props.orgId,
                      unitId: props.unitId,
                      memberId: item._id,
                      accessType: ORGANIZATION_ACCESS_TYPES.DEVICES_READ,
                    };
                    try {
                      await func(arg);
                      await props.fetchDeviceDetails({orgId: props.orgId});
                    } catch (err) {
                      // do nothing?
                    }
                  }}
                />
              </BodyCell>

              <BodyCell>
                <RadioButton
                  isSelected={item.hasDeviceAdminToken}
                  onClick={async () => {
                    const func = item.hasDeviceAdminToken
                      ? props.revokeDeviceAccess
                      : props.assignDeviceAccess;
                    const arg = {
                      orgId: props.orgId,
                      unitId: props.unitId,
                      memberId: item._id,
                      accessType: ORGANIZATION_ACCESS_TYPES.DEVICES_PEEK,
                    };
                    try {
                      await func(arg);
                      await props.fetchDeviceDetails({orgId: props.orgId});
                    } catch (err) {
                      // do nothing?
                    }
                  }}
                />
              </BodyCell>

              <BodyCell>
                <RadioButton
                  isSelected={item.hasEmplacementToken}
                  onClick={async () => {
                    const arg = {
                      orgId: props.orgId,
                      unitId: (item.hasEmplacementToken ? '' : props.unitId),
                      memberId: item._id,
                    };
                    try {
                      await props.moveMember(arg);
                      await props.fetchDeviceDetails({orgId: props.orgId});
                    } catch (err) {
                      // do nothing?
                    }
                  }}
                />
              </BodyCell>
            </tr>
          ))}
        </tbody>
      </table>}
    <Button
      label={'Add members to unit'}
      onClick={() => (
        props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/createMember`)
      )}
    />
  </Wrapper>
);
BasicUnitMembersPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
  // from yggio
  assignDeviceAccess: PropTypes.func.isRequired,
  revokeDeviceAccess: PropTypes.func.isRequired,
  assignManagerAccess: PropTypes.func.isRequired,
  revokeManagerAccess: PropTypes.func.isRequired,
  moveMember: PropTypes.func.isRequired,
  fetchDeviceDetails: PropTypes.func.isRequired,
  // from reselect
  unit: PropTypes.object,
  memberItems: PropTypes.array,
};

// ////
// RawUnitMembersPane - data processing layers
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
    const members = _.map(memberIds, memberId => users[memberId]);
    return _.compact(members);
  },
);

// filter for unit
const unitSelector = createSelector(
  organizationSelector,
  props => props.unitId,
  (organization, unitId) => {
    const unit = organizationUtils.findUnit(organization, unitId);
    return unit;
  },
);

const unitTokensSelector = createSelector(
  organizationSelector,
  props => props.unitId,
  (organization, unitId) => {
    const tokens = _.get(organization, 'accessTokens', []);
    const unitTokens = _.filter(tokens, {unitId});
    return unitTokens;
  },
);

// filter for unit members
const unitMembersSelector = createSelector(
  membersSelector,
  unitTokensSelector,
  (members, tokens) => {
    const unitMemberIds = _.uniq(_.map(tokens, token => token.memberId));
    const unitMembers = _.filter(members, member => _.includes(unitMemberIds, member._id));
    return unitMembers;
  },
);

const memberItemsSelector = createSelector(
  unitMembersSelector,
  unitTokensSelector,
  (unitMembers, tokens) => {
    const memberItems = _.map(unitMembers, member => {
      const memberTokens = _.filter(tokens, {memberId: member._id});
      const managerToken = _.find(
        memberTokens,
        {accessType: ORGANIZATION_ACCESS_TYPES.MANAGE_ACCESS}
      );
      const devicesReadToken = _.find(
        memberTokens,
        {accessType: ORGANIZATION_ACCESS_TYPES.DEVICES_READ}
      );
      const devicesWriteToken = _.find(
        memberTokens,
        {accessType: ORGANIZATION_ACCESS_TYPES.DEVICES_WRITE}
      );
      const devicesAdminToken = _.find(
        memberTokens,
        {accessType: ORGANIZATION_ACCESS_TYPES.DEVICES_PEEK}
      );
      const emplacementToken = _.find(
        memberTokens, {accessType: ORGANIZATION_ACCESS_TYPES.EMPLACEMENT}
      );
      const item = {
        _id: member._id,
        name: member.username,
        hasManagerToken: !!managerToken,
        hasDeviceReadToken: !!devicesReadToken,
        hasDeviceWriteToken: !!devicesWriteToken,
        hasDeviceAdminToken: !!devicesAdminToken,
        hasEmplacementToken: !!emplacementToken,
      };
      return item;
    });
    return memberItems;
  },
);


const reselectors = {
  unit: unitSelector,
  memberItems: memberItemsSelector,
};

// and compose the component

const RawUnitMembersPane = compose(
  withReselect(reselectors),
)(BasicUnitMembersPane);

RawUnitMembersPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
  // from yggio
  organizations: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  assignDeviceAccess: PropTypes.func.isRequired,
  revokeDeviceAccess: PropTypes.func.isRequired,
  assignManagerAccess: PropTypes.func.isRequired,
  revokeManagerAccess: PropTypes.func.isRequired,
  moveMember: PropTypes.func.isRequired,
  fetchDeviceDetails: PropTypes.func.isRequired,
};

// /////
// UnitMembersPane - fully yggio connected
// /////

const yggio = {
  mapYggioStateToProps: yggioState => ({
    organizations: yggioState.database.organizations,
    users: yggioState.database.users,
  }),
  mapYggioActionsToProps: yggioActions => ({
    assignDeviceAccess: yggioActions.database.organizations.assignDeviceAccess,
    revokeDeviceAccess: yggioActions.database.organizations.revokeDeviceAccess,
    assignManagerAccess: yggioActions.database.organizations.assignManagerAccess,
    revokeManagerAccess: yggioActions.database.organizations.revokeManagerAccess,
    moveMember: yggioActions.database.organizations.moveMember,
    fetchDeviceDetails: yggioActions.database.organizations.fetchDeviceDetails,
  }),
};
const UnitMembersPane = compose(
  withYggio(yggio),
)(RawUnitMembersPane);

UnitMembersPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
};

// /////
// exports
// /////

export default UnitMembersPane;
export {
  BasicUnitMembersPane,
  RawUnitMembersPane,
};
