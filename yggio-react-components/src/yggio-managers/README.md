# Yggio Managers
Yggio managers are web applications in yggio.

#### Examples
Examples on how to build a yggio manager.

Project structure example:

```
/device-manager
  /list-pane
  /details-pane <br/>
    /details-pane.stories.js - storybook file 
    /constants.ts - local constants 
    /effects.js - react effects 
    /events.js - your events 
    /selectors.ts - your selectors
    /state.js - local state
    /styled.js - all styled components goes here
    /sub-components.js - sub components of this pane goes here, can also be a folder if grows big
    /index.ts - the base component 
```

Project code examples:
```js
// details-pane/index.ts

import _ from 'lodash';
import {compose} from 'lodash/fp';
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button';
import {withYggio} from '../../../yggio-context';
import {FlexColMaxWidthWrapper} from '../../../global/styled';
import events from './events';
import selectors from './selectors';
import {withReselect, withEvents, withState} from '../../../hocs';
import {formState} from './state';

const BasicDetailsPane = props => {
  return (
    <FlexColMaxWidthWrapper>
      {props.deviceDisplayed && (
        <div> Hi, welcome to {props.deviceItem.name}</div>
      )}
      
      Click to display:
      <Button onClick={displayDevice}>Click</Button>
    </FlexColMaxWidthWrapper>
  );
}

BasicDetailsPane.propTypes = {
  deviceItem: PropTypes.object,
  displayDevice: PropTypes.func,
  deviceDisplayed: PropTypes.bool,

  device: PropTypes.object,
  devices: PropTypes.object,
  fetchDevice: PropTypes.func,
  fetchDevices: PropTypes.func,
};
BasicDetailsPane.defaultProps = {};

const RawDetailsPane = compose(
  withReselect(selectors),
  withEvents(events),
  withState(formState)
)(BasicDetailsPane);

RawDetailsPane.propTypes = {
  deviceItem: PropTypes.object,
  displayDevice: PropTypes.func,
  deviceDisplayed: PropTypes.bool,
  
  device: PropTypes.object,
  devices: PropTypes.object,
  fetchDevice: PropTypes.func,
  fetchDevices: PropTypes.func,
};

const yggio = {
  mapYggioStateToProps: yggioState => ({
    device: yggioState.apiState.devices.get, // doesnt use cache
    devices: yggioState.database.devices, // uses cache
  }),
  mapYggioActionsToProps: yggioActions => ({
    fetchDevice: yggioActions.apiState.devices.get, // fetches device
    fetchDevices: yggioActions.database.devices.fetchDevices, // fetches devices to cache
  }),
};

const DetailsPane = compose(
  withYggio(yggio),
)(RawDetailsPane);

DetailsPane.propTypes = {
  device: PropTypes.object,
  devices: PropTypes.object,
  fetchDevice: PropTypes.func,
  fetchDevices: PropTypes.func,
};

export default DetailsPane;
export {
  RawDetailsPane,
};

```
