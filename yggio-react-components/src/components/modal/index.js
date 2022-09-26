/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import {DEFAULTS} from './constants';
import modalState from './state';

const Modal = props => (
  <ReactModal
    isOpen={props.isOpen}
    shouldCloseOnOverlayClick={
      props.shouldCloseOnOverlayClick || DEFAULTS.shouldCloseOnOverlayClick
    }
    onRequestClose={props.close}
    onAfterOpen={() => {
      document.body.style.overflow = 'hidden';
    }}
    onAfterClose={() => document.body.style.removeProperty('overflow')}
    ariaHideApp={false}
    style={{
      overlay: {
        zIndex: 20000,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      content: {
        border: 'none',
        width: props.width || DEFAULTS.width,
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        padding: props.padding || DEFAULTS.padding,
      },
    }}
  >
    {props.children}
  </ReactModal>
);

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func,
  shouldCloseOnOverlayClick: PropTypes.bool,
  width: PropTypes.string,
  padding: PropTypes.string,
  children: PropTypes.node,
};

export {
  Modal,
  modalState,
};
