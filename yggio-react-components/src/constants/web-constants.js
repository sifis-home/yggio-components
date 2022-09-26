/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const LEAFLET_ATTRIBUTION = `
&copy;
<a href="http://osm.org/copyright">
  OpenStreetMap
</a>
contributors
`;

const LEAFLET_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const COOKIE_TOKEN_KEY = 'token';
const COOKIE_OAUTH_STATE_KEY = 'OAuthState';

export {
  LEAFLET_URL,
  LEAFLET_ATTRIBUTION,
  COOKIE_TOKEN_KEY,
  COOKIE_OAUTH_STATE_KEY,
};
