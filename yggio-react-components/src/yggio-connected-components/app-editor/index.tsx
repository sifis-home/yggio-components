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
import {useQueryClient} from '@tanstack/react-query';
import {toast} from 'react-hot-toast';
import {AxiosError} from 'axios';

import type {ImageType} from 'react-images-uploading';
import type {AppTypes} from 'yggio-models';

import {HorizontalLine} from '../../global/styled';
import Chip from '../../components/chip';
import {useLocalState} from '../../hooks';
import {appApi} from '../../api';
import {CenteredPage} from '../../global/components';
import ContainerBox from '../../components/container-box';
import TextField from '../../components/text-field';
import TextArea from '../../components/text-area';
import Button from '../../components/button';
import formState from './state';
import ImageUploader from '../../components/image-uploader';

interface AppEditorProps {
  appId: string;
  router: NextRouter;
}

const AppEditor = (props: AppEditorProps) => {
  const queryClient = useQueryClient();
  const form = useLocalState(formState);
  const [images, setImages] = React.useState<ImageType[]>([]);
  const [tag, setTag] = React.useState('');
  const [tags, setTags] = React.useState<string[]>([]);
  const appQuery = appApi.useAppQuery(props.appId);
  const updateAppMutation = appApi.useUpdateApp(queryClient);

  React.useEffect(() => {
    if (appQuery.data) {
      const [app] = appQuery.data;
      if (app.images?.icon) {
        // @ts-ignore - react-images-uploading types incorrect
        setImages([app.images.icon]);
      }
      if (app.name) {
        form.setInputValue('name', app.name);
      }
      if (app.description) {
        form.setInputValue('description', app.description);
      }
      if (app.tagline) {
        form.setInputValue('tagline', app.tagline);
      }
      if (app.tags) {
        setTags(app.tags);
      }
    }
  }, [appQuery.data]);

  const handleUpdateApp = async () => {
    const [icon] = images;
    const iconData = icon && {
      data: icon.data as string,
      file: {
        name: icon.file!.name,
        type: icon.file!.type as 'image/jpeg' | 'image/png' | 'image/gif',
        size: icon.file!.size,
        lastModified: icon.file!.lastModified,
      },
    };
    const updates: Pick<AppTypes.App, 'name' | 'description' | 'images' | 'tagline' | 'tags'> = {
      name: form.formInputs.name.value as string,
      description: form.formInputs.description.value as string,
      images: {
        icon: iconData,
      },
      tagline: form.formInputs.tagline.value as string,
      tags,
    };
    await props.router.push(`/apps/${props.appId}`);
    await updateAppMutation.mutateAsync({appId: props.appId, updates})
      .catch((err: AxiosError) => toast.error(`Update Error: ${err.response?.data}`));
  };

  return (
    <CenteredPage>
      <ContainerBox margin='10px 0 0'>
        <TextField
          label='Name'
          placeholder='name'
          ariaLabel='name'
          width='300px'
          value={form.formInputs.name.value as string}
          onChange={evt => {
            form.setInputValue('name', evt.target.value);
          }}
          margin='10px'
          additionalInfo={'Your application name'}
          isRequired
        />
        <TextArea
          label='Description'
          placeholder='description'
          ariaLabel='description'
          width='300px'
          height='150px'
          value={form.formInputs.description.value as string}
          onChange={evt => {
            form.setInputValue('description', evt.target.value);
          }}
          margin='10px'
          additionalInfo={'Your applications description'}
        />

        {/* @ts-ignore - untyped styled component */}
        <HorizontalLine margin='30px 0 30px' />

        <TextField
          label='Tagline'
          placeholder='tagline'
          ariaLabel='tagline'
          width='300px'
          value={form.formInputs.tagline.value as string}
          onChange={evt => {
            form.setInputValue('tagline', evt.target.value);
          }}
          margin='10px'
          additionalInfo={'Your applications tagline'}
          isRequired
          maxLength={64}
        />

        <Flex alignItems='center'>
          <TextField
            label='Tag'
            placeholder='tag'
            ariaLabel='tag'
            width='300px'
            value={tag}
            onChange={evt => {
              setTag(evt.target.value);
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
              setTags([...tags, tag]);
              setTag('');
            }}
            width='120px'
            margin='20px 0 0'
          />
        </Flex>

        {!_.isEmpty(tags) && (
          <Flex margin='10px' alignItems='center'>
            <Text fontSize='sm' m='15px'>Tags:</Text>
            {_.map(tags, tag => (
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
                    setTags(_.filter(tags, t => t !== tag));
                  }}
                  width='10px'
                  height='10px'
                  margin='0 0 10px'
                />
              </Flex>
            ))}
          </Flex>
        )}

        {/* @ts-ignore - untyped styled component */}
        <HorizontalLine margin='30px 0 30px' />

        <ImageUploader
          maxFileSize={1_000_000}
          description='To upload an application icon, use the image uploader below'
          onClick={setImages}
          images={images}
        />
        <Flex justifyContent='space-between'>
          <Button
            label='Cancel'
            ghosted
            onClick={async () => props.router.push(`/apps/${props.appId}`)}
            width='200px'
            margin='10px'
          />
          <Button
            label='Save'
            color='green'
            onClick={handleUpdateApp}
            width='200px'
            margin='10px'
          />
        </Flex>
      </ContainerBox>
    </CenteredPage>
  );
};

export default AppEditor;
