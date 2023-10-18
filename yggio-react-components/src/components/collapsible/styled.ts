import styled from 'styled-components';
import {COLORS} from '../../constants';
import {DEFAULT_CLOSED_HEIGHT, DEFAULT_OPENED_HEIGHT} from './constants';

const Label = styled.div`
  width: 100%;
`;

const Content = styled.div<{open?: boolean}>`
  display: flex;
  height: ${({open}) => (open ? '100%' : '0')};
  opacity: ${({open}) => (open ? '1' : '0')};
  visibility: ${({open}) => (open ? 'visible' : 'hidden')};
  transition: all 0.3s;
`;

interface CollapsibleElementProps {
  open?: boolean;
  openedHeight?: string;
  closedHeight?: string;
}

const CollapsibleElement = styled.div<CollapsibleElementProps>`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  cursor: pointer;
  color: ${({color}) => color || COLORS.black};
  height: ${({closedHeight, openedHeight, open}) => {
    if (open) {
      return openedHeight || DEFAULT_OPENED_HEIGHT;
    }

    return closedHeight || DEFAULT_CLOSED_HEIGHT;
  }};
  transition: height 0.3s;
`;

export {
  Label,
  Content,
  CollapsibleElement,
};
