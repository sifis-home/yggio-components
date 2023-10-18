import _ from 'lodash';
import {createSelector} from 'reselect';
import {Organizations, User} from '../../types';

const selectUserOrganization = createSelector(
  (props: {user: User | undefined}) => props.user,
  (props: {organizations: Organizations | undefined}) => props.organizations,
  (user, organizations) => {
    const userOrgId = _.get(user, 'organization');
    if (!userOrgId) {
      // sort or something?
      return _.map(organizations, organization => organization);
    }
    if (userOrgId) {
      const organization = _.find(organizations, org => org._id === userOrgId);
      return organization ? [organization] : [];
    }
  },
);

export {
  selectUserOrganization,
};
