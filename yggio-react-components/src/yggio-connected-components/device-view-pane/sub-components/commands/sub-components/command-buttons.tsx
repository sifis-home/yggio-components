/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState} from 'react';
import _ from 'lodash';
import toast from 'react-hot-toast';
import {useQueryClient} from '@tanstack/react-query';

// Logic
import {Device} from '../../../../../types';
import {rulesApi, ruleButtonsApi, getUserId} from '../../../../../api';
import {COMMAND_BUTTON_NAMES} from '../constants';

// UI
import TextField from '../../../../../components/text-field';
import Button from '../../../../../components/button';
import Select from '../../../../../components/select';
import {FlexWrapper} from '../../../../../global/styled';
import {Heading} from '../../../../../global/components';

interface CommandButtonsProps {
  device: Device;
}

const CommandButtons = (props: CommandButtonsProps) => {

  const queryClient = useQueryClient();

  const userId = getUserId();

  const [customValue, setCustomValue] = useState('');
  const [ruleAction, setRuleAction] = useState('');

  const activateRuleMutation = rulesApi.useActivateRule();

  const createRuleButtonMutation = ruleButtonsApi.useCreateRuleButtonMutation(queryClient);
  const removeRuleButtonMutation = ruleButtonsApi.useRemoveRuleButtonMutation(queryClient);

  const getRulesButtonsQuery = ruleButtonsApi.useRuleButtonsQuery({
    owner: userId!,
    deviceId: props.device._id,
  });

  const existingButtonLabels = _.map(getRulesButtonsQuery.data, button => button.name);

  const filteredOptions = _.filter(COMMAND_BUTTON_NAMES, name => !existingButtonLabels.includes(name));

  const setupRuleAction = () => {
    const foundDuplicateButton = _.some(existingButtonLabels, label => label === customValue);
    if (foundDuplicateButton) {
      toast.error('Button already exists');
      return;
    }
    const buttonName = ruleAction === 'Custom...'
      ? customValue
      : ruleAction;

    createRuleButtonMutation.mutate({
      data: {
        owner: userId!,
        deviceId: props.device._id,
        buttonName,
        deviceName: props.device.name!,
        actionType: 'Command', // do we still need this?
        message: {
          command: 'sendDownlink',
        }
      }
    });
    setCustomValue('');
    setRuleAction('');
  };

  return (
    <>
      <Heading
        heading='Command buttons'
        subHeading='Once a button has been created, go to the rule engine and edit the rule to add the command you want to send to the device.'
        margin='30px 0 30px 0'
      />
      <Select
        width={'250px'}
        label={'Create a new button'}
        placeholder={'Select a button text'}
        name={'rulesAction'}
        options={_.map(filteredOptions, value => ({label: value, value}))}
        value={ruleAction}
        onChange={evt => setRuleAction(evt.target.value)}
      />
      {ruleAction === 'Custom...' &&
        <TextField
          onChange={evt => setCustomValue(evt.target.value)}
          value={customValue}
          margin={'8px 0 0 0'}
          label={'Please enter your own text for the button'}
          maxLength={8}
        />
      }
      <Button
        label={'Create'}
        disabled={!ruleAction || (ruleAction === 'Custom...' && !customValue)}
        color={'green'}
        height={'38px'}
        ghosted
        width={'80px'}
        margin={'8px 0 0 0'}
        onClick={setupRuleAction}
      />
      <>
        {_.map(getRulesButtonsQuery.data, rule => (
          <FlexWrapper key={rule.ruleId}>
            <Button
              color={'blue'}
              margin={'10px 0 10px'}
              height={'30px'}
              width={'150px'}
              content={rule.name}
              onClick={() => {
                activateRuleMutation.mutate({ruleId: rule.ruleId, deviceId: props.device._id});
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
                removeRuleButtonMutation.mutate({data: {ruleId: rule.ruleId}});
              }}
            />
          </FlexWrapper>
        ))}
      </>
    </>
  );
};

export default CommandButtons;
