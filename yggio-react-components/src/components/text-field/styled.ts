import styled from 'styled-components';

import {commonInputStyles, inputFocusStyle} from '../../global/styled';
import {DEFAULTS} from './constants';

interface StyledInputProps {
  height?: string;
  disableBlueFocusOutline?: boolean;
  isInvalid?: boolean;
  'aria-label'?: string;
}

const StyledInput = styled.input<StyledInputProps>`
  ${commonInputStyles}
  ${inputFocusStyle}
  height: ${({height}) => height || DEFAULTS.height};
`;

export {
  StyledInput,
};
