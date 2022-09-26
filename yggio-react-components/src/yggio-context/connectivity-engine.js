/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// connectivity-engine.js

// This one is deliberately kept stand-alone, as it generates its own effective
// external context, and MUST be initialized with the store at startup

import _ from 'lodash';
import delay from 'delay';

import {CONNECTIVITY_STATES} from '../constants';

import {actions as yggioActions} from './yggio-state'; // THIS IS SPECIAL

const NETWORK_CHECK_PERIOD = 1000; // ms

let store;
const initialize = injectedStore => {
  store = injectedStore;
  manageConnectivity();
};

const manageConnectivity = async () => {
  // check the connectivity
  if (typeof window !== 'undefined') {
    const {navigator} = window;
    const isOnline = navigator.onLine;
    const {isActive} = store.getState().connectivity;
    const {connectivityState} = store.getState().connectivity;

    if (isOnline && isActive && connectivityState === CONNECTIVITY_STATES.offline) {
      store.dispatch(yggioActions.connectivity.setOnline());
    }
    if ((!isOnline || !isActive) && connectivityState !== CONNECTIVITY_STATES.offline) {
      store.dispatch(yggioActions.connectivity.setOffline());
    }

    // TO_BE_CONSIDERED: a more elaborate delay generating algorithm (generator)
    const delayPeriod = NETWORK_CHECK_PERIOD;
    await delay(delayPeriod);

    // recurse
    manageConnectivity();
  }
};


export {
  initialize,
};
