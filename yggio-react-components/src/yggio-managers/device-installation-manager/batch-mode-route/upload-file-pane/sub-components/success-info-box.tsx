/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';

import InfoBox from '../../../../../components/info-box';
import Button from '../../../../../components/button';
import {
  InfoBoxContentContainer,
  InfoBoxLeftContent,
  InfoBoxParagraph,
} from '../styled';

interface Props {
  selectedFile: string;
  uploadItems: Record<string, string>[];
  setSelectedFile: (file: string) => void;
  setUploadItems: (items: Record<string, string>[] | undefined) => void;
}

const Content = (props: Props) => (
  <InfoBoxContentContainer>
    <InfoBoxLeftContent>
      <InfoBoxParagraph>Selected file: {props.selectedFile}</InfoBoxParagraph>
      <InfoBoxParagraph>{props.uploadItems.length} devices found</InfoBoxParagraph>
    </InfoBoxLeftContent>
    <Button
      content={'Remove file'}
      onClick={() => {
        props.setSelectedFile('');
        props.setUploadItems(undefined);
      }}
      ghosted
    />
  </InfoBoxContentContainer>
);

const SuccessInfoBox = (props: Props) => (
  <InfoBox
    heading={'Valid installation file'}
    type={'success'}
    content={<Content {...props} />}
  />
);

export default SuccessInfoBox;
