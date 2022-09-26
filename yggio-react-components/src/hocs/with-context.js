/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React, {useContext} from 'react';
import {createActionDispatches} from '../utils';

const withContext = ({context, actions}) => Component => props => {
  const {state, dispatch} = useContext(context);
  const actionDispatches = createActionDispatches(actions, dispatch);
  return <Component
    {...state}
    {...actionDispatches}
    {...props}
         />;
};

export default withContext;
