# Yggio Context
Yggio context is a way to connect yggio state and actions to your components.

#### Examples
Examples on how to use yggio context.

Code examples:
```js
import _ from 'lodash';
import {compose} from 'lodash/fp';
import React from 'react';

import {withYggio} from '../../../yggio-context';

const BasicDetailsPane = props => {
  return (
    <div>
      <div> Hi, welcome to {props.device.res.name}</div>
      
      List:
      {_.map(props.devices, device => (
          <div>{device.name}</div>
      ))}
    </div>
  );
}

const yggio = {
  mapYggioStateToProps: yggioState => ({
    device: yggioState.apiState.devices.get, // doesnt use cache and returns object for example: {res: {name: 'device1'}, err: null, isLoading: false}
    devices: yggioState.database.devices, // uses yggio data cache
  }),
  mapYggioActionsToProps: yggioActions => ({
    fetchDevice: yggioActions.apiState.devices.get, // fetches device
    fetchDevices: yggioActions.database.devices.fetchDevices, // fetches devices to cache
  }),
};

const DetailsPane = compose(
  withYggio(yggio),
)(BasicDetailsPane);
```
