import React from 'react';
import _ from 'lodash';
import toast from 'react-hot-toast';
import {useMutation, useQuery} from '@tanstack/react-query';

// Logic
import {GenericMqttConnector} from '../../../../../types';
import {useLocalState} from '../../../../../hooks';
import formState from '../state';
import {connectorsRequests} from '../../../../../api';
import {getRequestErrorMessage} from '../../../../../utils';
import {
  getValidationErrorMessage,
  getValidationSuccessMessage,
  getFormValues,
} from '../../../../../utils/form-wizard';
import {
  getGenericMqttConnectorTopic,
  validatePublishMqttMessageForm,
  extractPublishMqttMessageData,
} from '../utils';

// UI
import {TopicLabel, Topic, NoConnectorNote} from '../styled';
import TextArea from '../../../../../components/text-area';
import TextField from '../../../../../components/text-field';
import Button from '../../../../../components/button';
import Select from '../../../../../components/select';
import SegmentedControl from '../../../../../components/segmented-control';
import {Heading} from '../../../../../global/components';

const PublishMqttMessage = () => {

  const form = useLocalState(formState);

  const connectorsQuery = useQuery(
    ['connectors', {integration: 'Generic'}],
    async () => connectorsRequests.fetch<GenericMqttConnector>({
      integration: 'Generic',
    }),
  );

  const sendCommandMutation = useMutation(
    async () => {
      const genericCommand = {
        command: 'sendDownlink', // <-- might change?
        connectorId: form.formInputs.connectorId.value as string,
        integrationName: 'Generic',
        data: extractPublishMqttMessageData(getFormValues(form.formInputs)),
      };
      return connectorsRequests.sendCommand(genericCommand);
    },
    {
      onSuccess: () => {
        toast.success('MQTT message published successfully');
      },
      onError: (error: Error) => {
        toast.error(getRequestErrorMessage(error));
      },
    }
  );

  const selectedConnector = _.find(connectorsQuery.data, {_id: form.formInputs.connectorId.value as string});
  const topic = getGenericMqttConnectorTopic(selectedConnector);

  const isValidForm = validatePublishMqttMessageForm(form);

  return (
    <>
      <Heading
        heading='Publish MQTT message'
        subHeading='Publish a MQTT message to the device using a Generic MQTT connector.'
        margin='30px 0 20px 0'
      />
      {_.isEmpty(connectorsQuery.data) ? (
        <NoConnectorNote>No Generic MQTT connectors found. Add one to enable this feature.</NoConnectorNote>
      ) : (
        <>
          <Select
            label='Select a Generic MQTT connector'
            options={_.map(connectorsQuery.data, connector => ({label: connector.name, value: connector._id}))}
            value={form.formInputs.connectorId.value as string}
            onChange={evt => form.setInputValue('connectorId', evt.target.value)}
            isClearable
            margin={'25px 0 20px 0'}
          />
          {form.formInputs.connectorId.value && (
            <>
              <TextField
                label='Sub-topic'
                value={form.formInputs.subTopic.value as string}
                onChange={evt => form.setInputValue('subTopic', evt.target.value)}
                isOptional
                margin={'0 0 20px 0'}
              />
              <TopicLabel>Resulting topic:</TopicLabel>
              <Topic>{topic}/{form.formInputs.subTopic.value as string}</Topic>
              <SegmentedControl
                label='Data type'
                options={[
                  {label: 'None', value: 'none'},
                  {label: 'Raw', value: 'raw'},
                  {label: 'JSON', value: 'json'},
                ]}
                value={form.formInputs.dataType.value as string}
                onChange={value => form.setInputValue('dataType', value)}
                margin={'0 0 20px 0'}
              />
              {form.formInputs.dataType.value === 'raw' && (
                <TextField
                  label='Raw value'
                  value={form.formInputs.rawData.value as string}
                  onChange={evt => form.setInputValue('rawData', evt.target.value)}
                  validationErrorMessage={getValidationErrorMessage(form.formInputs.rawData)}
                  margin={'0 0 20px 0'}
                />
              )}
              {form.formInputs.dataType.value === 'json' && (
                <TextArea
                  label='JSON value'
                  value={form.formInputs.jsonData.value as string}
                  onChange={evt => form.setInputValue('jsonData', evt.target.value)}
                  validationErrorMessage={getValidationErrorMessage(form.formInputs.jsonData)}
                  validationSuccessMessage={getValidationSuccessMessage(form.formInputs.jsonData)}
                  margin={'0 0 20px 0'}
                />
              )}
              <Button
                label='Publish message'
                color='green'
                width='130px'
                margin={'25px 0 0 0'}
                disabled={!isValidForm}
                isLoading={sendCommandMutation.isLoading}
                onClick={() => sendCommandMutation.mutate()}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default PublishMqttMessage;
