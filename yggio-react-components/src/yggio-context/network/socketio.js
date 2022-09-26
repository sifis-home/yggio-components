/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import socketio from 'socket.io-client';
import {Server} from 'mock-socket';
import {getYggioToken} from './yggio-token';
import {store} from '../with-yggio';
import {internalActions} from '../yggio-state/database.redux/devices.redux';
import {actions as subscriptionsActions} from '../yggio-state/database.redux/device-subscriptions.redux';

const MESSAGE = 'message';
const LISTEN = 'listen';
const ERROR = 'error';
const DISCONNECT = 'disconnect';
const CONNECT = 'connect';

const state = {
  connected: false,
};

const socket = null;

const subscribe = deviceIds => {
  return null;
};

const getSocket = () => socket;

export {
  getSocket,
  subscribe,
};
