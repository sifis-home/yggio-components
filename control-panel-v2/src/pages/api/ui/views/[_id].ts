/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';

import type {NextApiResponse} from 'next';
import type {ViewQuery, View} from 'yggio-react-components';

import {REQUEST_METHODS} from '../../../../constants';
import {QUERY_COMMAND} from './constants';
import dbHandler from '../../../../commands';
import {handleAPIErrors} from '../../../../utils';

import type {CustomNextApiRequest} from '../../../../types';

const handler = async (
  req: CustomNextApiRequest<View, ViewQuery>,
  res: NextApiResponse,
) => {
  const method = _.toLower(req.method);
  const [, token] = _.split(req.headers.authorization, ' ');

  if (!token) {
    return res
      .status(401)
      .end();
  }

  const collectionHandler = await dbHandler({
    authToken: token,
    queryCommand: QUERY_COMMAND,
    config: req.config,
  });

  switch (method) {
    case REQUEST_METHODS.put: {
      try {
        const matchedCount = await collectionHandler({
          method,
          data: req.body,
          query: req.query,
        });

        if (!matchedCount) {
          return res
            .status(404)
            .end();
        }

        return res
          .status(204)
          .end();
      } catch (err) {
        const error = handleAPIErrors(err);
        return res
          .status(error.status)
          .send(error.message);
      }
    }

    case REQUEST_METHODS.delete: {
      try {
        const deletedCount = await collectionHandler({
          method,
          data: req.body,
          query: req.query,
        });

        if (!deletedCount) {
          return res
            .status(404)
            .end();
        }
        return res
          .status(200)
          .json({deleted: true});
      } catch (err) {
        const error = handleAPIErrors(err);
        return res
          .status(error.status)
          .send(error.message);
      }
    }

    default:
      return res
        .status(404)
        .end();
  }
};

export default handler;
