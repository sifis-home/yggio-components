import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px 0 0 0;
`;

const HeaderContainer = styled.div`
  margin: 5px 0 20px 0;
`;

const Heading = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #222;
  margin: 0;
`;

const SubHeading = styled.p`
  font-size: 13px;
  color: #444;
  margin: 2px 0 0 0;
`;

const WizardStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 30px);
`;

const WizardContent = styled.div`
  min-height: 200px;
  flex-grow: 1;
`;

interface JoinStatusContainerProps {
  marginBottom?: number;
}

const JoinStatusContainer = styled.div<JoinStatusContainerProps>`
  width: 100%;
  margin: 0 0 ${({marginBottom}) => marginBottom || 0}px 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  font-weight: bold;
  color: #555;
  font-size: 13px;
`;

interface JoinStatusLightProps {
  deviceIsJoined: boolean;
}

const JoinStatusLight = styled.div<JoinStatusLightProps>`
  height: 14px;
  width: 14px;
  border-radius: 7px;
  background: ${({deviceIsJoined}) => deviceIsJoined ? '#17bf2c' : 'red'};
  margin: 0 0 0 5px;
`;

export {
  FooterContainer,
  HeaderContainer,
  Heading,
  SubHeading,
  WizardStepContainer,
  WizardContent,
  JoinStatusContainer,
  JoinStatusLight,
};
