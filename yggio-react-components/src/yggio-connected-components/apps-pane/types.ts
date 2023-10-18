import type {AppTypes} from 'yggio-models';
import type {App} from '../../types';

interface CategorizedApps {
  yggioApps: App[];
  staticApps: App[];
}

type AppUnion = App & AppTypes.AppWithId & {metadata: {softwareQuality?: number}};

export type {
  CategorizedApps,
  AppUnion,
};
