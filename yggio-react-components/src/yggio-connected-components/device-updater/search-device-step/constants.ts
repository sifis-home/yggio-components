/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

enum PARAMETERS {
  name = 'name',
  devEui = 'devEui',
  secret = 'secret',
  mac = 'mac',
  imei = 'imei',
}

const PARAMETER_OPTIONS = [
  {value: PARAMETERS.name, label: 'Name'},
  {value: PARAMETERS.devEui, label: 'DevEUI'},
  {value: PARAMETERS.secret, label: 'Secret'},
  {value: PARAMETERS.mac, label: 'MAC'},
  {value: PARAMETERS.imei, label: 'IMEI'},
];

export {
  PARAMETERS,
  PARAMETER_OPTIONS,
};
