import React from 'react';

import {CollapsibleProps} from './types';
import {CollapsibleElement, Content, Label} from './styled';

const Collapsible = (props: CollapsibleProps) => {
  return (
    <CollapsibleElement
      openedHeight={props.openedHeight}
      closedHeight={props.closedHeight}
      open={props.open}
    >
      <Label
        onClick={props.onClick}
      >
        {props.label}
      </Label>

      <Content
        open={props.open}
      >
        {props.children}
      </Content>
    </CollapsibleElement>
  );
};

export default Collapsible;
