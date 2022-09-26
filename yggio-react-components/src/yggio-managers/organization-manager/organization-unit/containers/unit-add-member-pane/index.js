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
import {
  Wrapper,
  NoContendersNote,
} from './styled';

import {
  ContenderRow,
} from './sub-components';

import Button from '../../../../../components/button';

// /////
// The BasicUnitAddMemberPane - uses only fully processed data
// /////

const BasicUnitAddMemberPane = props => {

  const onSelected = async contenderId => {
    const tokenArg = {
      orgId: props.orgId,
      memberId: contenderId,
      unitId: props.unitId,
      accessType: ORGANIZATION_ACCESS_TYPES.DEVICES_READ,
    };
    try {
      await props.onAddMember(tokenArg);
    } catch (err) {
      // do nothing?
    }
  };

  return (
    <Wrapper>
      <h1>
        {`Add members to: ${_.get(props.unit, 'name', '(no name)')}`}
      </h1>
      {_.isEmpty(props.contenders) &&
        <NoContendersNote>{'No members available'}</NoContendersNote>}
      {_.map(props.contenders, contender => (
        <ContenderRow
          key={contender._id}
          contender={contender}
          onSelected={onSelected}
        />
      ))}
      <Button
        content={'Done'}
        onClick={() => props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/members`)}
        margin={'20px 0 0 0'}
      />
    </Wrapper>
  );
};
BasicUnitAddMemberPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
  // from yggio
  onAddMember: PropTypes.func.isRequired,
  // from reselect
  unit: PropTypes.object, // can be null (from selector)
  contenders: PropTypes.array.isRequired,
};

// ////
// RawUnitAddMemberPane - data processing layers
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

const contendersSelector = createSelector(
  unitTokensSelector,
  membersSelector,
  (tokens, members) => {
    const tokenIds = _.uniq(_.map(tokens, token => token.memberId));
    const contenders = _.filter(members, member => !_.includes(tokenIds, member._id));
    return contenders;
  },
);

const adminsSelector = createSelector(
  unitTokensSelector,
  membersSelector,
  tokens => {
    return _.filter(tokens, {accessType: ORGANIZATION_ACCESS_TYPES.MANAGE_ACCESS});
  },
);

const emplacementsSelector = createSelector(
  unitTokensSelector,
  membersSelector,
  tokens => {
    return _.filter(tokens, {accessType: ORGANIZATION_ACCESS_TYPES.EMPLACEMENT});
  },
);

const reselectors = {
  unit: unitSelector,
  managers: adminsSelector,
  emplacements: emplacementsSelector,
  contenders: contendersSelector,
};

// And compose the component

const RawUnitAddMemberPane = compose(
  withReselect(reselectors),
)(BasicUnitAddMemberPane);

RawUnitAddMemberPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
  // from yggio
  organizations: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  onAddMember: PropTypes.func.isRequired,
};

// /////
// UnitAddMemberPane - fully yggio connected
// /////

const yggio = {
  mapYggioStateToProps: yggioState => ({
    organizations: yggioState.database.organizations,
    users: yggioState.database.users,
  }),
  mapYggioActionsToProps: yggioActions => ({
    onAddMember: yggioActions.database.organizations.assignDeviceAccess,
  }),
};
const UnitAddMemberPane = compose(
  withYggio(yggio),
)(RawUnitAddMemberPane);

UnitAddMemberPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
};

// /////
// exports
// /////

export default UnitAddMemberPane;
export {
  BasicUnitAddMemberPane,
  RawUnitAddMemberPane,
};
