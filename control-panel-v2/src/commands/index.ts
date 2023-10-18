/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {newYggioError, ErrorCodes} from 'yggio-errors';
import {Collection, Document} from 'mongodb';

import {init as initDB} from '../db';
import {COLLECTION_NAMES, ERROR_CONTEXTS, REQUEST_METHODS, SERVICE} from '../constants';
import {getAuthUser} from '../utils';
import getThemeCommands from './themes';
import getRuleButtonCommands from './rule-buttons';
import getViewsCommands from './views';

import type {Queries, Bodies, Config} from '../types';

interface Handler {
  authToken: string;
  queryCommand: keyof typeof COLLECTION_NAMES;
  config: Config;
}

interface HandlerRequest {
  method: keyof typeof REQUEST_METHODS;
  data: Bodies;
  query: Queries;
}

const commands = {
  [COLLECTION_NAMES.themes]: getThemeCommands,
  [COLLECTION_NAMES.ruleButtons]: getRuleButtonCommands,
  [COLLECTION_NAMES.views]: getViewsCommands,
} as const;

const ensureValidCommand = (command: keyof typeof COLLECTION_NAMES) => {
  const commandExists = _.includes(COLLECTION_NAMES, command);
  if (!commandExists) {
    throw newYggioError({
      context: {
        errorMessage: `Could not execute command, command does not exist: ${command}`,
        module: ERROR_CONTEXTS.commandHandler,
        payload: {command},
        service: SERVICE,
      },
      yggioErrorCode: ErrorCodes.MISSING,
    });
  }

  return command;
};

const ensureValidCollection = (collection: Collection<Document> | null) => {
  if (!collection) {
    throw newYggioError({
      context: {
        errorMessage: `Could not execute command, collection does not exist: ${collection}`,
        module: ERROR_CONTEXTS.commandHandler,
        payload: {collection},
        service: SERVICE,
      },
      yggioErrorCode: ErrorCodes.MISSING,
    });
  }

  return collection;
};

const ensureIsAuthorizedUser = (user: string | null) => {
  if (!user) {
    throw newYggioError({
      context: {
        errorMessage: `Could not execute command, user is not authorized: ${user}`,
        module: ERROR_CONTEXTS.commandHandler,
        payload: {user},
        service: SERVICE,
      },
      yggioErrorCode: ErrorCodes.UNAUTHENTICATED,
    });
  }

  return user;
};

const handler = async ({
  authToken,
  queryCommand,
  config,
}: Handler) => {
  const clients = await initDB(config);
  const collection = clients[queryCommand];
  const user = getAuthUser(authToken);

  const authorizedUser = ensureIsAuthorizedUser(user);
  const validCommand = ensureValidCommand(queryCommand);
  const validCollection = ensureValidCollection(collection);

  const command = commands[validCommand];
  const subCommand = command(validCollection);

  return async ({
    method,
    data,
    query,
  }: HandlerRequest): Promise<unknown> => {
    const subCommandArgs = {
      user: authorizedUser,
      data,
      query,
      authToken,
    };
    const commandResult = await subCommand[method](subCommandArgs);
    return commandResult;
  };
};

export default handler;
