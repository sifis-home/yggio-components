import type {NextApiResponse} from 'next';

import {init} from '../../../db';

import type {CustomNextApiRequest} from '../../../types';

const handler = async (
  req: CustomNextApiRequest<object, object>,
  res: NextApiResponse,
) => {
  // disable cache to always show up to date response
  res.setHeader('Cache-Control', 'no-store');
  // check db connection
  return await init(req.config)
    .then(() => res.status(200).json({healthy: true}))
    .catch(() => res.status(500).json({healthy: false}));
};

export default handler;
