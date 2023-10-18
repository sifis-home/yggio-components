import _ from 'lodash';

const STEPS_NAMES = {
  confirmation: 'confirmation',
  summary: 'summary',
};

const STEPS = [
  {name: STEPS_NAMES.confirmation, progressBarTitle: _.capitalize(STEPS_NAMES.confirmation)},
  {name: STEPS_NAMES.summary, progressBarTitle: _.capitalize(STEPS_NAMES.summary)},
];

export {
  STEPS_NAMES,
  STEPS,
};
