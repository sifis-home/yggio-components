import React from 'react';
import {MdClose as CrossIcon} from 'react-icons/md';

import {
  Container,
  Text,
  RemoveButtonOuter,
  RemoveButtonInner,
} from './styled';

interface ChipProps {
  text: string;
  color?: string;
  ghosted?: boolean;
  showRemoveButton?: boolean;
  onRemoveClick?: () => void;
  margin?: string;
}

const Chip = (props: ChipProps) => {
  return (
    <Container
      showRemoveButton={props.showRemoveButton}
      color={props.color}
      ghosted={props.ghosted}
      margin={props.margin}
    >
      <Text>
        {props.text}
      </Text>
      {props.showRemoveButton &&
        <RemoveButtonOuter
          onClick={props.onRemoveClick}
        >
          <RemoveButtonInner
            color={props.color}
            ghosted={props.ghosted}
          >
            <CrossIcon size={12} />
          </RemoveButtonInner>
        </RemoveButtonOuter>}
    </Container>
  );
};

export default Chip;
