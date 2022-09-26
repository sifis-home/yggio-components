/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
interface AddedDevice {
  id: string;
  name: string;
}

interface Field {
  name: string;
}

type AvailableFields = Record<string, string[]>;

export {
  AddedDevice,
  Field,
  AvailableFields,
};
