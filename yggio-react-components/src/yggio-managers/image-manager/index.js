/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// image-manager/index.ts

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';


import {ModalProvider} from 'styled-react-modal';
import {
  YggioTokenMonitor,
  YggioMessageToaster,
} from '../../yggio-context';

import {ImageManagerContainer} from './styled';
import Routes from './routes';

const ImageManager = (props) => (
  <ImageManagerContainer>
    <YggioMessageToaster />
    <YggioTokenMonitor >
      <ModalProvider>
        <Routes />
      </ModalProvider>
    </YggioTokenMonitor>

  </ImageManagerContainer>
);

ImageManager.propTypes = {
  // none
};

export default ImageManager;
