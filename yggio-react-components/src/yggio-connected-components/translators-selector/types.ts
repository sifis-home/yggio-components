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
