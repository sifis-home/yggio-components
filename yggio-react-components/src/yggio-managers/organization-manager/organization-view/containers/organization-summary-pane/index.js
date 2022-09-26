/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {compose} from 'lodash/fp';
import React from 'react';
import PropTypes from 'prop-types';

import {createSelector} from 'reselect';
import {FlexSpaceBetweenWrapper} from '../../../../../global/styled';
import {
  withEffect,
  withReselect,
} from '../../../../../hocs';
import {
  withYggio,
} from '../../../../../yggio-context';


import {
  OrganizationSummaryWrapper,
  Heading,
  OrganizationName,
  OrganizationDescription,
} from './styled';

import {fetchOrganization} from './effects';
import Button from '../../../../../components/button';


// /////
// The BasicOrganizationSummaryPane - uses only fully processed data
// /////

const BasicOrganizationSummaryPane = props => {
  return (
    <OrganizationSummaryWrapper>
      <Heading>Name:</Heading>
      <OrganizationName>{_.get(props.organization, 'res.name', 'Organization not found')}</OrganizationName>
      <Heading>Description:</Heading>
      <OrganizationDescription>{_.get(props.organization, 'res.description', 'This is a description')}</OrganizationDescription>
      <FlexSpaceBetweenWrapper>
        {props.canEditMeta && (
          <Button
            content={'Edit'}
            onClick={() => props.router.push(`/organizations/${props.orgId}/edit`)}
          />
        )}
        {/* TODO: Enable when API has org removal capability
          <Button
            color={'red'}
            content={'Delete'}
            onClick={() => {
              const buttons = [
                {
                  label: 'Yes',
                  onClick: () => {},
                },
                {
                  label: 'No',
                  onClick: () => {}
                }
              ];
              confirmAlert({
                title: 'Remove organization?',
                message: `Are you sure you want the remove organization
                  : "${_.get(props.organization, 'res.name', 'Organization not found')}"?
                `,
                buttons,
              });
            }}
          />
         */}
      </FlexSpaceBetweenWrapper>
    </OrganizationSummaryWrapper>
  );
};


BasicOrganizationSummaryPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  // from reselect
  organization: PropTypes.object,
  canEditMeta: PropTypes.bool.isRequired,
};


// ////
// RawOrganizationTabBar - data processing layer
// /////

// extract organization
const organizationSelector = createSelector(
  props => props.organization,
  organization => {
    // const organization = _.get(organizations, orgId);
    return organization;
  },
);

const canEditMetaSelector = createSelector(
  props => props.user,
  organizationSelector,
  (user, organization) => {
    const userId = _.get(user, '_id');
    const ownerId = _.get(organization, 'res.ownerId');
    const isOwner = userId === ownerId;
    return isOwner;
  },
);

const reselectors = {
  organization: organizationSelector,
  canEditMeta: canEditMetaSelector,
};

// and compose the component

const RawOrganizationSummaryPane = compose(
  withEffect(fetchOrganization, {init: []}),
  withReselect(reselectors),
)(BasicOrganizationSummaryPane);

RawOrganizationSummaryPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  // from yggio
  organization: PropTypes.object.isRequired,
  user: PropTypes.object, // can be null
};


// /////
// OrganizationSummaryPane - fully yggio connected
// /////

// and yggio
const yggio = {
  mapYggioStateToProps: yggioState => ({
    organization: yggioState.apiState.organizations.getOrganization,
    user: yggioState.database.auth.user
  }),
  mapYggioActionsToProps: yggioActions => ({
    getOrganization: yggioActions.apiState.organizations.getOrganization,
  }),
};

const OrganizationSummaryPane = compose(
  withYggio(yggio),
)(RawOrganizationSummaryPane);

OrganizationSummaryPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
};


// /////
// exports
// /////

export default OrganizationSummaryPane;
export {
  BasicOrganizationSummaryPane,
  RawOrganizationSummaryPane,
};
