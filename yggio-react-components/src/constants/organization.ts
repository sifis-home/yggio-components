const ORGANIZATION_ACCESS_TYPES = {
  DEVICES_READ: 'DEVICES_READ',
  DEVICES_WRITE: 'DEVICES_WRITE',
  DEVICES_PEEK: 'DEVICES_PEEK',
  MANAGE_ACCESS: 'MANAGE_ACCESS',
  EMPLACEMENT: 'EMPLACEMENT',
};

const ORG_TAB_ITEMS = {
  summary: 'summary',
  members: 'members',
  devices: 'devices',
  createMember: 'createMember',
  edit: 'edit',
} as const;

export {
  ORGANIZATION_ACCESS_TYPES,
  ORG_TAB_ITEMS,
};
