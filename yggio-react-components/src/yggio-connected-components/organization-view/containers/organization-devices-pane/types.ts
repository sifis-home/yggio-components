interface SourceInfo {
  owner: boolean;
  'public': string;
  global: string;
  orgUnit: {
    unitName: string;
    unitId: string;
  };
  user: string;
  userGroup: string;
  group: string;
  singleton: string;
}

export type {
  SourceInfo,
};
