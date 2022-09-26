/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';

import {BasicYggioMessageToaster} from './index';

storiesOf('Yggio/Yggio Message Toaster/Basic', module)

  .add('simple string (default)', () => {
    const props = {
      messageItems: ['simple string'],
      wipeMessages: () => console.info('wipeMessages executed'),
    };
    return (
      <BasicYggioMessageToaster {...props} />
    );
  })

  .add('error object', () => {
    const props = {
      messageItems: [new Error('error object')],
      wipeMessages: () => console.info('wipeMessages executed'),
    };
    return (
      <BasicYggioMessageToaster {...props} />
    );
  })

  .add('no type (default)', () => {
    const props = {
      messageItems: [{message: 'no assigned type'}],
      wipeMessages: () => console.info('wipeMessages executed'),
    };
    return (
      <BasicYggioMessageToaster {...props} />
    );
  })

  .add('default type', () => {
    const props = {
      messageItems: [{message: 'default type (explicit)', toastType: 'default'}],
      wipeMessages: () => console.info('wipeMessages executed'),
    };
    return (
      <BasicYggioMessageToaster {...props} />
    );
  })

  .add('info type', () => {
    const props = {
      messageItems: [{message: 'info type', toastType: 'info'}],
      wipeMessages: () => console.info('wipeMessages executed'),
    };
    return (
      <BasicYggioMessageToaster {...props} />
    );
  })

  .add('warn type', () => {
    const props = {
      messageItems: [{message: 'warn type', toastType: 'warn'}],
      wipeMessages: () => console.info('wipeMessages executed'),
    };
    return (
      <BasicYggioMessageToaster {...props} />
    );
  })

  .add('error type', () => {
    const props = {
      messageItems: [{message: 'error type', toastType: 'error'}],
      wipeMessages: () => console.info('wipeMessages executed'),
    };
    return (
      <BasicYggioMessageToaster {...props} />
    );
  });
