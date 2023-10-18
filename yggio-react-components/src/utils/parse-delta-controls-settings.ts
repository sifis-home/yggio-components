/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {z} from 'zod';
import {channelSchemas} from 'yggio-schemas';

import {InputValue} from '../types';

const errorMap: z.ZodErrorMap = (issue, ctx) => {
  return {message: `Error at item ${Number(issue.path[0]) + 1}, ${issue.path[1]}: ${ctx.defaultError}`};
};

const parseDeltaControlsSettings = (input: InputValue) => {
  // Parse JSON
  let json: unknown;
  try {
    json = JSON.parse(input as string);
  } catch (error) {
    throw Error('Invalid JSON');
  }

  // Create object
  let settings!: z.infer<typeof channelSchemas.deltaControlsSettings>;
  try {
    settings = channelSchemas.deltaControlsSettings.parse(json, {errorMap});
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      throw Error(firstError.message);
    }
  }

  // Further validation
  _.forEach(settings, (item, index) => {
    if (item.createMissing && _.isEmpty(item.objectName)) {
      throw Error(`Error at item ${index + 1}: objectName is required if createMissing is true`);
    }
  });

  return settings;
};

export default parseDeltaControlsSettings;
