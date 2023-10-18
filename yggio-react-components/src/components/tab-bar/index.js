import React from 'react';
import PropTypes from 'prop-types';
import {map} from 'lodash';

import {
  Tab,
} from './components';

import {
  TabsContainer,
} from './styled';


const isActiveTab = (activeTab, tabId, index) => {
  if (tabId === activeTab) {
    return true;
  }
  if (!activeTab && index === 0) {
    return true;
  }
  return false;
};

const TabBar = props => (
  <TabsContainer {...props}>

    {map(props.tabItems, (tabItem, index) => (
      <Tab
        fontSize={props.fontSize}
        vertical={props.vertical}
        key={tabItem.tabId}
        isActive={isActiveTab(props.activeTab, tabItem.tabId, index)}
        onTabClick={props.setActiveTab}
        {...tabItem}
      />
    ))}

  </TabsContainer>
);

TabBar.propTypes = {
  tabItems: PropTypes.arrayOf(PropTypes.shape({
    tabId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.string,
  })).isRequired,
  setActiveTab: PropTypes.func.isRequired,
  activeTab: PropTypes.string,
};

export default TabBar;
