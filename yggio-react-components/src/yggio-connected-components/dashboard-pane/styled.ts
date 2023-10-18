import styled from 'styled-components';

import ContainerBox from '../../components/container-box';
import {COLORS} from '../../constants';

const Heading = styled.h2`
  font-size: 23px;
  color: #222;
  margin: 50px 0 40px 0;
  @media (max-width: 980px){
    margin: 10px 0 10px 0;
  }
`;

const GreenText = styled.span`
  color: #21752b;
`;

const CountBoxesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px 0;
  margin: 0 0 15px 0;
`;

const CountBoxContainer = styled(ContainerBox)`
  width: 200px;
  height: 80px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: border-color 200ms;

  &:hover {
    border-color: #21752b;
    transition: border-color 200ms;
  }

  @media (min-width: 980px) {
    width: 19%;
  }
  @media (max-width: 980px) and (min-width: 500px) {
    width: 49%;
  }
  @media (max-width: 500px){
    width: 100%;
  }

  h3 {
    font-size: 25px;
    margin: 0;
    padding: 0;
    height: 32px;
  }
  h4 {
    font-size: 14px;
    color: #555;
    font-weight: normal;
    margin: 0;
  }
`;

const Version = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px;
  font-size: 0.6em;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px 15px;
  margin: 0 0 50px 0;
`;

const MapWrapper = styled.div`
  width: 600px;
  min-height: 400px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, .1);
  border: 1px solid ${COLORS.greyAlt};
  @media (max-width: 1235px) {
    width: 100%;
  }
`;

const LogsWrapper = styled.div`
  width: 585px;
  @media (max-width: 1235px) {
    width: 100%;
  }
`;

const LogsHeading = styled.p`
  font-size: 14px;
  margin: 0 0 12px 0;
  font-weight: bold;
  color: #666;
`;

export {
  Heading,
  GreenText,
  CountBoxesWrapper,
  CountBoxContainer,
  Version,
  MapWrapper,
  MiddleContainer,
  LogsWrapper,
  LogsHeading,
};
