import {ReactNode} from 'react';

interface CollapsibleProps {
  label: ReactNode// object | string;
  open?: boolean;
  openedHeight?: string;
  closedHeight?: string;
  onClick: () => void;
  children?: ReactNode;
}

export type {
  CollapsibleProps,
};
