import _ from 'lodash';
import {Locations, Location, IdKeyedLocations} from '../../types';

const selectLocationsData = (data: Locations) => (
  _.reduce(data, (acc: IdKeyedLocations, curr: Location) => {
    const i = curr._id;
    acc[i] = curr;
    return acc;
  }, {})
);

export {
  selectLocationsData,
};
