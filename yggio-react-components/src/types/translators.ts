/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

interface Translator {
  _id: string;
  name: string;
  description: string;
  userId: string;
  version: string;
  apiVersion: string;
}

type Translators = Translator[];
type IdKeyedTranslators = {[_id: string]: Translator};

export type {
  Translator,
  Translators,
  IdKeyedTranslators,
};
