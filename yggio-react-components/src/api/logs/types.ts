import {LogTypes} from 'yggio-models';

interface FetchedLog extends Omit<LogTypes.LogWithIdAndResourceName, 'createdAt'> {
  createdAt: string;
}

export type {
  FetchedLog,
};
