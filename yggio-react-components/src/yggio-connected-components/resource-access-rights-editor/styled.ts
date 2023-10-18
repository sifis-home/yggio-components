import styled, {css} from 'styled-components';

const AddUserContainer = styled.div`
  display: flex;
  margin: 10px 0 20px 0;
  align-items: flex-end;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  grid-gap: 2px;
  font-size: 13px;
  margin: 0 0 20px 0;
`;

const TableCell = styled.div`
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30px;
`;

const HeadingCell = styled(TableCell)`

`;

const NameCell = styled(TableCell)`
  justify-content: flex-start;
  padding: 0 0 0 8px;
  word-break: break-all;
`;

interface AccessRightCellProps {
  isActive: boolean;
  isCurrentUser: boolean;
}

const AccessRightCell = styled(TableCell)<AccessRightCellProps>`
  cursor: ${({isCurrentUser}) => isCurrentUser ? 'normal' : 'pointer'};
  color: #999;
  ${({isActive, isCurrentUser}) => isActive && css`
    background: ${isCurrentUser ? '#75A47B' : '#428FD9'};
    color: white;
  `};
  ${({isActive, isCurrentUser}) => !isCurrentUser && css`
    &:hover {
      background: ${isActive ? '#2067ab' : '#ccc'}
    }
  `};

`;

export {
  AddUserContainer,
  Table,
  TableCell,
  HeadingCell,
  NameCell,
  AccessRightCell,
};
