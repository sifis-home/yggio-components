/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import PropTypes from 'prop-types';

import {ContainerBoxStyled} from './styled';

const ContainerBox = props => {
  return (
    <ContainerBoxStyled
      {...props}
      width={props.width}
      maxWidth={props.maxWidth}
      minWidth={props.minWidth}
      height={props.height}
      minHeight={props.minHeight}
      margin={props.margin}
      padding={props.padding}
      background={props.background}
      position={props.position}
      display={props.display}
      flexDirection={props.flexDirection}
      widthReduction={props.widthReduction}
      heightReduction={props.heightReduction}
    >
      {props.children}
    </ContainerBoxStyled>
  );
};

ContainerBox.propTypes = {
  style: PropTypes.object,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
  height: PropTypes.string,
  minHeight: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  background: PropTypes.string,
  position: PropTypes.string,
  display: PropTypes.string,
  flexDirection: PropTypes.string,
  widthReduction: PropTypes.string,
  heightReduction: PropTypes.string,
  children: PropTypes.node,
  includeMarginInHeight: PropTypes.bool,
  includeMarginInWidth: PropTypes.bool,
};

export default ContainerBox;
