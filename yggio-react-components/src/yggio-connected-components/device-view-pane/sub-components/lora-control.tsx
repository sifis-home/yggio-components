/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React, {useEffect} from 'react';
import _ from 'lodash';
import {useQueryClient, useMutation, UseMutationResult} from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Logic
import {getRequestErrorMessage} from '../../../utils';
import {useLocalState} from '../../../hooks';
import {rulesApi, devicesRequests} from '../../../api';
import {selectRules, selectLoraQueueItems} from '../selectors';
import {getUserId} from '../../../api/token';
import {LORA_SERVERS, CHIRP_STACK_COMMANDS} from '../constants';
import {getFormValues, isFormValid, getValidationErrorMessage} from '../../../utils/form-wizard';
import {Device, DeviceCommand, IdKeyedRules, Translate} from '../../../types';
import {GetQueueResponse} from '../types';
import {
  createRulesActionsOptions,
  createRuleTemplate,
  getDeviceLoraServer,
  getGetQueueRequestData,
  getFlushQueueRequestData,
} from '../utils';
import {
  chirpstackDownlinkFormState,
  netmoreDownlinkFormState,
  thingparkDownlinkFormState,
  rulesFormState,
} from '../state';

// UI
import {FlexWrapper, HorizontalLine} from '../../../global/styled';
import {Heading} from '../../../global/components';
import TextField from '../../../components/text-field';
import SegmentedControl from '../../../components/segmented-control';
import Select from '../../../components/select';
import Button from '../../../components/button';
import Spinner from '../../../components/spinner';
import {
  LoraQueueContainer,
  LoraQueueCenterer,
  LoraQueueNoItemsNote,
  LoraQueueTable,
  LoraQueueTableHeaderItem,
  LoraQueueTableItem,
  NoDataBox,
} from '../styled';

// NOTE: This file really needs to be divided up

const RULES_ACTIONS = {
  turnOn: 'turnOn',
  turnOff: 'turnOff',
};

interface LoRaControlProps {
  device: Device;
  t: Translate;
}

const LoraControl = (props: LoRaControlProps) => {
  const loraServer = getDeviceLoraServer(props.device);
  if (!loraServer) {
    return (
      <NoDataBox>This device has no supported LoRa server connected</NoDataBox>
    );
  }
  return (
    <LoRaControlContent
      device={props.device}
      t={props.t}
      loraServer={loraServer}
    />
  );
};

interface LoRaControlContentProps {
  device: Device;
  t: Translate;
  loraServer: LORA_SERVERS;
}

const LoRaControlContent = (props: LoRaControlContentProps) => {

  const getQueueRequestData = getGetQueueRequestData(props.device, props.loraServer)!;
  const flushQueueRequestData = getFlushQueueRequestData(props.device, props.loraServer)!;

  const getQueueMutation = useMutation(
    async () => devicesRequests.sendCommand<GetQueueResponse>(getQueueRequestData),
    {
      onError: error => {
        toast.error(getRequestErrorMessage(error));
      },
    }
  );

  useEffect(() => {
    if (props.loraServer === LORA_SERVERS.chirpStack || props.loraServer === LORA_SERVERS.netmore) {
      getQueueMutation.mutate();
    }
  }, []);

  return (
    <>
      <div>
        <Heading
          heading='Send downlink'
          subHeading='Send downlink messages to the device'
          margin='0 0 30px 0'
        />
        {props.loraServer === LORA_SERVERS.chirpStack && (
          <ChirpstackDownlink
            device={props.device}
            refetchQueue={getQueueMutation.mutate}
          />
        )}
        {props.loraServer === LORA_SERVERS.netmore && (
          <NetmoreDownlink
            device={props.device}
            refetchQueue={getQueueMutation.mutate}
          />
        )}
        {props.loraServer === LORA_SERVERS.actilityThingpark && (
          <ActilityThingparkDownlink
            device={props.device}
          />
        )}
      </div>

      {(props.loraServer === LORA_SERVERS.chirpStack ||
        props.loraServer === LORA_SERVERS.netmore) && (
        <Queue
          deviceId={props.device._id}
          getQueueMutation={getQueueMutation}
          flushQueueData={flushQueueRequestData}
          loraServer={props.loraServer}
        />
      )}

      {props.loraServer === LORA_SERVERS.chirpStack && (
        <CustomDownlink
          device={props.device}
          t={props.t}
        />
      )}

    </>
  );
};

interface DownlinkFormProps {
  device: Device;
  refetchQueue?: () => void;
}

const ChirpstackDownlink = (props: DownlinkFormProps) => {
  const form = useLocalState(chirpstackDownlinkFormState);
  const sendLoraDownlinkMutation = useMutation(
    async () => devicesRequests.sendCommand({
      command: CHIRP_STACK_COMMANDS.loraAppServerQueueDownlink,
      integrationName: LORA_SERVERS.chirpStack,
      iotnodeId: props.device._id,
      data: getFormValues(form.formInputs),
    }),
    {
      onError: error => {
        toast.error(getRequestErrorMessage(error));
      },
      onSuccess: () => {
        toast.success('Successfully sent downlink.');
        props.refetchQueue!();
        form.resetForm();
      },
    }
  );
  return (
    <>
      <TextField
        label={'Data'}
        additionalInfo={'Hex data to be sent'}
        name={'data'}
        isRequired
        value={form.formInputs.data.value as string}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          form.setInputValue('data', evt.target.value);
          form.showInputValidation('data');
        }}
        validationErrorMessage={
          form.formInputs.data.value
            ? getValidationErrorMessage(form.formInputs.data)
            : null
        }
        margin={'0 0 10px 0'}
      />
      <TextField
        label={'FPort'}
        additionalInfo={'Port field to be used. Must be between 1-223.'}
        name={'fPort'}
        isRequired
        value={form.formInputs.fPort.value as string}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          form.setInputValue('fPort', evt.target.value);
          form.showInputValidation('fPort');
        }}
        validationErrorMessage={
          form.formInputs.fPort.value
            ? getValidationErrorMessage(form.formInputs.fPort)
            : null
        }
        margin={'0 0 10px 0'}
      />
      <TextField
        label={'Reference'}
        additionalInfo='Random reference (used on ack notification)'
        name={'reference'}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => (
          form.setInputValue('reference', evt.target.value)
        )}
        value={form.formInputs.reference.value as string}
        margin={'0 0 10px 0'}
      />
      <SegmentedControl
        label={'Confirmed'}
        additionalInfo={'Whether an ACK is required from the node. Default is No.'}
        options={[
          {value: true, label: 'Yes'},
          {value: false, label: 'No'},
        ]}
        value={form.formInputs.confirmed.value as boolean}
        onChange={value => form.setInputValue('confirmed', value as boolean)}
        height={'30px'}
        margin={'0 0 10px 0'}
      />
      <Button
        label={'Send downlink'}
        disabled={!isFormValid(form.formInputs)}
        onClick={() => sendLoraDownlinkMutation.mutate()}
        isLoading={sendLoraDownlinkMutation.isLoading}
        color={'green'}
        width={'130px'}
        margin={'20px 0 30px 0'}
      />
    </>
  );
};

const NetmoreDownlink = (props: DownlinkFormProps) => {
  const form = useLocalState(netmoreDownlinkFormState);
  const sendLoraDownlinkMutation = useMutation(
    async () => devicesRequests.sendCommand({
      command: 'apiCall',
      iotnodeId: props.device._id,
      data: {
        callName: 'sendDownlink',
        callData: {
          devEui: props.device.devEui,
          payload: getFormValues(form.formInputs),
        }
      }
    }),
    {
      onError: error => {
        toast.error(getRequestErrorMessage(error));
      },
      onSuccess: () => {
        toast.success('Successfully sent downlink.');
        props.refetchQueue!();
        form.resetForm();
      },
    }
  );
  return (
    <>
      <TextField
        label={'Data'}
        additionalInfo={'Hex data to be sent'}
        name={'data'}
        isRequired
        value={form.formInputs.payloadHex.value as string}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          form.setInputValue('payloadHex', evt.target.value);
          form.showInputValidation('payloadHex');
        }}
        validationErrorMessage={
          form.formInputs.payloadHex.value
            ? getValidationErrorMessage(form.formInputs.payloadHex)
            : null
        }
        margin={'0 0 10px 0'}
      />
      <TextField
        label={'FPort'}
        additionalInfo={'Port field to be used. Must be between 1-999.'}
        name={'fPort'}
        isRequired
        value={form.formInputs.fPort.value as string}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          form.setInputValue('fPort', evt.target.value);
          form.showInputValidation('fPort');
        }}
        validationErrorMessage={
          form.formInputs.fPort.value
            ? getValidationErrorMessage(form.formInputs.fPort)
            : null
        }
        margin={'0 0 10px 0'}
      />
      <Button
        label={'Send downlink'}
        disabled={!isFormValid(form.formInputs)}
        onClick={() => sendLoraDownlinkMutation.mutate()}
        isLoading={sendLoraDownlinkMutation.isLoading}
        color={'green'}
        width={'130px'}
        margin={'20px 0 30px 0'}
      />
    </>
  );
};

const ActilityThingparkDownlink = (props: DownlinkFormProps) => {
  const form = useLocalState(thingparkDownlinkFormState);
  const sendLoraDownlinkMutation = useMutation(
    async () => devicesRequests.sendCommand({
      command: 'apiCall',
      iotnodeId: props.device._id,
      data: {
        callName: 'downlinkMessages',
        callData: {
          devEUI: props.device.devEui,
          payload: {
            targetPorts: form.formInputs.targetPorts.value,
            payloadHex: form.formInputs.payloadHex.value,
          },
          qs: {
            confirmDownlink: form.formInputs.confirmDownlink.value,
            flushDownlinkQueue: form.formInputs.flushDownlinkQueue.value,
          },
        },
      },
    }),
    {
      onError: error => {
        toast.error(getRequestErrorMessage(error));
      },
      onSuccess: () => {
        toast.success('Successfully sent downlink.');
        form.resetForm();
      },
    }
  );
  return (
    <>
      <TextField
        label={'Data'}
        additionalInfo={'Hex data to be sent'}
        name={'data'}
        isRequired
        value={form.formInputs.payloadHex.value as string}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          form.setInputValue('payloadHex', evt.target.value);
          form.showInputValidation('payloadHex');
        }}
        validationErrorMessage={
          form.formInputs.payloadHex.value
            ? getValidationErrorMessage(form.formInputs.payloadHex)
            : null
        }
        margin={'0 0 10px 0'}
      />
      <TextField
        label={'FPort'}
        additionalInfo={'Port field to be used. Must be between 1-999.'}
        name={'targetPorts'}
        isRequired
        value={form.formInputs.targetPorts.value as string}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          form.setInputValue('targetPorts', evt.target.value);
          form.showInputValidation('targetPorts');
        }}
        validationErrorMessage={
          form.formInputs.targetPorts.value
            ? getValidationErrorMessage(form.formInputs.targetPorts)
            : null
        }
        margin={'0 0 10px 0'}
      />
      <SegmentedControl
        label={'Confirm downlink'}
        additionalInfo={'TBA'}
        options={[
          {value: true, label: 'Yes'},
          {value: false, label: 'No'},
        ]}
        value={form.formInputs.confirmDownlink.value as string}
        onChange={value => form.setInputValue('confirmDownlink', value as string)}
        height={'30px'}
        margin={'0 0 10px 0'}
      />
      <SegmentedControl
        label={'Flush downlink queue'}
        additionalInfo={'TBA'}
        options={[
          {value: true, label: 'Yes'},
          {value: false, label: 'No'},
        ]}
        value={form.formInputs.flushDownlinkQueue.value as string}
        onChange={value => form.setInputValue('flushDownlinkQueue', value as string)}
        height={'30px'}
        margin={'0 0 10px 0'}
      />
      <Button
        label={'Send downlink'}
        disabled={!isFormValid(form.formInputs)}
        onClick={() => sendLoraDownlinkMutation.mutate()}
        isLoading={sendLoraDownlinkMutation.isLoading}
        color={'green'}
        width={'130px'}
        margin={'20px 0 30px 0'}
      />
    </>
  );
};

interface QueueProps {
  deviceId: string;
  getQueueMutation: UseMutationResult<GetQueueResponse, unknown, void, unknown>;
  flushQueueData: DeviceCommand;
  loraServer: LORA_SERVERS;
}

const Queue = (props: QueueProps) => {
  const flushQueueMutation = useMutation(
    async () => devicesRequests.sendCommand(props.flushQueueData),
    {
      onError: error => {
        toast.error(getRequestErrorMessage(error));
      },
      onSuccess: () => {
        toast.success('Successfully flushed downlink queue.');
        props.getQueueMutation.mutate();
      },
    }
  );

  const queueItems = selectLoraQueueItems({
    data: props.getQueueMutation.data,
    loraServer: props.loraServer,
  });

  return (
    <div>
      <HorizontalLine />
      <Heading
        heading='Downlink queue'
        subHeading='See the queued downlink messages for this device'
        margin='30px 0 30px 0'
      />
      <FlexWrapper>
        <Button
          label={'Refresh queue'}
          onClick={() => props.getQueueMutation.mutate()}
          disabled={props.getQueueMutation.isLoading}
          ghosted
          width={'110px'}
          color={'blue'}
          margin={'0 8px 0 0'}
        />
        <Button
          label={'Flush queue'}
          onClick={() => flushQueueMutation.mutate()}
          isLoading={flushQueueMutation.isLoading}
          ghosted
          color={'red'}
        />
      </FlexWrapper>

      <LoraQueueContainer>
        {props.getQueueMutation.isLoading && (
          <LoraQueueCenterer>
            <Spinner size={25} color={'#555'} />
          </LoraQueueCenterer>
        )}
        {_.isEmpty(queueItems) && !props.getQueueMutation.isLoading && (
          <LoraQueueCenterer>
            <LoraQueueNoItemsNote>Queue is empty</LoraQueueNoItemsNote>
          </LoraQueueCenterer>
        )}
        {queueItems && !_.isEmpty(queueItems) && (
          <LoraQueueTable>
            <LoraQueueTableHeaderItem>Data</LoraQueueTableHeaderItem>
            <LoraQueueTableHeaderItem>fPort</LoraQueueTableHeaderItem>
            <LoraQueueTableHeaderItem>{queueItems[0].fCnt ? 'fCount' : null}</LoraQueueTableHeaderItem>
            <LoraQueueTableHeaderItem>{queueItems[0].confirmed ? 'Confirmed' : null}</LoraQueueTableHeaderItem>
            {_.map(queueItems, item => (
              <React.Fragment key={item.fCnt}>
                <LoraQueueTableItem>{item.data}</LoraQueueTableItem>
                <LoraQueueTableItem>{item.fPort}</LoraQueueTableItem>
                <LoraQueueTableItem>{item.fCnt}</LoraQueueTableItem>
                <LoraQueueTableItem>{item.confirmed}</LoraQueueTableItem>
              </React.Fragment>
            ))}
          </LoraQueueTable>
        )}
      </LoraQueueContainer>

    </div>
  );
};

interface CustomDownlinkProps {
  device: Device;
  t: (key: string) => string;
}

const CustomDownlink = (props: CustomDownlinkProps) => {

  const ruleForm = useLocalState(rulesFormState);

  const rulesQuery = rulesApi.useRulesQuery();

  const queryClient = useQueryClient();

  const createRuleMutation = rulesApi.useCreateRule(queryClient);
  const removeRuleMutation = rulesApi.useRemoveRule(queryClient);
  const activateRuleMutation = rulesApi.useActivateRule();

  const deviceRules = selectRules({
    rulesActions: rulesQuery.data,
    device: props.device,
  });

  const setupRuleAction = () => {
    const template = createRuleTemplate({
      formInputs: ruleForm.formInputs,
      userId: getUserId()!,
      device: props.device,
    });
    createRuleMutation.mutate(template);
    ruleForm.resetForm();
  };

  return (
    <>
      {/* @ts-ignore not yet typed */}
      <HorizontalLine margin={'30px 0 20px 0'} />

      <Heading
        heading='Custom downlink button'
        subHeading='Once a button has been created, go to the rule engine
        and edit your downlink'
        margin='30px 0 30px 0'
      />
      <FlexWrapper>
        <Select
          width={'250px'}
          placeholder={_.capitalize(props.t('placeholders.select'))}
          name={'rulesAction'}
          options={createRulesActionsOptions(deviceRules)}
          value={ruleForm.formInputs.rulesAction.value as string}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => (
            ruleForm.setInputValue('rulesAction', evt.target.value)
          )}
        />
        <Button
          label={'Create'}
          disabled={!_.get(ruleForm.formInputs, 'rulesAction.value')}
          color={'green'}
          height={'38px'}
          ghosted
          width={'80px'}
          margin={'0 0 0 8px'}
          onClick={setupRuleAction}
        />
      </FlexWrapper>
      <>
        {_.map(deviceRules, (rule, ruleId) => {
          const [event] = (rulesQuery.data as IdKeyedRules)![ruleId].events!;
          return (
            <FlexWrapper key={ruleId}>
              <Button
                color={'green'}
                margin={'10px 0 10px'}
                height={'30px'}
                width={'150px'}
                content={RULES_ACTIONS[rule as 'turnOn' | 'turnOff']}
                onClick={() => {
                  activateRuleMutation.mutate(ruleId);
                }}
              />
              <Button
                color={'red'}
                ghosted
                margin={'10px'}
                height={'30px'}
                width={'30px'}
                content={'✖'}
                onClick={() => {
                  removeRuleMutation.mutate({ruleId, actionId: event.action._id});
                }}
              />
            </FlexWrapper>
          );
        })}
      </>
    </>
  );
};

export default LoraControl;
