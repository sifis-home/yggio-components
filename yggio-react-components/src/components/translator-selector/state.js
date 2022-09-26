/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';

const ACTION_TYPES = {
  addInitialTranslators: 'addInitialTranslators',
  addTranslator: 'addTranslator',
  removeTranslator: 'removeTranslator',
  moveTranslatorUp: 'moveTranslatorUp',
  moveTranslatorDown: 'moveTranslatorDown',
  setUpdateOption: 'setUpdateOption',
  setVersion: 'setVersion',
  resetAddedTranslators: 'resetAddedTranslators',
};

const defaultState = {
  addedTranslators: [],
};

const actions = {

  addInitialTranslators: initialTranslators => ({
    type: ACTION_TYPES.addInitialTranslators,
    payload: {initialTranslators},
  }),

  addTranslator: transformedTranslator => ({
    type: ACTION_TYPES.addTranslator,
    payload: {transformedTranslator},
  }),

  removeTranslator: translator => ({
    type: ACTION_TYPES.removeTranslator,
    payload: {translator},
  }),

  moveTranslatorUp: translator => ({
    type: ACTION_TYPES.moveTranslatorUp,
    payload: {translator},
  }),

  moveTranslatorDown: translator => ({
    type: ACTION_TYPES.moveTranslatorDown,
    payload: {translator},
  }),

  setVersion: (version, index) => ({
    type: ACTION_TYPES.setVersion,
    payload: {version, index},
  }),

  setUpdateOption: (updateOption, index) => ({
    type: ACTION_TYPES.setUpdateOption,
    payload: {updateOption, index},
  }),

  resetAddedTranslators: () => ({
    type: ACTION_TYPES.resetAddedTranslators,
  }),
};

const reducer = (state = defaultState, action) => {
  if (!action) {
    return state;
  }
  const {type, payload} = action;
  switch (type) {

    case ACTION_TYPES.addInitialTranslators: {

      const {initialTranslators} = payload;
      return {
        addedTranslators: initialTranslators,
      };
    }

    case ACTION_TYPES.addTranslator: {

      const versionArray = payload.transformedTranslator.versions;
      const length = versionArray.length - 1;
      const selectedVersion = versionArray[length];
      return {
        addedTranslators: state.addedTranslators.concat([{
          name: payload.transformedTranslator.name,
          username: payload.transformedTranslator.username,
          selectedVersion,
          versions: versionArray,
          updateOption: 'minor',
        }]),
      };
    }

    case ACTION_TYPES.removeTranslator: {
      return {
        addedTranslators: _.without(state.addedTranslators, payload.translator)
      };
    }

    case ACTION_TYPES.moveTranslatorUp: {
      const newArray = _.cloneDeep(state.addedTranslators);
      const newIndex = payload.translator - 1;
      const element = state.addedTranslators[payload.translator];
      newArray.splice(payload.translator, 1);
      newArray.splice(newIndex, 0, element);
      return {
        addedTranslators: newArray
      };
    }

    case ACTION_TYPES.moveTranslatorDown: {
      const newArray = _.cloneDeep(state.addedTranslators);
      const newIndex = payload.translator + 1;
      const element = state.addedTranslators[payload.translator];
      newArray.splice(payload.translator, 1);
      newArray.splice(newIndex, 0, element);
      return {
        addedTranslators: newArray
      };
    }

    case ACTION_TYPES.setUpdateOption: {
      const newArray = _.cloneDeep(state.addedTranslators);
      newArray[payload.index].updateOption = payload.updateOption;
      return {
        addedTranslators: newArray
      };
    }

    case ACTION_TYPES.setVersion: {
      const newArray = _.cloneDeep(state.addedTranslators);
      newArray[payload.index].selectedVersion = payload.version;
      return {
        addedTranslators: newArray
      };
    }

    case ACTION_TYPES.resetAddedTranslators: {
      return defaultState;
    }

    default: {
      return state;
    }
  }
};

export default {
  actions,
  reducer,
};
