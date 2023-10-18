/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import _ from 'lodash';

// Logic
import {INSTRUCTION_FIELDS} from '../constants';
import {devicesApi} from '../../../../../api';
import {LORA_CONNECTOR_TYPES} from '../../../constants';
import {resolveConnectorName} from '../utils';
import {selectConnectorItems} from '../selectors';
import {CommandData} from '../types';


// UI
import Spinner from '../../../../../components/spinner';
import Select from '../../../../../components/select';
import {
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
} from '../styled';

const Instructions = () => {

  const connectorDevices = devicesApi.useConnectorsDevicesQuery();
  const connectorOptions = _.map(connectorDevices, d => ({label: `${d.name} (${d.downlinkQueue})`, value: d._id}));

  const [selectedConnectorId, setSelectedConnectorId] = useState('');

  const queryClient = useQueryClient();

  const useCommandDeviceMutation = devicesApi.useCommandDevice(queryClient);

  const connectorName = resolveConnectorName(connectorDevices, selectedConnectorId);

  const connectorItems = selectConnectorItems({
    commandData: useCommandDeviceMutation.data as CommandData,
    connectorName,
  });

  const onChangeConnector = (evt: React.ChangeEvent<HTMLInputElement>) => {

    const connectorId = evt.target.value;
    const connectorName = resolveConnectorName(connectorDevices, connectorId);

    if (connectorName === LORA_CONNECTOR_TYPES.Netmore) {
      const payload = {
        command: 'apiCall',
        deviceId: 'priceModels',
        iotnodeId: connectorId,
        data: {
          callName: 'fetchPriceModels',
        },
      };
      useCommandDeviceMutation.mutate(payload);
    }

    if (connectorName === LORA_CONNECTOR_TYPES.ActilityThingpark) {
      const payload = {
        command: 'apiCall',
        deviceId: 'connectivityPlans',
        iotnodeId: connectorId,
        data: {
          callName: 'fetchConnectivityPlans',
        },
      };
      useCommandDeviceMutation.mutate(payload);
    }

    setSelectedConnectorId(evt.target.value);

  };

  return (
    <InstructionsContainer>
      <Paragraph>
        The installation file should contain information of the devices you want to install. <br />
        The file must be a correctly formatted CSV-file.
      </Paragraph>
      <p>Here is a basic example of an installation file containing three devices:</p>
      <CodeBox>
        <p>name,description</p>
        <p>MyDevice1,This is a description of the device</p>
        <p>MyDevice2,This is a description of the device</p>
        <p>MyDevice3,This is a description of the device</p>
      </CodeBox>
      <Paragraph>
        Different kinds of devices require different sets of data.&nbsp;
        To know which fields to include you can look in the tables&nbsp;
        below and in the Yggio documentation.
      </Paragraph>
      <Paragraph>
        Note that it is important that you spell the name of the fields (top row)&nbsp;
        correctly. It's case-sensitive.
      </Paragraph>
      <Paragraph>
        If you are unsure whether your data is valid it can be a good idea to&nbsp;
        first run a batch installation for a small number of devices, before doing a large amount.
      </Paragraph>

      <InstructionHeading>Common fields</InstructionHeading>

      {_.map(INSTRUCTION_FIELDS, (items, heading) => (
        <React.Fragment key={heading}>
          <FieldsTableHeading>{heading}</FieldsTableHeading>
          <FieldsTable>
            {_.map(items, item => (
              <React.Fragment key={item.name}>
                <FieldsTableItem>{item.name}</FieldsTableItem>
                <FieldsTableItem>{item.description || ''}</FieldsTableItem>
              </React.Fragment>
            ))}
          </FieldsTable>
        </React.Fragment>
      ))}

      <br />

      <InstructionHeading>How to add contextual parameters</InstructionHeading>
      <Paragraph>
        Use contextMap to add contextual parameters.&nbsp;
        Write in dot notation. See example below:
      </Paragraph>
      <CodeBox>
        <p>name,contextMap.placement,contextMap.installedBy</p>
        <p>MyDevice1,floor,Markus</p>
        <p>MyDevice2,roof,Sofia</p>
        <p>MyDevice3,wall,Johan</p>
      </CodeBox>

      <HelperToolContainer>
        <InstructionHeading>Connector helper tool</InstructionHeading>
        <Select
          label={'Select connector'}
          options={connectorOptions}
          value={selectedConnectorId}
          onChange={onChangeConnector}
        />
        {selectedConnectorId && (
          <p>ID of selected connector: <b>{selectedConnectorId}</b></p>
        )}
        {connectorItems && (
          <>
            <ConnectorItemsTitle>{connectorItems.title}</ConnectorItemsTitle>
            {connectorItems.items.length === 0 && (
              <p>None found</p>
            )}
            {connectorItems.items.length > 0 && (
              <ConnectorItemsTable>
                <p><b>Name</b></p>
                <p><b>Id (use this value in the file)</b></p>
                {_.map(connectorItems.items, item => (
                  <React.Fragment key={item.value}>
                    <p>{item.name}</p>
                    <p>{item.value}</p>
                  </React.Fragment>
                ))}
              </ConnectorItemsTable>
            )}
          </>
        )}
        {useCommandDeviceMutation.isLoading && !connectorItems && (
          <Spinner />
        )}
        {useCommandDeviceMutation.isError && (
          (
            connectorName === LORA_CONNECTOR_TYPES.Netmore ||
            connectorName === LORA_CONNECTOR_TYPES.ActilityThingpark
          ) && (
            <p>- Failed to fetch price models or connectivity plans from server -</p>
          )
        )}
      </HelperToolContainer>

    </InstructionsContainer>
  );
};

export default Instructions;
