interface ViewsQuery {
  type: string;
  orgId?: string;
}

interface ViewCreation {
  data: {
    orgId: string;
    name: string;
    type: string;
    data: Record<string, string>;
  }
}

interface ViewUpdate {
  _id: string;
  data: Partial<{
    orgId: string;
    name: string;
    data: Record<string, string>;
  }>;
}

interface ViewDeletion {
  _id: string;
}

export type {
  ViewsQuery,
  ViewCreation,
  ViewUpdate,
  ViewDeletion,
};
