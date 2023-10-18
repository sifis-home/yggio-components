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
  errorMessage?: string;
  setSelectedFile: (file: string) => void;
  setErrorMessage: (errorMessage: string) => void;
}

const Content = (props: Props) => {
  const onRemoveFile = () => {
    props.setSelectedFile('');
    props.setErrorMessage('');
  };
  return (
    <InfoBoxContentContainer>
      <InfoBoxLeftContent>
        <InfoBoxParagraph>Selected file: {props.selectedFile}</InfoBoxParagraph>
        <InfoBoxParagraph>{props.errorMessage}</InfoBoxParagraph>
      </InfoBoxLeftContent>
      <Button
        content={'Remove file'}
        onClick={onRemoveFile}
        ghosted
      />
    </InfoBoxContentContainer>
  );
};

const ErrorInfoBox = (props: Props) => (
  <InfoBox
    heading={'Error uploading file'}
    type={'error'}
    content={<Content {...props} />}
  />
);

export default ErrorInfoBox;
