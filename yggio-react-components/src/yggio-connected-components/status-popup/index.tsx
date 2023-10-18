import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {
  ErrorMessageContainer,
  StatusPopupHeadingSection,
  StatusPopupTitle,
  StatusPopupCloseButton,
} from '../styled';
import DeviceStatusPill from '../../components/device-status-pill';
import {DeviceStatus} from '../../utils/get-device-status';

interface ErrorFeedbackProps {
  err: {
    message: string;
  };
}

const ErrorFeedback = (props: ErrorFeedbackProps) => (
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

interface StatusPopupProps {
  title?: string;
  onClose: () => void;
  deviceStatus?: DeviceStatus;
}

const StatusPopup = (props: StatusPopupProps) => (
  <>
    <StatusPopupHeadingSection>
      <StatusPopupTitle>
        {props.title || 'no-name'}
      </StatusPopupTitle>
      <StatusPopupCloseButton onClick={props.onClose}>
        x
      </StatusPopupCloseButton>
    </StatusPopupHeadingSection>
    {_.map(props.deviceStatus?.items, item => (
      <DeviceStatusPill
        type={item.type}
        text={item.text}
        size={'large'}
        margin={'0 0 10px 0'}
      />
    ))}
  </>
);

export {
  ErrorFeedback,
  StatusPopup,
};
