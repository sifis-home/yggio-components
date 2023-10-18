import {Theme} from '../../../types';


interface ThemesQuery {
  orgId: string;
}

interface ThemeCreation {
  data: Theme;
}

interface ThemeUpdate {
  data: Theme;
}

interface ThemeDeletion {
  data: Partial<Theme>;
}

export type {
  ThemesQuery,
  ThemeCreation,
  ThemeUpdate,
  ThemeDeletion,
};
