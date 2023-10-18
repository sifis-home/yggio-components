import styled from 'styled-components';

const Container = styled.div`
  justify-content: space-around;
  margin: 30px 0 30px 0;
`;

const TooltipContainer = styled.div`
  background: #444;
  color: white;
  border-radius: 4px;
  padding: 7px 10px 7px 10px;
`;

const TooltipEntry = styled.div`
  display: flex;
  align-items: center;
`;

const TooltipEntryValue = styled.p`
  margin: 0px;
`;

interface ToolTipColorBarProps {
  color: string;
}

const TooltipColorBar = styled.div<ToolTipColorBarProps>`
  width: 20px;
  height: 8px;
  border-radius: 4px;
  background: ${({color}) => color};
  margin: 0 5px 0 0;
`;

const TooltipTime = styled.div`
  color: #ddd;
  margin: 3px 0 0 0;
  font-size: 14px;
`;

const LowerSection = styled.div`
  width: 100%;
  display: flex;
  margin: 30px 0 0 0;
  padding: 0 0;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const LowerSectionHeading = styled.p`
  font-size: 15px;
  margin: 0 0 30px 0;
  @media (max-width: 1000px) {
    margin: 0 0 20px 0;
  }
  font-weight: bold;
  color: #333;
`;

const OptionsSection = styled.div`
  width: 360px;
  padding: 0 50px 0 0;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const LegendSection = styled.div`
  width: 100%;
  @media (min-width: 1000px) {
    width: 330px;
    padding: 0 0 0 50px;
    border-left: 1px solid #ccc;
  }
`;

const LegendEntryContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0 ;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
`;

const LegendEntryDeviceName = styled.p`
  margin: 0;
  font-size: 14px;
  position: relative;
  top: -1px;
`;

const LegendEntryField = styled.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  margin: 0 0 0 3px;
`;

const LegendEntryEmptyDataNote = styled.p`
  margin: 0;
  font-size: 14px;
  color: #aaa;
  font-style: italic;
  margin: 0 0 0 3px;
`;

const NoDataView = styled.div`
  width: calc(100% - 100px);
  margin: 0 50px;
  height: 400px;
  border: 1px dotted #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777;
  font-style: italic;
`;

export {
  Container,
  TooltipContainer,
  TooltipEntry,
  TooltipColorBar,
  TooltipEntryValue,
  TooltipTime,
  LowerSection,
  LowerSectionHeading,
  OptionsSection,
  LegendSection,
  LegendEntryContainer,
  LegendEntryDeviceName,
  LegendEntryField,
  LegendEntryEmptyDataNote,
  NoDataView,
};
