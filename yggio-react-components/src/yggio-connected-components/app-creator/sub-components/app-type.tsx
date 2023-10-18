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
  Flex,
} from '@chakra-ui/react';
import {APP_TYPES} from 'yggio-core-constants';

import {HorizontalLine} from '../../../global/styled';
import ContainerBox from '../../../components/container-box';
import Button from '../../../components/button';
import {READABLE_APP_TYPES} from '../constants';
import Select from '../../../components/select';
import {Form} from '../../../types';

interface AppTypeProps {
  router: NextRouter;
  form: Form;
  incrementCurrentStep: () => void;
}

const AppType = (props: AppTypeProps) => (
  <ContainerBox margin='10px 0 0'>
    <Select
      label='Type'
      additionalInfo={'Select what type of application you want to create'}
      width='350px'
      margin='10px'
      onChange={evt => props.form.setInputValue('type', evt.target.value)}
      options={_.map(_.omit(APP_TYPES, APP_TYPES.sifisHome), type => ({label: READABLE_APP_TYPES[type], value: type}))}
      value={props.form.formInputs.type.value as string}
    />

    {/* @ts-ignore - untyped styled component */}
    <HorizontalLine margin='30px 0 30px' />
    <Flex justifyContent='space-between'>
      <Button
        label='Cancel'
        ghosted
        onClick={() => void props.router.push('/apps')}
        width='200px'
        margin='10px'
      />
      <Button
        label='Continue'
        color='green'
        onClick={props.incrementCurrentStep}
        width='200px'
        margin='10px'
      />
    </Flex>
  </ContainerBox>
);

export default AppType;
