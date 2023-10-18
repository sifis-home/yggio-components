/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import './i18n';

import {Toaster} from 'react-hot-toast';
import {WebSocket} from './api';
import {withQueryClientProvider, withChakraProvider} from './hocs';
import {setConfig} from './yggio-config';

// Components
import LogoSpinner from './components/logo-spinner';

// Yggio connected components
import NavbarPane from './yggio-connected-components/navbar-pane';
import UnauthorizedUserPane from './yggio-connected-components/unauthenticated-user-pane';
import DashboardPane from './yggio-connected-components/dashboard-pane';
import AppCreator from './yggio-connected-components/app-creator';
import AppEditor from './yggio-connected-components/app-editor';
import AppsPane from './yggio-connected-components/apps-pane';
import AppStorePane from './yggio-connected-components/app-store-pane';
import AppPane from './yggio-connected-components/app-pane';
import DeviceListPane from './yggio-connected-components/device-list-pane';
import DeviceViewPane from './yggio-connected-components/device-view-pane';
import ModeSelectionPane from './yggio-managers/device-installation-manager/mode-selection-pane';
import SingleModeRoute from './yggio-managers/device-installation-manager/single-mode-route';
import BatchModeRoute from './yggio-managers/device-installation-manager/batch-mode-route';
import OrganizationsListPane from './yggio-connected-components/organizations-list-pane';
import CreateOrganizationPane from './yggio-connected-components/organization-view/containers/create-organization-pane';
import CreateMemberPane from './yggio-connected-components/organization-view/containers/create-member-pane';
import OrganizationView from './yggio-connected-components/organization-view';
import OrganizationUnitPane from './yggio-connected-components/organization-unit';
import ChartsPane from './yggio-connected-components/charts-pane';
import LogsPane from './yggio-connected-components/logs-pane';
import DeviceUpdater from './yggio-connected-components/device-updater';

export * from './types';
export * from './schemas';

export {
  Toaster,
  WebSocket,
  withQueryClientProvider,
  withChakraProvider,
  setConfig,
  LogoSpinner,
  NavbarPane,
  UnauthorizedUserPane,
  DashboardPane,
  AppCreator,
  AppEditor,
  AppsPane,
  AppStorePane,
  AppPane,
  DeviceListPane,
  DeviceViewPane,
  ModeSelectionPane,
  SingleModeRoute,
  BatchModeRoute,
  OrganizationsListPane,
  CreateOrganizationPane,
  CreateMemberPane,
  OrganizationView,
  OrganizationUnitPane,
  ChartsPane,
  DeviceUpdater,
  LogsPane,
};
