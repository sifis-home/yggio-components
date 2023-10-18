import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px 0 0 0;
  h1 {
    font-size: 20px;
    margin: 0 0 20px 0;
  }
`;

const MembersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #eee;
  border-radius: 3px;
  margin: 5px 0;
  padding: 0 10px;
`;

const NoMembersNote = styled.p`
  color: gray;
  font-size: 14px;
`;

export {
  Wrapper,
  MembersContainer,
  NoMembersNote,
};
