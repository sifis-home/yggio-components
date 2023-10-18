import _ from 'lodash';
import {Calculations, IdKeyedCalculations, Calculation} from '../../types';

const selectCalculationData = (data: Calculations) => (
  _.reduce(data, (acc: IdKeyedCalculations, curr: Calculation) => {
    const i = curr._id;
    acc[i] = curr;
    return acc;
  }, {})
);

export {
  selectCalculationData,
};
