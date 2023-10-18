import styled from 'styled-components';
import {commonInputStyles, inputFocusStyle} from '../../global/styled';

interface StyledInputProps {
  disableBlueFocusOutline?: boolean;
  isInvalid?: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
  ${commonInputStyles}
  ${inputFocusStyle}
  height: 35px;
`;

export {
  StyledInput,
};
