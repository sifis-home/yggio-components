/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import Icon from 'react-icons-kit';
import {UseQueryResult} from '@tanstack/react-query';

import Spinner from '../../../components/spinner';
import {
  CountBoxContainer,
  IconContainer,
} from '../styled';

interface CountBoxProps {
  title: string;
  icon: object;
  iconSize: number,
  query: UseQueryResult;
  onClick: () => void;
}

const CountBox = (props: CountBoxProps) => (
  <CountBoxContainer onClick={props.onClick}>
    <IconContainer>
      <Icon icon={props.icon} size={props.iconSize} />
    </IconContainer>
    {props.query?.isLoading
      ? <Spinner color={'#555'} />
      : (
        <div>
          <h3>{props.query?.error ? '-' : props.query?.data as string}</h3>
          <h4>{props.title}</h4>
        </div>
      )}
  </CountBoxContainer>
);

export default CountBox;
