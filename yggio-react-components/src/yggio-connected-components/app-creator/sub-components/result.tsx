import React from 'react';
import {NextRouter} from 'next/router';
import _ from 'lodash';
import {
  Flex,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import {APP_TYPES} from 'yggio-core-constants';
import {AxiosError} from 'axios';

import {appApi} from '../../../api';
import ContainerBox from '../../../components/container-box';
import Button from '../../../components/button';
import {READABLE_APP_TYPES} from '../constants';

interface ResultProps {
  name: string;
  type: keyof typeof APP_TYPES;
  isError: boolean;
  createAppError: AxiosError;
  decrementCurrentStep: () => void;
  router: NextRouter;
}

const Result = (props: ResultProps) => {
  const appsQuery = appApi.useAppsQuery({matchPattern: {name: props.name}});
  const app = _.head(appsQuery.data?.items);

  if (props.isError) {
    // eslint-disable-next-line
    const error = props.createAppError?.response?.data?.toString() || props.createAppError.toString();
    return (
      <ContainerBox>
        <Alert status='error'>
          <Flex flexDir='column'>
            <Flex>
              <AlertIcon />
              <AlertTitle fontSize='sm'>Something went wrong while creating your app.</AlertTitle>
            </Flex>
            <AlertDescription m='10px' fontSize='sm'>
              {error}
            </AlertDescription>
          </Flex>
        </Alert>
        <Flex justifyContent='space-between'>
          <Button
            label='Back'
            ghosted
            onClick={props.decrementCurrentStep}
            width='200px'
            margin='10px'
          />

          <Button
            label='Try again'
            color='green'
            onClick={() => void props.router.push('/apps/create')}
            width='200px'
            margin='10px'
          />
        </Flex>
      </ContainerBox>
    );
  }

  return (
    <ContainerBox margin='10px 0 0'>
      <Text fontSize='sm'>You've successfully created a {READABLE_APP_TYPES[props.type]} in Yggio.</Text>
      {props.type === APP_TYPES.clientApp && (
        <Flex m='20px 0 0' flexDir='column'>
          <Text m='0 0 10px' fontSize='sm'>Save the result below to use with your client app:</Text>
          <Text fontSize='sm'>Client ID: {app?.metadata?.clientId}</Text>
          <Text fontSize='sm'>Client Secret: {app?.metadata?.secret}</Text>
        </Flex>
      )}
      <Flex w='100%' justifyContent='flex-end'>
        <Button
          label='Finish'
          color='green'
          onClick={() => void props.router.push(`/apps/${app?._id}`)}
          width='200px'
          margin='10px'
        />
      </Flex>
    </ContainerBox>
  );
};

export default Result;
