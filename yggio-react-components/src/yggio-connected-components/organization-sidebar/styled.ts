// styled.js

import styled from 'styled-components';
import {FlexColWrapper} from '../../global/styled';
import {COLORS} from '../../constants';

const Sidebar = styled.div`
  width: 330px;
  height: 100vh;
  background: #fff;
  padding: 0 20px;
  border-right: 1px solid #ececec;
`;

const TopSection = styled.div`
  width: 100%;
  padding: 30px 0 15px 0;
  border-bottom: 1px solid #bbb;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const TopSectionHeadingContainer = styled.div`
  margin-bottom: 15px;
  h1{
    margin: 0;
    font-size: 20px;
  }
  p {
    margin: 0 0 3px 0;
    font-size: 15px;
  }
`;

const TopSectionButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputsWrapper = styled(FlexColWrapper)`
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  width: 60%;
  background: ${COLORS.greenRacing};
`;

const TreeViewNote = styled.p`
  margin: 0;
  font-size: 14px;
`;

export {
  Sidebar,
  TopSection,
  TopSectionHeadingContainer,
  TopSectionButtonsContainer,
  InputsWrapper,
  TreeViewNote,
};
