/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import Dropzone from 'react-dropzone';

import {requestBodySizeLimitApi} from '../../../../../api';
import {DropzoneContainer} from '../styled';
import {parseCsvFileToJson, assertDataIsNotTooLarge} from '../utils';

interface Props {
  requestBodySizeLimit?: number;
  setSelectedFile: (file: string) => void;
  setErrorMessage: (errorMessage: string) => void;
  setUploadItems: (items: Record<string, string>[]) => void;
}

type ExtendedFile = File & {path: string};

const FileUploader = (props: Props) => {

  const requestBodySizeLimitQuery = requestBodySizeLimitApi.useRequestBodySizeLimitQuery();

  const onDrop = async (acceptedFiles: unknown) => {
    const selectedFile = (acceptedFiles as ExtendedFile[])[0];
    try {
      const items = await parseCsvFileToJson(selectedFile) as Record<string, string>[];
      if (requestBodySizeLimitQuery.data) {
        assertDataIsNotTooLarge(items, requestBodySizeLimitQuery.data);
      }
      props.setSelectedFile(selectedFile.path);
      props.setUploadItems(items);
    } catch (err) {
      if (err instanceof Error) {
        props.setSelectedFile(selectedFile.path);
        props.setErrorMessage(err.message);
      }
    }
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={onDrop}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
      }) => (
        <DropzoneContainer {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
          <input {...getInputProps()} />
          <p>Drop your CSV file here, or click to select a file</p>
        </DropzoneContainer>
      )}
    </Dropzone>
  );
};

export default FileUploader;
