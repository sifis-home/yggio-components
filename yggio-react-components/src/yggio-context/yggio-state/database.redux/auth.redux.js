/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// auth.redux.js

// import _ from 'lodash';
import {actions as apiActions} from '../api-state.redux';
import {
  setYggioToken as setCookieToken,
  removeYggioToken as removeCookieToken,
} from '../../network/yggio-token';

const AUTH_SET_INFO = 'AUTH_SET_INFO';
const AUTH_SET_CODE = 'AUTH_SET_CODE';
const AUTH_SET_YGGIO_TOKEN = 'AUTH_SET_YGGIO_TOKEN';
const AUTH_SET_YGGIO_USER = 'AUTH_SET_YGGIO_USER';

const internalActions = {

  setInfo: info => ({
    type: AUTH_SET_INFO,
    payload: {info},
  }),

  setCode: code => ({
    type: AUTH_SET_CODE,
    payload: {code},
  }),

  setToken: token => ({
    type: AUTH_SET_YGGIO_TOKEN,
    payload: {token},
  }),

  setUser: user => ({
    type: AUTH_SET_YGGIO_USER,
    payload: {user},
  }),

};

const storeYggioToken = token => dispatch => {
  dispatch(internalActions.setToken(token));
  dispatch(internalActions.setUser(null));
  if (token) {
    const retrieveUserAction = apiActions.auth.getTokenUser();
    return dispatch(retrieveUserAction)
      .then(user => {
        dispatch(internalActions.setUser(user));
      })
      .catch(err => undefined);
  }
};

const actions = {
  updateCurrentUser: ({data}) => async dispatch => {
    const updateUserAction = apiActions.users.update({data});
    await dispatch(updateUserAction);
    dispatch(internalActions.setUser(data));
  },

  storeYggioToken, // needs to be exported individually for the monitor

  info: () => async dispatch => {
    const infoAction = apiActions.auth.info();
    const authInfo = await dispatch(infoAction);
    dispatch(internalActions.setInfo(authInfo));
  },

  code: params => async dispatch => {
    const codeAction = apiActions.auth.code(params);
    const {token} = await dispatch(codeAction);
    setCookieToken(token);
    return storeYggioToken(token)(dispatch);
  },

  signout: () => dispatch => {
    removeCookieToken();
    dispatch(internalActions.setToken(null));
    dispatch(internalActions.setUser(null));
  },

  localLogin: ({username, password}) => dispatch => {
    const loginAction = apiActions.auth.localLogin({username, password});
    return dispatch(loginAction)
      .then(({token}) => {
        setCookieToken(token);
        return storeYggioToken(token)(dispatch);
      })
      .catch(err => undefined); // should these really be caught? hmm..
  },

  signup: ({username, password, email}) => dispatch => {
    const signupAction = apiActions.users.create({
      username, password, email,
    });
    return dispatch(signupAction)
      .catch(err => undefined); // should these really be caught? hmm..
  },

};

const defaultState = {
  info: null,
  code: null,
  token: null,
  user: null,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case AUTH_SET_INFO: {
      const {info} = action.payload;
      if (!info) {
        return {
          ...state,
          info: null,
        };
      }
      return {
        ...state,
        info,
      };
    }

    case AUTH_SET_CODE: {
      const {code} = action.payload;
      if (!code) {
        return {
          ...state,
          code: null,
        };
      }
      return {
        ...state,
        code,
      };
    }

    case AUTH_SET_YGGIO_TOKEN: {
      const {token} = action.payload;
      if (!token) {
        return {
          ...state,
          token: null,
        };
      }
      return {
        ...state,
        token,
      };
    }

    case AUTH_SET_YGGIO_USER: {
      const {user} = action.payload;
      if (!user) {
        return {
          ...state,
          user: null,
        };
      }
      return {
        ...state,
        user,
      };
    }

    default: {
      return state;
    }
  }
};

export {
  actions,
  reducer,
};
