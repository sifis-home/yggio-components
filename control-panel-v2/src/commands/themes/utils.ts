/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';

const transformBase64StringToBinary = (base64string: string) => {
  // Convert to binary data for mongodb
  const split = _.split(base64string, ',');
  const [, str] = split;
  const logoData = Buffer.from(str, 'base64');
  return logoData;
};

const transformBinaryToBase64String = (fileType: string, data: Buffer): string => {
  return `data:${fileType};base64,${data.toString('base64')}`;
};

export {
  transformBase64StringToBinary,
  transformBinaryToBase64String,
};
