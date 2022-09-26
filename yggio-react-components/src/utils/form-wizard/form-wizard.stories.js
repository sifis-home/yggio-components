/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// form-wizard/form-wizard.stories.js

import {storiesOf} from '@storybook/react';
import {
  def,
  simple,
  populate,
  visibilityTypes,
} from './stories';

storiesOf('Utils/Form Wizard', module)
  .add('default', def)
  .add('simple', simple)
  .add('populate', populate)
  .add('visibilityTypes', visibilityTypes);
