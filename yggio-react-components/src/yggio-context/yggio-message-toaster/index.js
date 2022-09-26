/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import toast, {Toaster} from 'react-hot-toast';
import withYggio from '../with-yggio';
import {TOAST_TYPES} from '../../constants';

// /////
// The raw unconnected component - unconnected from yggio
// /////


const BasicYggioMessageToaster = props => {


  useEffect(() => {
    if (props.messageItems.length) {
      _.each(props.messageItems, messageItem => {
        if (_.isError(messageItem) && messageItem.isAxiosError && messageItem.response) {
          const {response} = messageItem;

          const missingDesc = 'Error description is missing.';
          const description = _.get(response, 'data.description') ||
            _.get(response, 'data') ||
            _.get(messageItem, 'body') ||
            missingDesc;
          const message = `${description} (${response.statusText} - ${response.status})`;
          toast.error(message);
          if (description === missingDesc) {
            console.warn('DevWarn: error isAxiosError but does not have description nor body.', {messageItem});
          }
        } else if (_.isError(messageItem)) {
          if (messageItem.message) {
            toast.error(messageItem.message);
          } else {
            console.warn('DevWarn: messageItem is error but does not have .message', {messageItem});
          }
        } else if (_.isString(messageItem)) {
          if (!toast.isActive(messageItem)) {
            toast.error(messageItem);
          }
        } else if (_.isObject(messageItem)) {
          const toastType = TOAST_TYPES[messageItem.toastType] || TOAST_TYPES.default;
          switch (toastType) {
            case TOAST_TYPES.default: {
              toast.error(messageItem.message);
              break;
            }
            default: {
              toast[toastType](messageItem.message);
              break;
            }
          }
        } else {
          throw new Error('DevErr: Invalid toast type', {messageItem});
        }

      });

      // still inside the if - wipe all messages (will trigger another effect)
      props.wipeMessages();
    }

  });

  return (
    <Toaster position={'bottom-left'} />
  );
};

BasicYggioMessageToaster.propTypes = {
  // from yggio
  messageItems: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      toastType: PropTypes.oneOf(_.values(TOAST_TYPES)), // NOT required!
    }),
  ])).isRequired,
  wipeMessages: PropTypes.func.isRequired,
};

// /////
// The exposed yggio-connected component
// /////

const yggio = {
  mapYggioStateToProps: yggioState => ({
    messageItems: yggioState.messageStack.messageItems,
  }),
  mapYggioActionsToProps: yggioActions => ({
    wipeMessages: yggioActions.messageStack.wipeMessages,
  }),
};

const YggioMessageToaster = withYggio(yggio)(BasicYggioMessageToaster);

YggioMessageToaster.propTypes = {}; // no props from up top


// /////
// exports
// /////

export default YggioMessageToaster;
export {BasicYggioMessageToaster};
