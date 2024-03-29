﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {ReactNode} from 'react';
import ReactModal from 'react-modal';

import {DEFAULTS} from './constants';

interface ModalProps {
  isOpen: boolean;
  close?: () => void;
  shouldCloseOnOverlayClick?: boolean;
  width?: string;
  height?: string;
  padding?: string;
  children?: ReactNode;
}

const Modal = (props: ModalProps) => (
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
        zIndex: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      content: {
        border: 'none',
        width: props.width || DEFAULTS.width,
        height: props.height,
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

export default Modal;
