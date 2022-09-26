/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// form-wizard/default/index.ts

import React from 'react';
import {compose} from 'lodash/fp';

import {generateForm} from '../../index';

import {withState, withEffect} from '../../../../hocs';

import config from './config';
import BasicFormComponent from './component';

const story = () => {
  const formState = generateForm(config);

  const initializeFormEffect = props => {
    if (!props.isPopulated) {
      props.populateInputValues({
        name: 'Existing Name',
        description: 'This is an existing description that I want to edit.',
        noConfigValue: 'I will not get added because I do not have a config :('
      });
    }
  };

  const RawFormComponent = compose(
    withState(formState),
    withEffect(initializeFormEffect, {init: []}),
  )(BasicFormComponent);

  return <RawFormComponent />;
};

export default story;
