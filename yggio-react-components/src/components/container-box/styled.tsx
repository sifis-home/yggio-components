import styled from 'styled-components';

import {DEFAULTS} from './constants';
import ContainerBoxProps from './types';


const ContainerBoxStyled = styled.div<ContainerBoxProps>`
  box-sizing: border-box;
  position: ${({position}) => position || DEFAULTS.position};
  display: ${({display}) => display || DEFAULTS.display};
  flex-direction: ${({flexDirection}) => flexDirection || DEFAULTS.flexDirection};
  max-width: ${({maxWidth}) => maxWidth || DEFAULTS.maxWidth};
  min-width: ${({minWidth}) => minWidth || DEFAULTS.minWidth};
  min-height: ${({minHeight}) => minHeight || DEFAULTS.minHeight};
  height: ${({height, heightReduction}) => {
    if (height && heightReduction) {
      return `calc(${height} - ${heightReduction})`;
    }
    if (height) {
      return height;
    }

    return 'auto';
  }};
  width: ${({width, widthReduction}) => {
    if (width && widthReduction) {
      return `calc(${width} - ${widthReduction})`;
    }
    if (width) {
      return width;
    }

    return 'auto';
  }};
  margin: ${({margin}) => margin || DEFAULTS.margin};
  padding: ${({padding}) => padding || DEFAULTS.padding};
  background: ${({background}) => background || DEFAULTS.background};
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, .06);
`;


export {
  ContainerBoxStyled,
};
