import styled from 'styled-components';
import {eq} from 'lodash/fp';
import {COLORS} from '../../../constants';
import {FlexMaxWidthWrapper} from '../../../global/styled';

const TableWrapper = styled.div`
  position: relative;
  height: ${({height}) => height || 'calc(100% - 2px)'};
  width: ${({width}) => width || 'calc(100% - 2px)'}; // calc because of border
  background: ${({background}) => background || COLORS.trueWhite};
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
`;

const TableRow = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  background: ${({itemBg}) => itemBg || 'transparent'};
  color: ${({itemColor}) => itemColor || COLORS.black};
  justify-content: ${({center}) => (center ? 'center' : 'flex-start')};
  height: 40px;
  width: 90%;
  border-bottom: ${({itemBorder}) => itemBorder || `1px solid ${COLORS.grey}`};
  transition: all 0.3s;

  &:hover {
    background: ${({itemBgHover}) => itemBgHover || COLORS.greyLight};
    transition: all 0.3s;
  }

  &:last-child {

  }
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  background: ${({itemBg}) => itemBg || COLORS.greenMatt};
  color: ${({itemColor}) => itemColor || COLORS.white};
  justify-content: ${({center}) => (center ? 'center' : 'flex-start')};
  height: 40px;
  width: 90%;
  margin: 0 auto 0 auto;
  text-transform: upperCase;
  margin-right: auto;
  border-bottom: ${({itemBorder}) => itemBorder || `1px solid ${COLORS.grey}`};
  transition: all 0.3s;
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: ${({height}) => height};
  min-height: 30px;
  margin-bottom: 20px;
`;

const TableFooter = styled.div`
`;

const StatusTag = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({color}) => color || COLORS.greenMedium};
  border-radius: 8px;
  color: ${({color}) => color || COLORS.greenMedium};
  font-size: 0.8em;
  margin: 0 0 0 5px;
  padding: 0 5px 0;
  height: 25px;
  transition: all 0.3s;

  &:hover {
    border: 1px solid ${COLORS.greenDark};
    color: ${COLORS.greenDark};
    transition: all 0.3s;
  }
`;

const Action = styled.div`

`;

const EmptyTableWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 10px;
`;

const Block = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background: ${COLORS.greyLight};
  border: 2px solid ${COLORS.grey};
  border-radius: 5px;
  width: 120px;
  height: 120px;
  margin: 10px;
  transition: all 0.3s;
  cursor: pointer;
  opacity: ${({state}) => (eq(state, 'entered') ? 1 : 0)};

  &:hover {
    border: 2px solid ${COLORS.black};
    transition: all 0.3s;
  }

  img {
    opacity: ${({state}) => (eq(state, 'entered') ? 1 : 0)};
    border-radius: 5px;
    margin: 5px;
    width: 60%;
    height: 60%;
  }
`;

const BlockRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
`;

const PendingWrapper = styled(FlexMaxWidthWrapper)`
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: rgba(100, 100, 100, 0.5);
`;

const PendingRow = styled.div`
  top: 30px;
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export {
  TableWrapper,
  TableRow,
  TableBody,
  TableFooter,
  TableHeader,
  StatusTag,
  EmptyTableWrapper,
  Action,
  Block,
  BlockRow,
  PendingRow,
  PendingWrapper,
};
