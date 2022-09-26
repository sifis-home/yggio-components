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
import {confirmAlert} from 'react-confirm-alert';

import {compose} from 'lodash/fp';
import {createSelector} from 'reselect';
import {withReselect} from '../../../../../hocs';
import {withYggio} from '../../../../../yggio-context';

import {organizationUtils} from '../../../../../utils';

import {
  Wrapper,
  Heading,
  UnitName,
  UnitDescription,
  NoUnitDescription,
  ButtonsContainer,
} from './styled';
import Button from '../../../../../components/button';

const BasicUnitSummaryPane = props => {

  const deleteUnit = async () => {
    await props.deleteUnit({
      orgId: props.orgId,
      unitId: props.unitId,
    });
    props.router.push(`/organizations/${props.orgId}/summary`);
  };

  return (
    <Wrapper>

      <Heading>
        {'Name:'}
      </Heading>
      <UnitName>
        {_.get(props.unit, 'name') || '(no name)'}
      </UnitName>
      <Heading>
        {'Description:'}
      </Heading>

      {!!_.get(props.unit, 'description') && (
        <UnitDescription>
          {props.unit.description}
        </UnitDescription>
      )}
      {!_.get(props.unit, 'description') && (
        <NoUnitDescription>
          {'No description'}
        </NoUnitDescription>
      )}

      <ButtonsContainer>
        <Button
          content={'Edit'}
          onClick={() => {
            props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/edit`);
          }}
        />
        {!props.isRootUnit && (
          <Button
            onClick={() => {
              const buttons = [
                {
                  label: 'Yes',
                  onClick: () => { deleteUnit(); }
                },
                {
                  label: 'No',
                  onClick: () => { },
                }
              ];
              confirmAlert({
                title: 'Remove organization?',
                message: `Are you sure you want the remove organization subunit
                  : "${_.get(props.unit, 'name', 'Organization not found')}"?`,
                buttons,
              });
            }}
            content={'Delete'}
            color="red"
            margin="0 0 0 10px"
          />
        )}
      </ButtonsContainer>

    </Wrapper>
  );
};

BasicUnitSummaryPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
  // from reselect
  unit: PropTypes.object, // can be null
  isRootUnit: PropTypes.bool,
};

// extract organization
const organizationSelector = createSelector(
  props => props.organizations,
  props => props.orgId,
  (organizations, orgId) => {
    const organization = _.get(organizations, orgId);
    return organization;
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

const isRootUnitSelector = createSelector(
  organizationSelector,
  props => props.unitId,
  (organization, unitId) => {
    const isRootUnit = unitId && unitId === _.get(organization, 'rootUnit._id');
    return isRootUnit;
  },
);

const reselectors = {
  unit: unitSelector,
  isRootUnit: isRootUnitSelector,
};

const RawUnitSummaryPane = compose(
  withReselect(reselectors),
)(BasicUnitSummaryPane);

RawUnitSummaryPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
  // from yggio
  organizations: PropTypes.object,
};

const yggio = {
  mapYggioStateToProps: yggioState => ({
    organizations: yggioState.database.organizations,
  }),
  mapYggioActionsToProps: yggioActions => ({
    deleteUnit: yggioActions.database.organizations.deleteUnit,
  }),
};
const UnitSummaryPane = compose(
  withYggio(yggio),
)(RawUnitSummaryPane);

UnitSummaryPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
};

export default UnitSummaryPane;
export {
  BasicUnitSummaryPane,
  RawUnitSummaryPane,
};
