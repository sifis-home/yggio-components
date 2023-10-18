/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {NextRouter} from 'next/router';
import {
  Flex,
  Text,
} from '@chakra-ui/react';
import {ImageListType, ImageType} from 'react-images-uploading';

import {Form} from '../../../types';
import {HorizontalLine} from '../../../global/styled';
import ContainerBox from '../../../components/container-box';
import TextField from '../../../components/text-field';
import Button from '../../../components/button';
import Chip from '../../../components/chip';
import ImageUploader from '../../../components/image-uploader';

interface DetailsProps {
  router: NextRouter;
  form: Form;
  images: ImageType[];
  tags: string[];
  setImages: (images: ImageListType) => void;
  setTags: (tags: string[]) => void;
  incrementCurrentStep: () => void;
  decrementCurrentStep: () => void;
}

const Details = (props: DetailsProps) => (
  <ContainerBox margin='10px 0 0'>
    <TextField
      label='Name'
      placeholder='name'
      ariaLabel='name'
      width='300px'
      value={props.form.formInputs.name.value as string}
      onChange={evt => {
        props.form.setInputValue('name', evt.target.value);
      }}
      margin='10px'
      additionalInfo={'Your application name'}
      isRequired
    />
    <TextField
      label='Tagline'
      placeholder='tagline'
      ariaLabel='tagline'
      width='300px'
      value={props.form.formInputs.tagline.value as string}
      onChange={evt => {
        props.form.setInputValue('tagline', evt.target.value);
      }}
      margin='10px'
      additionalInfo={'Your applications tagline'}
      isRequired
      maxLength={64}
    />

    <Flex alignItems='center'>
      <TextField
        label='Tags'
        placeholder='tags'
        ariaLabel='tags'
        width='300px'
        value={props.form.formInputs.tags.value as string}
        onChange={evt => {
          props.form.setInputValue('tags', evt.target.value);
        }}
        margin='10px'
        additionalInfo={'Application tags'}
        isRequired
        maxLength={24}
      />
      <Button
        label='Add tag'
        color='green'
        onClick={() => {
          props.setTags([...props.tags, props.form.formInputs.tags.value as string]);
          props.form.setInputValue('tags', '');
        }}
        width='120px'
        margin='20px 0 0'
      />
    </Flex>

    {!_.isEmpty(props.tags) && (
      <Flex margin='10px' alignItems='center'>
        <Text fontSize='sm' m='15px'>Tags:</Text>
        {_.map(props.tags, tag => (
          <Flex m='5px'>
            <Chip
              margin='3px'
              key={tag}
              text={tag}
            />
            <Button
              noBorder
              ghosted
              label='✕'
              color='red'
              onClick={() => {
                props.setTags(_.filter(props.tags, t => t !== tag));
              }}
              width='10px'
              height='10px'
              margin='0 0 10px'
            />
          </Flex>
        ))}
      </Flex>
    )}


    <ImageUploader
      maxFileSize={1_000_000}
      description='To upload an application icon, use the image uploader below'
      onClick={props.setImages}
      images={props.images}
    />

    {/* @ts-ignore - untyped styled component */}
    <HorizontalLine margin='30px 0 30px' />
    <Flex justifyContent='space-between'>
      <Button
        label='Back'
        ghosted
        onClick={props.decrementCurrentStep}
        width='200px'
        margin='10px'
      />
      <Button
        disabled={!props.form.formInputs.name.value}
        label='Continue'
        color='green'
        onClick={props.incrementCurrentStep}
        width='200px'
        margin='10px'
      />
    </Flex>
  </ContainerBox>
);

export default Details;
