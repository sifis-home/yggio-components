import React from 'react';
import _ from 'lodash';
import {SIDEBAR_WIDTH} from './constants';

// This one forces the sidebar to open if it
// has been previously closed and the user then widen the window
const withOpenSidebarOnResize = Component => {
  const OpenSidebarOnResize = props => {
    React.useEffect(() => {
      const debouncedHandleResize = _.debounce(() => {
        const width = props.siblingWidth + SIDEBAR_WIDTH;
        if (!props.isSidebarOpen && window.innerWidth > width) {
          props.openSidebar();
        }
      }, 200);
      window.addEventListener('resize', debouncedHandleResize);
      return () => {
        window.removeEventListener('resize', debouncedHandleResize);
      };
    });
    return <Component {...props} />;
  };
  return OpenSidebarOnResize;
};

export {
  withOpenSidebarOnResize,
};
