import {Button} from '@chakra-ui/react';
import styled from 'styled-components';
import {COLORS} from '../../constants';

const PaginationButton = styled(Button)`
  border: 1px solid ${COLORS.greenRacing};
  border-radius: 3px !important;
  background: ${COLORS.trueWhite} !important;
  min-width: 25px !important;
  width: 25px !important;
  height: 22px !important;
  padding: 0 !important;
  margin: 5px !important;
  cursor: ${({disabled}) => (
    disabled
      ? 'not-allowed !important'
      : 'pointer !important'
  )};
  transition : border 0.3s;

  &:hover {
    border: ${({disabled}) => !disabled && `1px solid ${COLORS.greenLight}`};
    transition: border 0.3s;
  }
`;


export {
  PaginationButton,
};
