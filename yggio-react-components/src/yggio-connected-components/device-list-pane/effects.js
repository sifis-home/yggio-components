/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';

const withCreateSubscriptions = Component => props => {
  React.useEffect(() => {
    const deviceIds = _.keys(props.devices);
    props.createSubscriptions(deviceIds);
    return () => props.removeSubscriptions(deviceIds);
  }, [props.devices]);

  return <Component {...props} />;
};

const withFetchAccessRights = Component => props => {
  React.useEffect(() => {
    const subjectId = _.get(props.auth, 'user._id');
    if (subjectId) {
      props.fetchAccessRights({subjectId});
    }
    return () => props.resetAccessRights();
  }, [props.auth]);

  return <Component {...props} />;
};

const withFetchRulesActions = Component => props => {
  React.useEffect(() => {
    props.fetchRulesActions();
  }, []);

  return <Component {...props} />;
};

export {
  withCreateSubscriptions,
  withFetchAccessRights,
  withFetchRulesActions,
};
