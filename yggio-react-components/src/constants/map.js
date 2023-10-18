/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const MAP = {
  defaultCenter: [55.7, 13.2], // sweden
  defaultZoom: 4,
};

const GEO_ERROR_CODES = {
  permissionDenied: 1,
  positionUnavailabe: 2,
  timeOut: 3
};

export {
  MAP,
  GEO_ERROR_CODES
};
