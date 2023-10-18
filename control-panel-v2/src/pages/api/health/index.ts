/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
