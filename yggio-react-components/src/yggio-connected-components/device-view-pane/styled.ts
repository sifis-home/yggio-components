import styled, {css} from 'styled-components';
import {COLORS} from '../../constants';
import {
  FlexColMaxWidthWrapper,
  FlexColWrapper,
  FlexMaxWidthWrapper,
  FlexWrapper
} from '../../global/styled';

const MainContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

interface MainContentContainerProps {
  maxWidth: number;
}

const MainContentContainer = styled.div<MainContentContainerProps>`
  width: 100%;
  max-width: ${({maxWidth}) => maxWidth}px;
  padding: 10px 20px 60px;
  box-sizing: border-box;

  @media (max-width: 700px) {
    padding: 10px 10px 60px;
  };
`;

const LoadingView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 0 0;
`;

// SIDEBAR

const SidebarTopSection = styled.div`
  width: 100%;
  height: 32px;
  margin: 0 0 20px 0;
  border-bottom: 1px solid #e1e1e1;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #004799;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #002c5e;
  }
`;

const BackButtonText = styled.p`
  margin: 0 0 0 3px;
  position: relative;
  top: 1px;
`;

const SidebarInfoSection = styled.div`
  margin: 0 0 30px 0;
`;

const SidebarDeviceNameHeading = styled.p`
  font-size: 12px;
  margin: 0 0 4px 0;
  color: #333;
`;

const SidebarDeviceName = styled.p`
  font-size: 17px;
  font-weight: bold;
  margin: 0 0 20px 0;
  overflow-wrap: break-word;
`;

const SidebarInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  height: 22px;
  font-size: 12px;
`;

const SidebarMenu = styled.div`
  border-top: 1px solid #e1e1e1;
`;

interface SidebarMenuItemProps {
  active: boolean;
}

const SidebarMenuItem = styled.div<SidebarMenuItemProps>`
  height: 40px;
  padding: 0 4px;
  border-bottom: 1px solid #e1e1e1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  background: ${({active}) => (active ? '#d1e8da' : 'none')};

  &:hover {
    ${({active}) => !active && css`
      background: #eee;
    `}
  }
`;

interface SidebarMenuItemTitleProps {
  active: boolean;
}

const SidebarMenuItemTitle = styled.p<SidebarMenuItemTitleProps>`
  margin: 0 0 0 6px;
  font-weight: ${({active}) => (active ? 'bold' : 'normal')};
  color: ${({active}) => (active ? '#00481E' : '#111')};
`;

const SidebarMenuItemLeftSection = styled.div`
  display: flex;
  align-items: center;
`;

interface SidebarMenuItemIconWrapperProps {
  topPosition?: number;
  active: boolean;
}

const SidebarMenuItemIconWrapper = styled.div<SidebarMenuItemIconWrapperProps>`
  display: flex;
  justify-content: center;
  position: relative;
  top: ${({topPosition}) => topPosition || 0}px;
  width: 22px;
  color: ${({active}) => (active ? '#00481E' : '#444')};
`;

interface SidebarMenuItemNumberChipProps {
  hidden?: boolean;
  active?: boolean;
}

const SidebarMenuItemNumberChip = styled.div<SidebarMenuItemNumberChipProps>`
  display: ${({hidden}) => (hidden ? 'none' : 'flex')};
  background: ${({active}) => (active ? '#82b597' : '#eee')};
  align-items: center;
  justify-content: center;
  font-size: 11px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
`;

// GENERAL

const InfoItem = styled.div`
  margin: 0 0 20px 0;
`;

const InfoItemTop = styled.div`
  display: flex;
  align-items: center;
  height: 25px;
`;

const InfoItemTitle = styled.div`
  font-weight: bold;
  font-size: 13px;
  margin: 0 7px 0 0;
  position: relative;
  top: 1px;
`;

const InfoItemMiddle = styled.div`
  margin: 0 0 10px 0;
  font-size: 13px;
`;

const InfoItemBottom = styled.div`
  display: flex;
`;

const InfoItemGreyText = styled.p`
  color: #777;
  font-style: italic;
`;

// CALCULATIONS

const CalculationValues = styled(FlexWrapper)`
  width: 100%;
  max-height: 500px;
  justify-content: space-between;
  flex-direction: column;
  border-bottom: 1px solid grey;
  margin: 5px;
  padding: 5px;
  overflow-y: scroll;
`;

const CalculationValue = styled.div`
  display: flex;
  width: 100%;
  font-size: 0.5em;
  min-height: 20px;
  justify-content: space-between;

  @media (min-width:25em)  {
    font-size: 0.7em;
  }

  @media (min-width:800px)  {
    font-size: 0.9em;
  }
`;

const CalculationKey = styled.div`
  background: ${COLORS.greyLight};
  padding: 5px 2px 5px;
`;

const CalculationRemovalContainer = styled.div`
  cursor: pointer;
  color: darkred;
  transition: all 0.3s;

  &:hover {
    color: red;
    transition: all 0.3s;
  }
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

const CalculationWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// LORA CONTROL

const LoraControlWrapper = styled(FlexMaxWidthWrapper)`
  flex-direction: column;

  @media (min-width: 1000px) {
    flex-direction: row;
  }
`;

const LoraControlSection = styled(FlexColWrapper)`
  padding: 50px;
  width: 50%;
`;

const LoraQueueButtonWrapper = styled(FlexMaxWidthWrapper)`
  justify-content: space-between;
`;

const LoraQueueCenterer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoraQueueSection = styled(FlexColMaxWidthWrapper)`
  overflow-y: scroll;
`;

const LoraQueueNoItemsNote = styled.p`
  color: #777;
  font-size: 14px;
  margin: 0;
`;

const LoraQueueContainer = styled.div`
  width: 100%;
  height: 250px;
  background: #fafafa;
  margin: 10px 0 0 0;
  border: 1px solid #ccc;
  font-size: 13px;
`;

const LoraQueueTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: min-content;
`;

const LoraQueueTableHeaderItem = styled.div`
  height: 25px;
  line-height: 25px;
  background: #f1f1f1;
  padding: 0 0 0 10px;
  border-bottom: 1px solid #ccc;
  color: #333;
`;

const LoraQueueTableItem = styled.div`
  background: #cadae8;
  height: 32px;
  line-height: 32px;
  padding: 0 0 0 10px;
  border-bottom: 1px solid #a1b3c4;
  color: #111e29;
`;

// CHANNELS

const ChannelContainer = styled.div`
  background: #eee;
  border-radius: 3px;
  margin: 7px 0 0 0;
  padding: 7px 0 12px 12px;
`;

const NoDataBox = styled.div`
  width: 100%;
  height: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  font-size: 15px;
  font-style: italic;
`;

const NoDataText = styled.p`
  color: #777;
  font-size: 15px;
  font-style: italic;
`;

const ToolHeading = styled.p`
  margin: 0 0 3px 0;
`;

const ToolNote = styled.p`
  font-size: 13px;
  color: #333;
`;

const CalculationDataContainer = styled.div`
  max-height: 500px;
  overflow-y: scroll;
  border: 1px solid ${COLORS.grey};
`;

interface CalculationDataTableProps {
  columnSize?: number;
}

const CalculationDataTable = styled.div<CalculationDataTableProps>`
  display: grid;
  grid-auto-rows: 30px;
  grid-template-columns: ${({columnSize}) => `repeat(${columnSize || 4}, 1fr)`};
`;

const CalculationDataSubject = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  background: ${COLORS.grey};
  height: 30px;
  padding-left: 5px;
`;

const CalculationDataHeader = styled.div`
  display: flex;
  align-items: center;
  background: ${COLORS.greyAlt};
  font-weight: bold;
  padding-left: 5px;
`;

const CalculationDataItem = styled.div`
  display: flex;
  align-items: center;
  background: ${COLORS.greyLight};
  margin: 2px 0 0;
  padding-left: 5px;
`;

const CalculationDataItemLink = styled(CalculationDataItem)`
  cursor: pointer;
  &:hover {
    color: ${COLORS.greenRacing};
    text-decoration: underline;
  }
`;

interface InlineTextProps {
  fontSize: number;
}

const InlineText = styled.i<InlineTextProps>`
  font-size: ${({fontSize}) => fontSize};
`;

// TRANSLATORS
const SubHeading = styled.h3`
  font-size: 13px;
  font-weight: normal;
  color: #666;
  margin: 5px 0 0 0;
`;

const TranslatorListItem = styled.div`
  text-transform: capitalize;
  font-size: 14px;
  border: 1px solid #D0D0D0;
  display: flex;
  padding: 14px;
  width: 30%;
  margin-bottom: -1px;
`;

const IndexListItem = styled.div`
  font-size: 14px;
  margin-right: 10px;
`;

const TableContainer = styled.div`
  display: grid;
  grid-template-columns: 5% 25% 25% 20% 25%;
  margin-bottom: -1px;
`;

const TableItem = styled.div`
  margin: 0px;
  border: solid 1px #D0D0D0;
  border-right: none;
`;

const ItemContainer = styled.div`
  text-transform: capitalize;
  margin: 13px 0px 0px 10px;
  font-size: 13px;
`;

const LastTableItem = styled.div`
  margin: 0px;
  border: solid 1px #D0D0D0;
`;

const FirstItemContainer = styled.div`
  display: flex;
  justify-content: center;
  text-transform: capitalize;
  margin: 15px 0px 15px 0px;
  font-size: 13px;
`;

const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 25% 20% 25%;
  font-size: 13px;
  margin-top: 15px;
`;

const TableTitle = styled.div`
  margin: 0 0 5px 0;
`;

// REPORT INTERVAL
const ReportIntervalNote = styled.p`
  margin: 0px;
  font-size: 14px;
  margin: 10px 0 30px 0;
`;

export {
  MainContentWrapper,
  MainContentContainer,

  // GENERAL INFO
  LoadingView,
  InfoItem,
  InfoItemTop,
  InfoItemTitle,
  InfoItemMiddle,
  InfoItemBottom,
  InfoItemGreyText,
  NoDataBox,
  NoDataText,

  // SIDEBAR
  SidebarTopSection,
  BackButton,
  BackButtonText,
  SidebarInfoSection,
  SidebarDeviceNameHeading,
  SidebarDeviceName,
  SidebarInfoRow,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuItemLeftSection,
  SidebarMenuItemTitle,
  SidebarMenuItemIconWrapper,
  SidebarMenuItemNumberChip,

  // CALCUATIONS
  CalculationValues,
  CalculationValue,
  CalculationKey,
  CalculationRemovalContainer,
  StatusTag,

  // CALCULATIONS
  CalculationWrapper,

  // LORA CONTROL
  LoraControlWrapper,
  LoraControlSection,
  LoraQueueButtonWrapper,
  LoraQueueContainer,
  LoraQueueCenterer,
  LoraQueueSection,
  LoraQueueNoItemsNote,

  LoraQueueTable,
  LoraQueueTableHeaderItem,
  LoraQueueTableItem,

  // CHANNELS
  ChannelContainer,

  ToolHeading,
  ToolNote,

  CalculationDataContainer,
  CalculationDataTable,
  CalculationDataSubject,
  CalculationDataHeader,
  CalculationDataItem,
  CalculationDataItemLink,
  InlineText,

  // TRANSLATORS
  SubHeading,
  TranslatorListItem,
  IndexListItem,
  TableContainer,
  TableItem,
  ItemContainer,
  LastTableItem,
  FirstItemContainer,
  TitleContainer,
  TableTitle,

  // REPORT INTERVAL
  ReportIntervalNote,
};
