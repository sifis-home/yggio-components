import {
  viewCreationSchema,
  viewUpdateSchema,
  ownerIdSchema,
} from 'yggio-react-components';

import type {View, ViewUpdate} from 'yggio-react-components';

const validateViewCreationData = (view: Omit<View, '_id'>) => {
  const parsed = viewCreationSchema.parse(view);
  return parsed;
};

const validateViewUpdateData = (view: ViewUpdate['data']) => {
  const parsed = viewUpdateSchema.parse(view);
  return parsed;
};

const validateOwnerId = (ownerId: string) => {
  const parsed = ownerIdSchema.parse(ownerId);
  return parsed;
};

export {
  validateViewCreationData,
  validateViewUpdateData,
  validateOwnerId,
};
