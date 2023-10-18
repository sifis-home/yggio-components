import {ScopeItem} from '../../types';

const ACCESS_RIGHT_TYPES: Record<ScopeItem, ScopeItem> = {
  admin: 'admin',
  write: 'write',
  read: 'read',
  peek: 'peek',
};

export {
  ACCESS_RIGHT_TYPES,
};
