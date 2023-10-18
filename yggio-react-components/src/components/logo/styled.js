import styled from 'styled-components';

import {DEFAULTS} from './constants';

const LogoImg = styled.img`
  height: ${({height = DEFAULTS.height}) => height};
  width: ${({width = DEFAULTS.width}) => width};
  margin: ${({margin = DEFAULTS.margin}) => margin};
  color: ${({color = DEFAULTS.color}) => color};
  background-color: ${({backgroundColor = DEFAULTS.backgroundColor}) => backgroundColor};
  border-radius: 100%;
`;

export {
  LogoImg,
};
