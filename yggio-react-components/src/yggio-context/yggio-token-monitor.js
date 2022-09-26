/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import withYggio from './with-yggio';
import {getYggioToken} from './network/yggio-token';

import {CONNECTIVITY_STATES} from '../constants';

// /////
// The raw unconnected component - unconnected from yggio
//
// NOTE: this component was made inte Class since props
// were not updating between renders for the event listeners
// since "this" does not get bound properly (or adequately anyway)
// /////

class BasicYggioTokenMonitor extends React.Component {
  constructor (props) {
    super(props);
    this.checkYggioToken = this.checkYggioToken.bind(this);
  }

  componentDidMount () {
    window.addEventListener('focus', this.checkYggioToken);
    window.addEventListener('blur', this.checkYggioToken);
    document.addEventListener('focus', this.checkYggioToken);
    document.addEventListener('blur', this.checkYggioToken);
    document.addEventListener('visibilitychange', this.checkYggioToken);
    this.checkYggioToken();
  }

  componentWillUnmount () {
    window.removeEventListener('focus', this.checkYggioToken);
    window.removeEventListener('blur', this.checkYggioToken);
    document.removeEventListener('focus', this.checkYggioToken);
    document.removeEventListener('blur', this.checkYggioToken);
    document.removeEventListener('visibilitychange', this.checkYggioToken);
  }

  componentDidUpdate () {
    this.checkYggioToken();
  }

  checkYggioToken () {
    // if not active, then activate and wait for next go
    if (!this.props.isActive) {
      this.props.activate();
      return;
    }
    // parse the cookie
    const token = getYggioToken();
    const isConnected = this.props.connectivityState === CONNECTIVITY_STATES.connected;
    if (isConnected && !_.isEqual(token, this.props.yggioToken)) {
      if (!token) {
        this.props.signout();
      } else {
        this.props.storeYggioToken(token);
      }
    }
  }

  render () {
    return (
      <>
        {this.props.children || null}
      </>
    );
  }
}


BasicYggioTokenMonitor.propTypes = {
  children: PropTypes.object,
  yggioToken: PropTypes.string,
  connectivityState: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  signout: PropTypes.func.isRequired,
  storeYggioToken: PropTypes.func.isRequired,
  activate: PropTypes.func.isRequired,
};


// /////
// The exposed yggio-connected component
// /////

const yggio = {
  mapYggioStateToProps: yggioState => ({
    yggioToken: yggioState.database.auth.token,
    connectivityState: yggioState.connectivity.connectivityState,
    isActive: yggioState.connectivity.isActive,
    // yggioState: yggioState,
  }),
  mapYggioActionsToProps: yggioActions => ({
    signout: yggioActions.database.auth.signout,
    storeYggioToken: yggioActions.database.auth.storeYggioToken,
    activate: yggioActions.connectivity.activate,
  }),
};

const YggioTokenMonitor = withYggio(yggio)(BasicYggioTokenMonitor);

YggioTokenMonitor.propTypes = {
  children: PropTypes.object,
};

// /////
// exports
// /////

export default YggioTokenMonitor;
