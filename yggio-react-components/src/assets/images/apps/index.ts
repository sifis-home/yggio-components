/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import nodeRed from './node-red';
import grafana from './grafana';
import ruleEngine from './rule-engine';
import locationManager from './location-manager';
import stripsConfig from './strips-config';
import controlPanelV1 from './control-panel-v1';
import citygrid from './citygrid';
import qrlio from './qrlio';
import terminio from './terminio';
import leanheat from './leanheat';
import powerBi from './power-bi';
import smartVisualizer from './smart-visualizer';
import deviceUpdater from './device-updater';
import noodl from './noodl';

export default {
  nodeRed,
  grafana,
  ruleEngine,
  locationManager,
  stripsConfig,
  controlPanelV1,
  citygrid,
  qrlio,
  terminio,
  leanheat,
  powerBi,
  smartVisualizer,
  deviceUpdater,
  noodl,
};
