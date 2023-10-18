import _ from 'lodash';

const objectToQueryString = params => {
  if (!params) return '';
  const array = _.map(params, (v, k) => {
    return _([k, v]).map(encodeURIComponent).join('=');
  });
  return `?${_.join(array, '&')}`;
};

export default objectToQueryString;
