import type {AppTypes} from 'yggio-models';

type AppMetadata = {
  metadata: {
    softwareQuality?: number,
    owner: {
      login: string;
    }
  }
};

type App = AppTypes.AppWithId & AppMetadata;

export type {
  App,
};
