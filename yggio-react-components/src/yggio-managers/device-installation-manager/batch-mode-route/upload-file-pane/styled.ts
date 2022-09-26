/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';

const InstructionsLinkContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 0 0 10px 0;
`;

interface DropzoneContainerProps {
  isDragAccept: boolean,
  isDragReject: boolean,
  isDragActive: boolean,
}

const getColor = (props: DropzoneContainerProps) => {
  if (props.isDragAccept) {
    return 'green';
  }
  if (props.isDragReject) {
    return 'red';
  }
  if (props.isDragActive) {
    return 'black';
  }
  return '#bbb';
};


const DropzoneContainer = styled.div<DropzoneContainerProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 120px;
  border-width: 1px;
  border-radius: 1px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #999;
  outline: none;
  transition: border .24s, background-color 0.24s;
  margin: 0 0 13px 0;
  cursor: pointer;
  &:hover{
    background: #f3f3f3;
  }
`;

const InfoBoxContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: top;
  margin: 10px 0 0 0;
`;

const InfoBoxLeftContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoBoxParagraph = styled.p`
  margin: 0 0 5px 0;
  font-size: 13px;
`;

const InstructionsContainer = styled.div`
  margin: 0 0 20px 0;
`;

const Paragraph = styled.p`
  margin: 0 0 15px 0;
  line-height: 1.5;
`;

const CodeBox = styled.div`
  width: 100%;
  background: #555;
  border-radius: 5px;
  color: white;
  padding: 14px;
  box-sizing: border-box;
  margin: 0 0 20px 0;
  p {
    line-height: 1;
    margin: 0 0 4px 0;
  }
`;

const FieldsTableHeading = styled.div`
  font-weight: bold;
  margin: 25px 0 7px 0;
`;

const FieldsTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: solid #bbb 1px;
`;

const FieldsTableItem = styled.div`
  padding: 5px 0 5px 5px;
  border: solid #bbb 0px;
  border-top-width: 1px;
  border-left-width: 1px;
  &:nth-child(2n) {
    border-right-width: 1px;
  }
`;

const HelperToolContainer = styled.div`
  padding: 0 20px 30px 20px;
  margin: 40px 0 0 0;
  background: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const InstructionHeading = styled.h1`
  font-size: 14px;
  font-weight: bold;
  margin: 30px 0 10px 0;
`;

const ConnectorItemsTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  p {
    margin: 0;
    height: 22px;
  }
`;

const ConnectorItemsTitle = styled.p`
  background: #ccc;
  padding: 5px 10px;
  margin: 20px 0 10px 0;
`;

export {
  InstructionsLinkContainer,
  DropzoneContainer,
  InfoBoxContentContainer,
  InfoBoxLeftContent,
  InfoBoxParagraph,
  InstructionsContainer,
  InstructionHeading,
  Paragraph,
  CodeBox,
  FieldsTableHeading,
  FieldsTable,
  FieldsTableItem,
  HelperToolContainer,
  ConnectorItemsTable,
  ConnectorItemsTitle,
};
