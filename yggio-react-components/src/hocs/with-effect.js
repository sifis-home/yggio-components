/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React, {useEffect} from 'react';
import _ from 'lodash';

const withEffect = (effect, {init, consume} = {}) => Component => {
  // NOTE: this is a React-function
  const EffectComponent = props => {
    useEffect(() => {
      effect(props);
    }, init);
    const survivingProps = _.omit(props, _.concat([], consume));
    return (<Component {...survivingProps} />);
  };

  return EffectComponent;
};


export default withEffect;
