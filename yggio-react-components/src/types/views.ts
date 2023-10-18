import z from 'zod';

import {
  viewSchema,
  viewType,
  viewUpdateSchema,
  viewCreationSchema,
  columnViewSchema,
  deviceListViewSchema,
} from '../schemas/views';
import {VIEW_TYPES} from '../constants';

type View = z.infer<typeof viewSchema>;
type ViewType = z.infer<typeof viewType>;
type ViewCreation = z.infer<typeof viewCreationSchema>;
type ViewUpdate = {
  data: z.infer<typeof viewUpdateSchema>;
  type?: keyof typeof VIEW_TYPES;
};
type ViewColumn = z.infer<typeof columnViewSchema>;
type ViewDeviceList = z.infer<typeof deviceListViewSchema>;
type ViewIdQuery = {
  _id: string;
};

type ViewUpdateQuery = ViewUpdate & ViewIdQuery;

interface ViewQuery {
  _id?: string;
  orgId?: string;
  type: ViewType;
}

interface ViewQueries {
  _id?: string;
  orgIds?: string[];
  type: ViewType;
}

export type {
  View,
  ViewQuery,
  ViewCreation,
  ViewUpdate,
  ViewUpdateQuery,
  ViewColumn,
  ViewDeviceList,
  ViewIdQuery,
  ViewQueries,
};
