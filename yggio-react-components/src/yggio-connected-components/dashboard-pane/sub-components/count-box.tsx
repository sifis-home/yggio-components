import React from 'react';
import type {IconType} from 'react-icons';
import {UseQueryResult} from '@tanstack/react-query';

import Spinner from '../../../components/spinner';
import {CountBoxContainer} from '../styled';

interface CountBoxProps {
  title: string;
  icon: IconType;
  iconSize: number,
  query: UseQueryResult;
  onClick: () => void;
}

const CountBox = (props: CountBoxProps) => (
  <CountBoxContainer onClick={props.onClick}>
    <props.icon size={props.iconSize} color='#3C7D44' style={{margin: '0 20px'}} />
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
