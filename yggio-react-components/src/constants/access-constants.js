const ACCESS_RESOURCE_GROUP_TYPES = {
  // structural (automatically administrated through AccessEngine.api)
  global: 'global', // the global group - every resource is included
  public: 'public', // the public group - only member management should be user-controllable
  singleton: 'singleton', // every resource maps onto a singleton group
  owner: 'owner', // every resource is inherently owned by some user (every user has one of these groups)
  // yggio oriniated
  group: 'group', // yggio user-group associated
  orgUnit: 'orgUnit', // yggio organization.unit associated
};

export {
  ACCESS_RESOURCE_GROUP_TYPES,
};
