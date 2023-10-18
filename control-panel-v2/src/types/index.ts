import {JwtPayload} from 'jsonwebtoken';

import type {NextApiRequest} from 'next';
import type {View, ViewQuery} from 'yggio-react-components';

import {REQUEST_METHODS} from '../constants';

import type {ThemeQuery, ThemeBody} from './themes';
import type {RuleButtonQuery, RuleButton} from './rule-buttons';

export * from './rule-buttons';
export * from './themes';

type Queries = ThemeQuery | RuleButtonQuery | ViewQuery;
type Bodies = ThemeBody | RuleButton | View;
type User = JwtPayload['sub'];

interface Config {
  mongo: {
    uri: string;
    db: string;
  };
}

interface CommandData {
  user: User;
  authToken: string;
  query: Queries;
  data: Bodies;
}

interface CustomNextApiRequest<
  T extends object,
  U extends object
> extends NextApiRequest {
  method: keyof typeof REQUEST_METHODS;
  body: T;
  query: U;
  config: Config;
}

export type {
  CommandData,
  CustomNextApiRequest,

  Queries,
  Bodies,

  Config,
};
