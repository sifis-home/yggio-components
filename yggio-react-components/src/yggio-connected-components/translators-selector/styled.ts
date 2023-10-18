import styled, {css} from 'styled-components';


const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 12px 0;
  color: #333;
`;

const Heading = styled.p`
  font-size: 15px;
`;

const HelpLink = styled.div`
  display: flex;
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
`;

const FilterHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 12px 0;
`;

const FilterHeadingText = styled.p`
  font-size: 13px;
  font-weight: bold;
  margin: 0 12px 0 6px;
`;

const FilterHeadingLine = styled.div`
  height: 1px;
  background: #ddd;
  flex-grow: 1;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #ddd;
  margin: 25px 0 20px 0;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0 15px 0;
`;

interface SwitchLabelProps {
  isGrey?: boolean;
}

const SwitchLabel = styled.p<SwitchLabelProps>`
  margin: 0 0 0 7px;
  font-size: 13px;
  color: ${({isGrey}) => isGrey ? '#777' : '#333'};
`;

const EmptyTranslatorsContainer = styled.div`
  color: gray;
  height: 330px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FoundTranslatorsHeading = styled.p`
  font-size: 13px;
  margin: 0 0 10px 0;
`;

const FoundTranslatorsContainer = styled.div`
  height: 300px;
  padding: 0 5px 0 0;
  margin: 0 0 30px 0;
  overflow-y: scroll;
`;

interface FoundTranslatorProps {
  isSelected: boolean;
  isAdded?: boolean;
}

const FoundTranslator = styled.div<FoundTranslatorProps>`
  width: 100%;
  height: 60px;
  padding: 10px 0 0 12px;
  margin: 0 0 8px 0;
  background: #f8f8f8;
  border: 1px solid #bbb;
  border-radius: 4px;

  ${({isAdded}) => isAdded && css`
    background: #ddd;
  `}

  ${({isAdded}) => !isAdded && css`
    cursor: pointer;
  `}

  ${({isSelected, isAdded}) => !isSelected && !isAdded && css`
    &:hover {
      background: #eee;
    }
  `}

  ${({isSelected}) => isSelected && css`
    background: #2571CB;
    color: white;
    border-color: #2571CB;
  `}
`;

const FoundTranslatorName = styled.div`
  font-size: 13px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const FoundTranslatorInfo = styled.p`
  font-size: 12px;
`;

const AddTranslatorBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

// Translators page

const NoTranslatorNote = styled.p`
  color: #555;
  font-size: 14px;
  margin: 40px 0 15px 0;
`;

const AddTranslatorLink = styled.p`
  color: #174e8f;
  font-size: 14px;
  margin: 15px 0 20px 0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const AddedTranslator = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  background: #f8f8f8;
  border: 1px solid #bbb;
  border-radius: 4px;
`;

const AddedTranslatorLeftSection = styled.div`
  flex-grow: 1;
  padding: 0 0 0 15px;
`;

const AddedTranslatorName = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 15px 0 0px 0;
`;

const AddedTranslatorUsername = styled.div`
  font-size: 14px;
  margin: 0 0 12px 0;
`;

const AddedTranslatorPills = styled.div`
  display: flex;
`;

const Pill = styled.div`
  width: fit-content;
  height: 24px;
  background: #2571CB;
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding: 0 6px 0 10px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  margin: 0 5px 0 0;
`;

const AddedTranslatorRightSection = styled.div`
  width: 45px;
  padding: 0 15px 0 0;
`;

const DeleteButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  margin: 10px 0 0 0;
  background: #D9D9D9;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #ccc;
    color: red;
  }
`;

interface MoveButtonProps {
  isDisabled: boolean;
}

const MoveUpButton = styled.div<MoveButtonProps>`
  width: 30px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px 4px 0 0;
  margin: 5px 0 0 0;
  background: #D9D9D9;
  color: #aaa;

  ${({isDisabled}) => !isDisabled && css`
    cursor: pointer;
    color: black;
    &:hover {
      background: #ccc;
    }
  `}

`;

const MoveDownButton = styled.div<MoveButtonProps>`
  width: 30px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 4px 4px;
  background: #D9D9D9;
  color: #aaa;

  ${({isDisabled}) => !isDisabled && css`
    cursor: pointer;
    color: black;
    &:hover {
      background: #ccc;
    }
  `}
`;


const Separator = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: center;
`;

const SeparatorMiddle = styled.div`
  width: 20px;
  position: relative;
`;

const SeparatorLine = styled.div`
  width: 2px;
  height: 24px;
  position: absolute;
  left: 14px;
  background: #bbb;
`;

const SeparatorArrow = styled.div`
  position: absolute;
  top: -4px;
  left: -2px;
  color: #bbb;
`;

const HelpContainer = styled.div`
  h1 {
    font-size: 15px;
    margin: 0 0 20px 0;
  }
  h2 {
    margin: 25px 0 0 0;
    font-weight: bold;
    font-size: 13px;
  }
  p {
    margin: 3px 0 0 0;
    font-size: 13px;
  }
  mark {
    background: #eee;
    padding: 0 4px;
    font-style: italic;
  }
`;

export {
  Header,
  Heading,
  HelpLink,
  FilterHeadingContainer,
  FilterHeadingText,
  FilterHeadingLine,
  Line,
  SwitchContainer,
  SwitchLabel,
  EmptyTranslatorsContainer,
  FoundTranslatorsHeading,
  FoundTranslatorsContainer,
  FoundTranslator,
  FoundTranslatorName,
  FoundTranslatorInfo,
  AddTranslatorBottom,
  NoTranslatorNote,
  AddTranslatorLink,
  AddedTranslator,
  AddedTranslatorLeftSection,
  AddedTranslatorRightSection,
  AddedTranslatorName,
  AddedTranslatorUsername,
  AddedTranslatorPills,
  Pill,
  DeleteButton,
  MoveUpButton,
  MoveDownButton,
  Separator,
  SeparatorMiddle,
  SeparatorLine,
  SeparatorArrow,
  HelpContainer,
};
