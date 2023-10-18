import _ from 'lodash';
import React from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {Box, Flex} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';

import {Devices} from '../../../../types';
import Button from '../../../../components/button';
import Spinner from '../../../../components/spinner';
import Select from '../../../../components/select';
import {useLocalState} from '../../../../hooks';
import {formState} from './state';
import ContainerBox from '../../../../components/container-box';
import {Info} from './styled';
import {HorizontalLine} from '../../../../global/styled';
import {CenteredPage} from '../../../../global/components';
import {devicesApi} from '../../../../api';
import {selectDeviceOptions} from './selectors';

interface SetConnectorProps {
  selectedDevices: string[];
  devices: Devices;
  setIsInSelectMode(bool: boolean): void;
  setSelectedDevices(devices: string[]): void;
  setPage(page: string): void;
}

const SetConnectorPane = (props: SetConnectorProps) => {
  const {t} = useTranslation();
  if (!_.size(props.selectedDevices)) {
    props.setPage('default');
  }
  return (
    <CenteredPage>
      <ContainerBox>
        <p>You have {_.size(props.selectedDevices)} devices selected.</p>
        <SetConnector {...props} />
        <HorizontalLine />
        <Flex
          w='100%'
          justifyContent='flex-end'
        >
          <Button
            color='green'
            content={t('labels.finish')}
            onClick={() => {
              props.setIsInSelectMode(false);
              props.setSelectedDevices([]);
              props.setPage('default');
            }}
            width={'120px'}
            height={'30px'}
            padding={'0 15px'}
          />
        </Flex>
      </ContainerBox>
    </CenteredPage>
  );
};

const SetConnector = (props: SetConnectorProps) => {
  const queryClient = useQueryClient();
  const {t} = useTranslation();
  const {
    mutateAsync: mutateDevice,
    isLoading,
    isSuccess,
  } = devicesApi.useUpdateDevice(queryClient);

  const connectorForm = useLocalState(formState);
  const devices = devicesApi.useConnectorsDevicesQuery();
  const deviceOptions = selectDeviceOptions({devices});

  const handleSetConnector = async () => {
    const updatedDevices = _.map(props.selectedDevices, async deviceId => {
      await mutateDevice({
        deviceId,
        updates: {connector: connectorForm.formInputs?.setConnectorId?.value as string},
      });
    });
    await Promise.all(updatedDevices);
    connectorForm.resetForm();
  };

  if (isLoading) {
    return <Flex w='100%' justifyContent='center' m='20px'>Setting connectors...<Spinner size={24} /></Flex>;
  }

  if (isSuccess) {
    return <Box m='20px'><b>Connectors successfully set.</b></Box>;
  }

  return (
    <Box m='20px'>
      <Info>
        Select your connector
        , and press the Set connector button to update your selected device(s) with a connector.
      </Info>
      <Select
        name={'setConnectorId'}
        placeholder={t('placeholders.selectDevice')}
        options={deviceOptions}
        margin={'0 10px 20px 0'}
        value={connectorForm.formInputs?.setConnectorId?.value as string}
        onChange={evt => (
          connectorForm.setInputValue('setConnectorId', evt.target.value)
        )}
      />

      <Button
        disabled={!connectorForm.formInputs?.setConnectorId?.value}
        content={t('common.setConnector')}
        onClick={handleSetConnector}
        color={'green'}
        width={'200px'}
        height={'30px'}
        padding={'0 15px'}
      />
    </Box>
  );
};

export default SetConnectorPane;
