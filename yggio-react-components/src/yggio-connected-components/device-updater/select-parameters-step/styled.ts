import styled, {css} from 'styled-components';

interface ChipProps {
  checked: boolean;
}

const Chip = styled.div<ChipProps>`
  width: 100%;
  padding: 0 0 0 10px;
  height: 40px;
  border-radius: 6px;
  margin: 0 0 8px 0;
  background: ${({checked}) => checked ? '#256fb8' : '#ddd'};
  color: ${({checked}) => checked ? 'white' : 'black'};
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  &:hover {
    ${({checked}) => !checked && css`
      background: #bbb;
  `};
  }
  p {
    margin: 0 0 0 5px;
  }
`;

export {
  Chip,
};
