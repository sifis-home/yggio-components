/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {TranslatorPreferenceUpgradePolicy} from '../../types';

interface GroupedTranslator {
  name: string;
  userId: string;
  identifier: string;
  username: string;
  versions: string[];
  isAdded?: boolean;
}

interface FormattedTranslatorPreference {
  name: string;
  identifier: string;
  username: string;
  version: string;
  upgradePolicy: TranslatorPreferenceUpgradePolicy;
  availableVersions?: string[];
}

enum TranslatorsSelectorPage {
  list = 'list',
  add = 'add',
  help = 'help',
}

export {
  TranslatorsSelectorPage,
};
export type {
  GroupedTranslator,
  FormattedTranslatorPreference,
};
