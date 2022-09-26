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
  Subunit,
  SubunitName,
  SubunitNumChildren,
} from './styled';

import Button from '../../../../../components/button';

// /////
// The BasicUnitSubunitsPane - uses only fully processed data
// /////

const BasicUnitSubunitsPane = props => {

  const deleteUnit = async unitId => {
    await props.deleteUnit({
      orgId: props.orgId,
      unitId,
    });
    props.router.push(`/organizations/${props.orgId}/summary`);

  };
  return (
    <Wrapper>
      {_.map(_.get(props.unit, 'children'), subUnit => (
        <Subunit
          key={subUnit._id}
          onClick={() => {
            props.router.push(`/organizations/${props.orgId}/units/${subUnit._id}/summary`);
          }}
        >
          <SubunitName>
            {subUnit.name}
          </SubunitName>
          <SubunitNumChildren>
            {`${_.get(subUnit, 'children.length')} children`}
          </SubunitNumChildren>
          <Button
            width={'70px'}
            height={'30px'}
            color={'red'}
            content={'Delete'}
            onClick={evt => {
              evt.stopPropagation();
              const buttons = [
                {
                  label: 'Yes',
                  onClick: () => { deleteUnit(subUnit._id); },
                },
                {
                  label: 'No',
                  onClick: () => { }
                }
              ];
              confirmAlert({
                title: 'Remove organization subunit?',
                message: `Are you sure you want the remove organization subunit: "${subUnit.name}"?`,
                buttons,
              });
            }}
          />
        </Subunit>
      ))}
      <Button
        content={'Add subunit'}
        onClick={() => {
          props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/addSubunit`);
        }}
        margin={'20px 0 0 0'}
      />
    </Wrapper>
  );
};

BasicUnitSubunitsPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
  // from reselect
  unit: PropTypes.object, // can be null
};


// /////
// Data processing layers
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

// filter for unit
const unitSelector = createSelector(
  organizationSelector,
  props => props.unitId,
  (organization, unitId) => {
    const unit = organizationUtils.findUnit(organization, unitId);
    return unit;
  },
);

const reselectors = {
  unit: unitSelector,
};

// ////
// RawUnitSubunitsPane - disconnected from yggio
// ////

const RawUnitSubunitsPane = compose(
  withReselect(reselectors),
)(BasicUnitSubunitsPane);

RawUnitSubunitsPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
  // from yggio
  organizations: PropTypes.object.isRequired,
};

// /////
// UnitSubunitsPane - fully yggio connected
// /////

const yggio = {
  mapYggioStateToProps: yggioState => ({
    organizations: yggioState.database.organizations,
  }),
  mapYggioActionsToProps: yggioActions => ({
    deleteUnit: yggioActions.database.organizations.deleteUnit,
  }),
};
const UnitSubunitsPane = compose(
  withYggio(yggio),
)(RawUnitSubunitsPane);

UnitSubunitsPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
};


// /////
// exports
// /////

export default UnitSubunitsPane;
export {
  BasicUnitSubunitsPane,
  RawUnitSubunitsPane,
};
