import styled from 'styled-components';

const OrganizationsListPaneContainer = styled.div`
  margin: 20px 0 0 20px;
`;

const ButtonContainer = styled.div`
  margin-bottom: 12px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
/* flex-direction: column;
justify-content: center; */

const CreateContainer = styled.div`
  margin-top: 40px;
  p {
    margin: 0 0 10px 0;
  }
`;

const Heading = styled.h1`
  margin: 0;
  font-size: 26px;
`;

const NoOrganizationsNote = styled.p`
  color: grey;
  font-size: 14px;
`;

const OrganizationListHeader = styled.p`

`;

const LoadingView = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;

export {
  OrganizationsListPaneContainer,
  ButtonContainer,
  Heading,
  NoOrganizationsNote,
  OrganizationListHeader,
  CreateContainer,
  LoadingView,
};
