interface Field {
  name: string;
}

type AvailableFields = Record<string, string[]>;

export type {
  Field,
  AvailableFields,
};
