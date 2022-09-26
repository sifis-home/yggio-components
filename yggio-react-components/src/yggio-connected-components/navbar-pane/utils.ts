/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import cookie from 'js-cookie';
import _ from 'lodash';

const removeAllCookies = () => {
  // @ts-ignore - Seemingly some kind of hack that ts don't like, but it works
  _(cookie.get(null))
    .keys()
    .map(cookie.remove)
    .value();
};

export {
  removeAllCookies,
};
