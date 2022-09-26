/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// containers.js

import React from 'react';
import PropTypes from 'prop-types';

import {
  MemberItemWrapper,
} from './styled';

const MemberItem = props => (
  <MemberItemWrapper>
    <p>{`${props.index + 1}.  ${props.member.username}`}</p>
  </MemberItemWrapper>
);
MemberItem.propTypes = {
  member: PropTypes.object.isRequired,
};

export {
  MemberItem,
};
