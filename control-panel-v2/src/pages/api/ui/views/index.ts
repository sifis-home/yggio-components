import _ from 'lodash';

import type {ViewQuery, View} from 'yggio-react-components';
import type {NextApiResponse} from 'next';

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
    case REQUEST_METHODS.get: {
      try {
        const response = await collectionHandler({
          method,
          data: req.body,
          query: req.query,
        });
        return res
          .status(200)
          .json(response);
      } catch (err) {
        const error = handleAPIErrors(err);
        return res
          .status(error.status)
          .send(error.message);
      }
    }

    case REQUEST_METHODS.post: {
      try {
        const response = await collectionHandler({
          method,
          data: req.body,
          query: req.query,
        });
        return res
          .status(201)
          .json(response);
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
