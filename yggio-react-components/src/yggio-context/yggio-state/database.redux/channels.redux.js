/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// channels.redux.js

import _ from 'lodash';
import {actions as apiActions} from '../api-state.redux';

const ACTION_TYPES = {
  dbChannelsReplaceOne: 'dbChannelsReplaceOne',
  dbChannelsRemoveOne: 'dbChannelsRemoveOne',
  dbChannelsReplaceMany: 'dbChannelsReplaceMany',
};

const internalActions = {
  replaceChannel: channel => ({
    type: ACTION_TYPES.dbChannelsReplaceOne,
    payload: {channel},
  }),

  removeChannel: channelId => ({
    type: ACTION_TYPES.dbChannelsRemoveOne,
    payload: {channelId},
  }),

  replaceChannels: channels => ({
    type: ACTION_TYPES.dbChannelsReplaceMany,
    payload: {channels},
  }),
};

const actions = {
  createChannel: channelTemplate => async dispatch => {
    const createChannelAction = apiActions.channels.create(channelTemplate);
    const channel = await dispatch(createChannelAction);
    dispatch(internalActions.replaceChannel(channel));
  },

  fetchChannels: deviceId => async dispatch => {
    const fetchChannelsAction = apiActions.channels.get(deviceId);
    const channels = await dispatch(fetchChannelsAction);
    dispatch(internalActions.replaceChannels(channels));
  },

  removeChannel: channelId => async dispatch => {
    const deleteChannelAction = apiActions.channels.remove(channelId);
    await dispatch(deleteChannelAction);
    dispatch(internalActions.removeChannel(channelId));
  },
};

const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACTION_TYPES.dbChannelsReplaceOne: {
      const {channel} = action.payload;
      return {...state, [channel._id]: channel};
    }

    case ACTION_TYPES.dbChannelsRemoveOne: {
      const {channelId} = action.payload;
      return _.omit(state, channelId);
    }

    case ACTION_TYPES.dbChannelsReplaceMany: {
      const {channels} = action.payload;
      const replacements = {};
      _.each(channels, channel => {
        replacements[channel._id] = channel;
      });
      return {
        ...state,
        ...replacements,
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
