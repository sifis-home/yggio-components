/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {NextRouter} from 'next/router';
import _ from 'lodash';
import {
  Text,
} from '@chakra-ui/react';
import {useQueryClient} from '@tanstack/react-query';
import {APP_TYPES} from 'yggio-core-constants';
import {ImageType} from 'react-images-uploading';

import type {AxiosError} from 'axios';

import {useLocalState} from '../../hooks';
import {appApi} from '../../api';
import {CenteredPage} from '../../global/components';
import StepProgressBar from '../../components/step-progress-bar';
import {formState, navigationState} from './state';
import {STEPS, PROGRESS_BAR_TITLES} from './constants';
import {selectSteps} from './selectors';
import Result from './sub-components/result';
import AppType from './sub-components/app-type';
import Details from './sub-components/details';
import App from './sub-components/app';
import ClientApp from './sub-components/client-app';
import Confirmation from './sub-components/confirmation';

interface AppCreatorProps {
  router: NextRouter;
}

const AppCreator = (props: AppCreatorProps) => {
  const [tags, setTags] = React.useState<string[]>([]);
  const [images, setImages] = React.useState<ImageType[]>([]);
  const queryClient = useQueryClient();
  const form = useLocalState(formState);
  const navigation = useLocalState(navigationState);
  const createAppMutation = appApi.useCreateApp(queryClient);

  const handleAppCreation = async () => {
    const [icon] = images;
    const data = {
      name: form.formInputs.name.value as string,
      url: form.formInputs.URL.value as string,
      type: form.formInputs.type.value as keyof typeof APP_TYPES,
      tagline: form.formInputs.tagline.value as string,
      tags,
    };
    let dataImages;
    if (icon) {
      dataImages = {
        icon: {
          data: icon.data as string,
          file: {
            name: icon.file!.name,
            type: icon.file!.type as 'image/jpeg' | 'image/png' | 'image/gif',
            size: icon.file!.size,
            lastModified: icon.file!.lastModified,
          },
        },
      };
    }
    await createAppMutation.mutateAsync({...data, images: dataImages})
      .catch((err: Error) => err); // error need to be cought for wizard to continue
    navigation.incrementCurrentStep();
  };

  const steps = selectSteps(form.formInputs.type.value as keyof typeof APP_TYPES);

  return (
    <CenteredPage>
      <StepProgressBar
        title='Create your application'
        steps={_.map(steps, step => PROGRESS_BAR_TITLES[step])}
        currentStep={navigation.currentStep + 1}
        margin='10px 0 0'
      />
      {{
        [STEPS.appType]: (
          <AppType
            router={props.router}
            form={form}
            incrementCurrentStep={navigation.incrementCurrentStep}
          />
        ),
        [STEPS.details]: (
          <Details
            setTags={setTags}
            tags={tags}
            router={props.router}
            form={form}
            incrementCurrentStep={navigation.incrementCurrentStep}
            decrementCurrentStep={navigation.decrementCurrentStep}
            setImages={setImages}
            images={images}
          />
        ),
        [STEPS.app]: (
          <App
            router={props.router}
            form={form}
            incrementCurrentStep={navigation.incrementCurrentStep}
            decrementCurrentStep={navigation.decrementCurrentStep}
          />
        ),
        [STEPS.clientApp]: (
          <ClientApp
            router={props.router}
            form={form}
            incrementCurrentStep={navigation.incrementCurrentStep}
            decrementCurrentStep={navigation.decrementCurrentStep}
          />
        ),
        [STEPS.confirmation]: (
          <Confirmation
            router={props.router}
            form={form}
            handleAppCreation={handleAppCreation}
            incrementCurrentStep={navigation.incrementCurrentStep}
            decrementCurrentStep={navigation.decrementCurrentStep}
          />

        ),
        [STEPS.result]: (
          <Result
            isError={createAppMutation.isError}
            createAppError={createAppMutation.error as AxiosError}
            router={props.router}
            decrementCurrentStep={navigation.decrementCurrentStep}
            name={form.formInputs.name.value as string}
            type={form.formInputs.type.value as keyof typeof APP_TYPES}
          />
        ),
        STEP_NOT_FOUND: (
          <Text>Not found</Text>
        ),
      }[steps[navigation.currentStep]]}
    </CenteredPage>
  );
};

export default AppCreator;
