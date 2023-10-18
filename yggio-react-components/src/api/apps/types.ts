interface FetchProps {
  limit?: number;
  orderBy?: string;
  matchPattern?: object;
  cursorId?: string | null;
  cursorDirection?: string | null;
}

export type {
  FetchProps,
};
