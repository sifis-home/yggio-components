/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// organization-manager/containers.js

import React from 'react';
import PropTypes from 'prop-types';

import {ErrorMessageContainer} from './styled';

const ErrorFeedback = props => (
  <>
    {
      !props.err
        ? null
        : (<ErrorMessageContainer>{props.err.message}</ErrorMessageContainer>)
    }
  </>
);
ErrorFeedback.propTypes = {
  err: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
};

export {
  ErrorFeedback,
};
