/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

const withAddedTranslatorChanged = Component => props => {
  React.useEffect(() => {
    props.onChange(props.addedTranslators);
  }, [props.addedTranslators]);
  return <Component {...props} />;
};

const withAddDefaultTranslator = Component => props => {
  React.useEffect(() => {

    if (props.shouldAddDefaultTranslator) {
      props.addTranslator(props.transformedAvailableTranslators[0]);
    } else if (props.initialTranslators && props.initialTranslators.length > 0) {
      props.addInitialTranslators(props.initialTranslators);
    }
  }, []);
  return <Component {...props} />;
};

const withAvailableTranslatorChanged = Component => props => {
  React.useEffect(() => {
    if (props.shouldAddAvailableAsDefault) {
      props.resetAddedTranslators();
    }
  }, [props.availableTranslators]);
  return <Component {...props} />;
};

export {
  withAddedTranslatorChanged,
  withAddDefaultTranslator,
  withAvailableTranslatorChanged,
};
