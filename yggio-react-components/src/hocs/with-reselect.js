import React from 'react';
import _ from 'lodash';

/*
  THIS HOC IS DEPRICATED!!!
*/


const withReselect = (reselectors, {consume} = {}) => Component => {
  const WrappedComponent = props => {
    const survivingProps = _.omit(props, _.concat([], consume));
    const reselectedProps = _.mapValues(reselectors, reselect => {
      return reselect(props);
    });
    return (<Component
      {...survivingProps}
      {...reselectedProps}
            />);
  };

  return WrappedComponent;
};

export default withReselect;
