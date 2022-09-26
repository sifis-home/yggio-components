/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// // Shared
import NavbarPane from './yggio-connected-components/navbar-pane';
import UnauthorizedUserPane from './yggio-connected-components/unauthenticated-user-pane';
import YggioTokenMonitor from './yggio-context/yggio-token-monitor';
import withYggio from './yggio-context/with-yggio';
import {WebSocket} from './api';
import {YggioMessageToaster} from './yggio-context';
import LogoSpinner from './components/logo-spinner';
import withChakraProvider from './hocs/with-chakra-provider';

// Dashboard
import Dashboard from './yggio-connected-components/dashboard-pane';

// Apps
import Apps from './yggio-connected-components/apps-pane';
import App from './yggio-connected-components/app-pane';

// // Devices
import DeviceList from './yggio-connected-components/device-list-pane';
import DeviceView from './yggio-connected-components/device-view-pane';
import ModeSelection from './yggio-managers/device-installation-manager/mode-selection-pane';
import SingleInstallation from './yggio-managers/device-installation-manager/single-mode-route';
import BatchInstallation from './yggio-managers/device-installation-manager/batch-mode-route';

// Locations
import Locations from './yggio-managers/location-manager/locations';
import LocationCreator from './yggio-managers/location-manager/location-creator';
import LocationView from './yggio-managers/location-manager/location';
import LocationEditor from './yggio-managers/location-manager/location-editor';
import LayerCreator from './yggio-managers/location-manager/layer-creator';
import LayerEditor from './yggio-managers/location-manager/layer-editor';

// Organizations
import OrganizationsList from './yggio-managers/organization-manager/organizations-list-pane';
import CreateOrganization from './yggio-managers/organization-manager/organization-view/containers/create-organization-pane';
import EditOrganization from './yggio-managers/organization-manager/organization-view/containers/edit-organization-pane';
import CreateOrganizationMember from './yggio-managers/organization-manager/organization-view/containers/create-member-pane';
import OrganizationView from './yggio-managers/organization-manager/organization-view';
import OrganizationUnit from './yggio-managers/organization-manager/organization-unit';

// Charts
import ChartsPane from './yggio-connected-components/charts-pane';

// Device Updater
import DeviceUpdater from './yggio-connected-components/device-updater';

// Config
import {setConfig} from './yggio-config';

// API
import {withQueryClientProvider} from './hocs';

export {
  // Config
  setConfig,

  // Dashboard
  Dashboard,

  // Apps
  Apps,
  App,

  // // Devices
  DeviceList,
  DeviceView,
  ModeSelection,
  SingleInstallation,
  BatchInstallation,

  // Locations
  Locations,
  LocationCreator,
  LocationView,
  LocationEditor,
  LayerCreator,
  LayerEditor,

  // Organizations
  OrganizationsList,
  CreateOrganization,
  EditOrganization,
  CreateOrganizationMember,
  OrganizationView,
  OrganizationUnit,

  // Charts
  ChartsPane,

  DeviceUpdater,

  //
  // // Shared,
  NavbarPane,
  UnauthorizedUserPane,
  YggioTokenMonitor,
  YggioMessageToaster,
  withYggio,
  WebSocket,
  LogoSpinner,
  withChakraProvider,

  // API
  withQueryClientProvider,
};
