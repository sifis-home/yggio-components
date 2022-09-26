/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import withYggio from './with-yggio';
import YggioTokenMonitor from './yggio-token-monitor';
import YggioMessageToaster from './yggio-message-toaster';

// things that should not have to be imported. Use is discouraged
import {
  removeYggioToken,
} from './network/yggio-token';

const thisIsNotAGoodIdea = {
  removeYggioToken,
};

export {

  // keepers
  withYggio,
  YggioTokenMonitor,
  YggioMessageToaster,

  // deprecated
  thisIsNotAGoodIdea,
};
