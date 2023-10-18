import {NextRouter} from 'next/router';
import React from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {Flex, Center, Heading, HStack, Box, Text} from '@chakra-ui/react';
import {
  MdErrorOutline as ErrorIcon,
  MdCheck as CheckIcon,
} from 'react-icons/md';
import _ from 'lodash';
import {useTranslation} from 'react-i18next';

import {Devices} from '../../../../types';
import {CenteredPage} from '../../../../global/components';
import {
  FlexSpaceBetweenWrapper,
  TextParagraph,
  HorizontalLine,
} from '../../../../global/styled';
import Button from '../../../../components/button';
import ContainerBox from '../../../../components/container-box';
import Spinner from '../../../../components/spinner';
import TextField from '../../../../components/text-field';
import TextArea from '../../../../components/text-area';
import Select from '../../../../components/select';
import {channelsApi, devicesApi} from '../../../../api';
import {channelState} from './state';
import {useLocalState} from '../../../../hooks';
import {COLORS} from '../../../../constants';
import {TextHeading} from './styled';
import {setMostCommonError, validateChannel, createProtocolData} from './utils';

interface ChannelsProps {
  router: NextRouter;
  selectedDevices: string[];
  devices: Devices;
  setSelectedDevices: (devices: string[]) => void;
  setIsInSelectMode: (selectMode: boolean) => void;
  setPage: (page: string) => void;
}

const ChannelsPane = (props: ChannelsProps) => {
  return (
    <CenteredPage>
      <ContainerBox minHeight={'400px'}>
        <ChannelsResult {...props} />
      </ContainerBox>
    </CenteredPage>
  );
};

const ChannelsResult = (props: ChannelsProps) => {
  /*
    Hooks
  */
  const {t} = useTranslation();
  const queryClient = useQueryClient();
  const useCreateChannelsMutation = channelsApi.useCreateChannels(queryClient);
  const channelForm = useLocalState(channelState);
  const {
    recipient,
    url,
    protocol,
    name,
    type,
    connectionString,
  } = channelForm.formInputs;

  const deltaControlsConnectorsQuery = devicesApi.useConnectorDevicesQuery('DeltaControlsEnteliWeb');

  /*
    Event handlers
  */
  const createChannels = () => {
    const channels = _.map(props.selectedDevices, (iotnode: string) => {
      return {
        name: name.value as string,
        iotnode,
        [protocol.value as string]: createProtocolData(channelForm.formInputs),
      };
    });
    useCreateChannelsMutation.mutate(channels);
  };

  const isValidChannel = validateChannel(channelForm.formInputs);


  if (useCreateChannelsMutation.isLoading) {
    return (
      <Center flexDirection='column' h='350px' w='100%'>
        <Spinner size={30} />
        <Heading as='h5' size='sm'>
          Creating channels...
        </Heading>
      </Center>
    );
  }

  if (useCreateChannelsMutation.isSuccess) {
    const {errors, inserted} = useCreateChannelsMutation.data;
    const mostCommonError: string = setMostCommonError(errors);

    return (
      <Flex flexDir='column'>
        <Heading size='sm'>Result</Heading>
        <Text m='0 0 40px 0' size='sm'>The channels installation finished with the following result</Text>
        {inserted && (
          <Flex alignItems='center'>
            <Box m='5px'>
              <CheckIcon color={COLORS.greenMedium} />
            </Box>
            <Text fontSize='sm'>Successfull: <b>{_.size(inserted)} / {_.size(props.selectedDevices)}</b></Text>
          </Flex>
        )}
        {!_.isEmpty(errors) && (
          <>
            <Flex alignItems='center'>
              <Box m='5px'>
                <ErrorIcon color={COLORS.red} />
              </Box>
              <Text fontSize='sm'>
                Errors: <b>{_.size(errors)} / {_.size(props.selectedDevices)}</b>
              </Text>
            </Flex>
            <Flex alignItems='center' m='10px'>
              <Text fontSize='xs'>
                Most common error: <b>{mostCommonError}</b>
              </Text>
            </Flex>
            <Center>
              <Flex
                h='200px'
                w='90%'
                m='10px'
                p='10px'
                bg={COLORS.white}
                flexDir='column'
                overflowY='scroll'
                tabIndex={0}
              >
                <Text fontSize='xs'>Full list of errors:</Text>
                {_.map(errors, error => (
                  <Flex key={_.flow(_.keys, _.head)(error)}>
                    {_.map(_.toPairs(error), ([id, message]) => (
                      <HStack key={id}>
                        <Text
                          cursor='pointer'
                          textDecoration='underline'
                          onClick={async () => props.router.push(`devices/${id}`)}
                          fontSize='xs'
                        >
                          {id}:
                        </Text>
                        <Text fontSize='xs'>{message}</Text>
                      </HStack>
                    ))}
                  </Flex>
                ))}
              </Flex>
            </Center>
          </>
        )}
        <HorizontalLine />
        <Flex w='100%' justifyContent='flex-end'>
          <Button
            disabled={!isValidChannel}
            width={'200px'}
            onClick={() => {
              props.setIsInSelectMode(false);
              props.setSelectedDevices([]);
              props.setPage('default');
            }}
            color={'green'}
            content={'Finish'}
          />
        </Flex>
      </Flex>
    );
  }

  return (
    <>
      <p>You have {_.size(props.selectedDevices)} devices selected.</p>
      <TextHeading>Create Channels</TextHeading>

      {/* @ts-ignore - styled component not typed */}
      <TextParagraph fontSize={'0.8em'}>
        This channel will be created on all your selected devices.
      </TextParagraph>
      <HorizontalLine />
      <TextField
        label={'Name'}
        margin={'10px 0 10px'}
        placeholder={'Name...'}
        name={'name'}
        value={name?.value as string}
        onChange={evt => channelForm.setInputValue('name', evt.target.value)}
      />
      <Select
        label={'Protocol'}
        margin={'10px 0 30px'}
        placeholder={_.capitalize(t('placeholders.select'))}
        name={'protocol'}
        options={[
          {value: 'mqtt', label: 'MQTT'},
          {value: 'http', label: 'HTTP'},
          {value: 'azureIotHub', label: 'Azure IoT Hub'},
          {value: 'deltaControls', label: 'Delta Controls'},
        ]}
        value={protocol?.value as string}
        onChange={evt => channelForm.setInputValue('protocol', evt.target.value)}
      />

      {protocol.value === 'mqtt' && (
        <>
          <Select
            margin={'10px 0'}
            width='100%'
            placeholder={'...type'}
            label={'type'}
            name={'type'}
            options={[
              {value: 'keycloakUser', label: 'keycloakUser'},
              {value: 'basicCredentialsSet', label: 'basicCredentialsSet'},
            ]}
            value={type?.value as string}
            onChange={evt => channelForm.setInputValue('type', evt.target.value)}
          />
          <TextField
            validationErrorMessage={recipient.value ? recipient.validation.message : ''}
            width='100%'
            margin={'10px 0 30px'}
            placeholder={'recipient...'}
            name={'recipient'}
            value={recipient?.value as string}
            onChange={evt => channelForm.setInputValue('recipient', evt.target.value)}
          />
        </>
      )}

      {protocol.value === 'http' && (
        <>
          <TextField
            validationErrorMessage={url.value ? url.validation.message : ''}
            width='100%'
            margin={'10px 0 30px'}
            placeholder={'URL...'}
            name={'url'}
            value={url?.value as string}
            onChange={evt => channelForm.setInputValue('url', evt.target.value)}
          />
        </>
      )}

      {protocol.value === 'azureIotHub' && (
        <>
          <TextField
            width='100%'
            margin={'10px 0 30px'}
            placeholder={'connection string...'}
            name={'connectionString'}
            value={connectionString?.value as string}
            onChange={evt => channelForm.setInputValue('connectionString', evt.target.value)}
          />
        </>
      )}

      {protocol.value === 'deltaControls' && (
        <>
          <Select
            label={'Connector'}
            options={_.map(deltaControlsConnectorsQuery.data, device => ({
              value: device._id,
              label: device.name || 'no-name',
            }))}
            value={channelForm.formInputs.connector.value as string}
            onChange={evt => channelForm.setInputValue('connector', evt.target.value)}
          />
          <TextArea
            label='Delta Controls settings'
            value={channelForm.formInputs.deltaControlsSettings.value as string}
            onChange={evt => channelForm.setInputValue('deltaControlsSettings', evt.target.value)}
            validationErrorMessage={channelForm.formInputs.deltaControlsSettings.validation.message}
            validationSuccessMessage={channelForm.formInputs.deltaControlsSettings.validation.isValid ? 'Valid!' : null}
            height='280px'
            margin={'15px 0 30px 0'}
          />
        </>
      )}

      <FlexSpaceBetweenWrapper>
        <Button
          content={_.capitalize(t('labels.cancel'))}
          onClick={() => props.setPage('default')}
          ghosted
          width={'120px'}
          height={'30px'}
          padding={'0 15px'}
        />
        <Button
          disabled={!isValidChannel}
          width={'200px'}
          onClick={createChannels}
          color={'green'}
          content={'Create channel'}
        />
      </FlexSpaceBetweenWrapper>
    </>

  );
};

export default ChannelsPane;
