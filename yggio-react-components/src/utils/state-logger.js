/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {ENV_TYPES} from '../constants';
import {getConfig} from '../yggio-config';

// NOTE: This is mimicking the redux-logger package

const STYLES = {
  title1: [
    `color: #7E7E7E`,
    `font-weight: normal`,
  ],
  title2: [
    `color: #BBC5CF`,
    `font-weight: bold`,
  ],
  title3: [
    `color: #7E7E7E`,
    `font-weight: normal`,
  ],
  prevState: [
    `color: #9E9E9E`,
    `font-weight: bold`,
  ],
  action: [
    `color: #03A9F4`,
    `font-weight: bold`,
  ],
  nextState: [
    `color: #4CAF50`,
    `font-weight: bold`,
  ],
};

const getStyle = path => STYLES[path].join('; ');

const repeat = (str, times) => (new Array(times + 1)).join(str);
const pad = (num, maxLength) => repeat('0', maxLength - num.toString().length) + num;
const getTime = () => {
  const time = new Date();
  return `${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}:${pad(time.getSeconds(), 2)}.${pad(time.getMilliseconds(), 3)}`;
};

/**
 *
 * @param reducer
 * @returns {function(*=, *=): *}
 */
const logState = reducer => (state, action) => {
  const nextState = reducer(state, action);
  console.groupCollapsed(`%c action %c${action.type} %c@ ${getTime()}`, getStyle('title1'), getStyle('title2'), getStyle('title3'));
  console.info('%cprev state', getStyle('prevState'), state);
  console.info('%caction', getStyle('action'), action);
  console.info('%cnext state', getStyle('nextState'), nextState);
  console.groupEnd();
  return nextState;
};

const createStateLogger = reducer => {
  if (_.eq(getConfig().nodeEnv, ENV_TYPES.development)) {
    return logState(reducer);
  }
  return reducer;
};

export default createStateLogger;
