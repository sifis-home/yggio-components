import z from 'zod';

import {themeCreationSchema, themeSchema} from '../commands/themes/validation';

type Theme = z.infer<typeof themeSchema>;
type ThemeBody = z.infer<typeof themeCreationSchema>;

interface ThemeQuery {
  _id: string;
  orgId: string;
  owner: string;
}

export type {
  Theme,
  ThemeQuery,
  ThemeBody,
};
