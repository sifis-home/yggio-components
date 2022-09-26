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
  Container, Dash, Item
} from './styled';

const Breadcrumbs = props => {
  return (
    <Container
      fontSize={props.fontSize}
    >
      {_.map(props.crumbs, (crumb, index) => (
        <React.Fragment key={index}>
          <Item onClick={() => props.onClick(index)}>{crumb}</Item>
          {index !== props.crumbs.length - 1 && (
            <Dash> /</Dash>
          )}
        </React.Fragment>
      ))}
    </Container>
  );
};

Breadcrumbs.propTypes = {
  fontSize: PropTypes.string,
  crumbs: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
};

export default Breadcrumbs;
