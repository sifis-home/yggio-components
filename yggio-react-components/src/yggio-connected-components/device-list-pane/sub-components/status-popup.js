/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  ErrorMessageContainer,
  StatusPopupHeadingSection,
  StatusPopupTitle,
  StatusPopupCloseButton,
  LargeStatusChip,
  StatusChipIcon,
} from '../../styled';

const ErrorFeedback = props => (
  <>
    {
      !props.err
        ? null
        : <ErrorMessageContainer>{props.err.message}</ErrorMessageContainer>
    }
  </>
);

ErrorFeedback.propTypes = {
  err: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
};

const StatusPopup = props => (
  <>
    <StatusPopupHeadingSection>
      <StatusPopupTitle>
        {props.title}
      </StatusPopupTitle>
      <StatusPopupCloseButton onClick={props.onClose}>
        x
      </StatusPopupCloseButton>
    </StatusPopupHeadingSection>
    {_.map(props.items, item => (
      <LargeStatusChip type={item.type} key={item.text}>
        <StatusChipIcon type={item.type} marginright={'4px'} />
        {item.text}
      </LargeStatusChip>
    ))}
  </>
);

export {
  ErrorFeedback,
  StatusPopup,
};
