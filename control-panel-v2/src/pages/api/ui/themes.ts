/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';

import type {NextApiResponse} from 'next';

import {REQUEST_METHODS} from '../../../constants';
import dbHandler from '../../../commands';
import {handleAPIErrors} from '../../../utils';

import type {CustomNextApiRequest, ThemeQuery, ThemeBody} from '../../../types';

const handler = async (
  req: CustomNextApiRequest<ThemeBody, ThemeQuery>,
  res: NextApiResponse,
) => {
  const method = _.toLower(req.method) as keyof typeof REQUEST_METHODS;
  const authToken = req.headers.authorization;
  const [, token] = _.split(authToken, ' ');

  if (!token) {
    return res.status(401).send('Auth error');
  }

  const collectionHandler = await dbHandler({
    authToken: token,
    queryCommand: 'themes',
    config: req.config,
  });

  switch (method) {
    case REQUEST_METHODS.get: {
      try {
        const response = await collectionHandler({
          method,
          data: req.body,
          query: req.query,
        });
        return res.status(200).json(response);
      } catch (err) {
        if (err instanceof Error) {
          const error = handleAPIErrors(err);
          return res.status(error.status).send(error.message);
        }
        return res.status(500);
      }
    }

    case REQUEST_METHODS.post: {
      try {
        const response = await collectionHandler({
          method,
          data: req.body,
          query: req.query,
        });
        return res.status(200).json(response);
      } catch (err) {
        if (err instanceof Error) {
          const error = handleAPIErrors(err);
          return res.status(error.status).send(error.message);
        }
        return res.status(500);
      }
    }

    case REQUEST_METHODS.put: {
      try {
        const response = await collectionHandler({
          method,
          data: req.body,
          query: req.query,
        });
        return res.status(200).json(response);
      } catch (err) {
        if (err instanceof Error) {
          const error = handleAPIErrors(err);
          return res.status(error.status).send(error.message);
        }
        return res.status(500);
      }
    }

    case REQUEST_METHODS.delete: {
      try {
        await collectionHandler({
          method,
          data: req.body,
          query: req.query,
        });
        return res.status(201).json({deleted: true});
      } catch (err) {
        if (err instanceof Error) {
          const error = handleAPIErrors(err);
          return res.status(error.status).send(error.message);
        }
        return res.status(500);
      }
    }

    default:
      return res.status(404);
  }
};

export default handler;
