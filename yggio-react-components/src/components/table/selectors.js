import {slice, compose, values} from 'lodash/fp';

const selectPaginatedData = ({items, pageSize, currentPage}) => {
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex - pageSize;

  return compose(
    slice(endIndex, startIndex),
    values,
  )(items);
};

export {
  selectPaginatedData,
};
