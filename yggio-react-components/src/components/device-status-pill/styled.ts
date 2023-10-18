import styled from 'styled-components';

import {StatusTypeNames} from '../../constants';

interface ContainerProps {
  type: StatusTypeNames;
  size: 'small' | 'large';
  margin?: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  width: ${({size}) => size === 'small' ? 'auto' : '100%'};
  margin: ${({margin}) => margin || '0'};
  align-items: center;
  height: ${({size}) => size === 'small' ? '20px' : '24px'};
  border-radius: 15px;
  color: white;
  font-size: 12px;
  white-space: nowrap;
  padding: ${({size}) => size === 'small' ? '0 7px 0 5px' : '0 7px 0 10px'};
  cursor: pointer;
  background: ${({type}) => {
    if (type === StatusTypeNames.ok) { return '#75A47B'; }
    if (type === StatusTypeNames.warning) { return '#d9ba27'; }
    if (type === StatusTypeNames.error) { return '#CA6F6F'; }
    if (type === StatusTypeNames.info) { return '#6F99CA'; }
  }};
`;

const Text = styled.p`
  margin: 0 0 0 2px;
`;

export {
  Container,
  Text,
};
