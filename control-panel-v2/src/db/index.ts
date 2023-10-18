/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {MongoClient, Collection, Db} from 'mongodb';
import {logger} from 'yggio-logger';

import {COLLECTION_NAMES} from '../constants';

import type {Config} from '../types';

const SERVER_SELECTION_TIMEOUT_MS = 10000;

let db: Db;

type Clients = {
  [key: string]: Collection | null,
};

const clients: Clients = {
  [COLLECTION_NAMES.themes]: null,
  [COLLECTION_NAMES.ruleButtons]: null,
  [COLLECTION_NAMES.views]: null,
};

const init = async (config: Config) => {
  if (!config) {
    throw new Error('MongoDB config not found');
  }

  const client = new MongoClient(
    config.mongo.uri,
    {serverSelectionTimeoutMS: SERVER_SELECTION_TIMEOUT_MS}
  );

  if (!db) {
    logger.info('Database not connected. Connecting..');
    await client.connect()
      .catch((err: Error) => {
        throw new Error(err.message);
      });
    logger.info('Successfully connected to MongoDB');
    db = client.db(config.mongo.db);
  }

  logger.info('Checking for collections..', _.keys(clients));
  const collections = await db
    .listCollections()
    .toArray();

  const collectionNames = _.map(collections, 'name');

  const collectionCreations = _.map(clients, async (collection, key) => {
    if (!_.includes(collectionNames, key)) {
      logger.info(`${key} collection not found, creating..`);
      await db.createCollection(key);
      logger.info('Successfully created collection');
    }
    logger.info(`${key} collection found, no action taken`);
  });
  await Promise.all(collectionCreations);
  logger.info('Successfully created collection');

  const themesCollection = db.collection(COLLECTION_NAMES.themes);
  await themesCollection.dropIndexes();
  await themesCollection.createIndex({orgId: 1}, {unique: true});
  clients[COLLECTION_NAMES.themes] = themesCollection;

  const rulesCollection = db.collection(COLLECTION_NAMES.ruleButtons);
  clients[COLLECTION_NAMES.ruleButtons] = rulesCollection;

  const viewsCollection = db.collection(COLLECTION_NAMES.views);
  clients[COLLECTION_NAMES.views] = viewsCollection;

  return clients;
};

export {
  init,
};
