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

import {withState} from '../../../../hocs';

import config from './config';
import BasicFormComponent from './component';

const connectorOptions = [
  {
    value: '123',
    label: 'connector nbr one',
  },
  {
    value: '321',
    label: 'connector nbr two',
  },
];

const story = () => {
  const formState = generateForm(config);

  const RawFormComponent = compose(
    withState(formState),
  )(BasicFormComponent);

  const FormComponent = props => {
    return (
      <RawFormComponent
        {...props}
        connectorOptions={connectorOptions}
      />
    );
  };

  return <FormComponent />;
};

export default story;
