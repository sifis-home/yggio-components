import styled from 'styled-components';

import {commonInputStyles, inputFocusStyle} from '../../global/styled';
import {DEFAULTS} from './constants';

interface StyledInputProps {
  height?: string;
  resize?: string;
  disableBlueFocusOutline?: boolean;
  isInvalid?: boolean;
  'aria-label'?: string;
}

const StyledInput = styled.textarea<StyledInputProps>`
  ${commonInputStyles}
  ${inputFocusStyle}
  height: ${({height}) => height || DEFAULTS.height};
  padding-top: 10px;
  resize: ${({resize}) => resize || DEFAULTS.resize};
`;

export {
  StyledInput,
};
