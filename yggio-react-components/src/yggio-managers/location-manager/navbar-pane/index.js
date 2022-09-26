/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {compose} from 'lodash/fp';
import React from 'react';
import PropTypes from 'prop-types';
import {ROUTES} from '../constants';

import {
  withYggio,
} from '../../../yggio-context';

import Navbar from '../../../yggio-components/navbar';

// /////
// The BasicNavbarPane - uses only fully processed data
// /////

const BasicNavbarPane = (props) => (
  <Navbar
    title="Location Manager"
    centered={false}
    user={props.user}
    links={[
      {name: 'Locations', url: ROUTES.basePath},
      {name: 'New', url: ROUTES.locationCreator},
    ]}
  />
);

BasicNavbarPane.propTypes = {
  // from yggio
  user: PropTypes.object,
};

// /////
// NavbarPane - fully yggio connected
// /////

// and yggio
const yggio = {
  mapYggioStateToProps: yggioState => ({
    user: yggioState.database.auth.user,
  }),
  mapYggioActionsToProps: yggioActions => ({
  }),
};

const NavbarPane = compose(
  withYggio(yggio),
)(BasicNavbarPane);

NavbarPane.propTypes = {
  // nothing from top
};


// /////
// exports
// /////

export default NavbarPane;
export {
  BasicNavbarPane,
};
