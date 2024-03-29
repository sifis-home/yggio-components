﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import images from '../assets/images/apps';
import {App} from '../types';
import {getExternalUrls} from './external-app-urls';

const APP_TAGS = {
  visualization: 'Visualization',
  automation: 'Automation',
  hardware: 'Hardware',
  analytics: 'Analytics',
  qr: 'QR',
  assetTracking: 'Asset tracking',
  streetLighting: 'Street lighting',
  ai: 'AI',
  energy: 'Energy',
  reports: 'Reports',
  rules: 'Rules',
  '3d': '3D',
  digitalTwin: 'Digital twin',
};

// Apps to add:
// Siemens Desigo CC, Dele Health, Seneco City Grid, InfraControl,
// Applio Sense, Homey, Zipato, Yabado, Intuitive, Abiro, CTS iCPE Zwave, Fast API

const getStaticApps = (): App[] => [
  {
    id: '2acfb196-f3c6-4a83-8015-7fb31ebdb301',
    name: 'Grafana',
    tagline: 'Web application for analytics and interactive visualization',
    images: images.grafana,
    tags: [APP_TAGS.visualization, APP_TAGS.analytics],
    demoUrl: 'https://play.grafana.org/',
  },
  {
    id: '57cf4076-51b1-46c0-96f9-fe60401ff302',
    name: 'Node Red',
    tagline: 'Flow-based development tool for visual programming',
    tags: [APP_TAGS.automation, APP_TAGS.rules],
    images: images.nodeRed,
    url: 'https://public.yggio.net/docs/mqtt/',
    description: 'Node-RED is a programming tool for wiring together hardware devices, APIs and online services in new and interesting ways. It provides a browser-based editor that makes it easy to wire together flows using the wide range of nodes in the palette that can be deployed to its runtime in a single-click. With the Node-RED dashboard module it is also feasible to build beautiful dashboards and even HMI – Human machine interfaces. To use Node-RED with Yggio just install Node-RED on a suitable computer and then use the standard network modules “MQTT IN” and “MQTT OUT” and connect to Yggio’s MQTT broker as a data provider respectively data consumer. Then it is just to start creating flows and dashboards with live Yggio data sets.',
  },
  {
    id: '57cf4076-51b1-46c0-96f9-fe60401ff303',
    name: 'Citygrid',
    tagline: 'Motion based street lighting control',
    tags: [APP_TAGS.streetLighting],
    images: images.citygrid,
    url: 'https://citygrid.dk',
    support: 'info@seneco.dk',
    description: 'Citygrid street lighting control enables a safe and pleasant travelling experience for road users while saving energy. At the heart of the concept is motion detection, making the street luminaires truly intelligent by dimming up the light ahead when detecting a pedestrian, cyclist or car. The light intensity can thus be kept low while roads are empty, while maintaining a proper and safe light level for road users when needed. Data from the luminaires can be viewed in the online dashboard and the luminaires can be reconfigured in the dashboards Light Management System.',
  },
  {
    id: '57cf4076-51b1-46c0-96f9-fe60401ff304',
    name: 'Qrlio',
    tagline: 'Smart solutions for tracking via QR codes or NFC',
    tags: [APP_TAGS.qr, APP_TAGS.assetTracking],
    url: 'https://qrlio.com',
    images: images.qrlio,
    support: 'info@qrlio.com',
    description: 'Qrlio.com allows you to track your assets with QR codes or NFC tags. We deliver either digitally for your own production, or as physical labels or NFC tags. Contact us for a price idea. The system also allows direct access into Yggio to read out, for example, sensor values or log events in real time. You configure yourself in a simple way how the application is integrated with your other services for the best possible user experience - both for your employees and for the general public.',
  },
  {
    id: '57cf4076-51b1-46c0-96f9-fe60401ff305',
    name: 'Terminio',
    tagline: 'Flexible visualization of real-time data from Yggio and other services',
    tags: [APP_TAGS.visualization],
    url: 'https://terminio.se',
    images: images.terminio,
    support: 'info@rutio.se',
    description: 'IoT data becomes more fun when visualized in real time at the right place. Everything from the sign that shows what is being measured to the concrete solution to limit the number of people in a room. Terminio.se is a service that conveys IoT data quickly and efficiently on your screen - either as a web component for integration into your existing screen solution or via our specially adapted and preconfigured hardware with HDMI connector and WiFi or LAN cable. Rutio also provides services for creating layouts and verifying your particular display solution.',
  },
  {
    id: '57cf4076-51b1-46c0-96f9-fe60401ff306',
    name: 'Danfoss Leanheat® Building',
    tagline: 'AI-optimized heating control and maintenance',
    tags: [APP_TAGS.ai, APP_TAGS.energy],
    url: 'http://leanheat.danfoss.com',
    images: images.leanheat,
    support: 'Maria Gihlström, Sales Manager PBO, maria.gihlstrom@danfoss.com, +46104400257 | Henrik Johansson, Sales Manager DHU, henrik.johansson@danfoss.com, +46104400255',
    description: 'Leanheat® Building is a software solution to optimize the heating system of centrally heated multi-family buildings. Fully automated and self-learning, The system provides real-time optimization, not only for individual buildings, but for entire clusters of apartment buildings. Leanheat® Building collects data from sources inside and outside the building and enables monitoring, data analysis and remote-controlled adjustment of parameters. Danfoss Leanheat® offers a portfolio of revolutionary end-to-end software systems and services for the control and optimization of district energy systems - from plants and distribution to buildings and homes.',
  },
  {
    id: '57cf4076-51b1-46c0-96f9-fe60401ff307',
    name: 'Power BI',
    tagline: 'Use Yggio data sets with Power BI for advanced analysis and reports',
    tags: [APP_TAGS.reports, APP_TAGS.analytics, APP_TAGS.visualization],
    url: 'https://public.yggio.net/docs/power-bi/',
    images: images.powerBi,
    description: 'The Sensative Yggio connector for Microsoft Power BI Desktop enables the user in a fast and easy way to get data directly from an Yggio account into Power BI desktop for advanced analysis. Doing analyze of the data and creating reports like the example screen shots and many other types will be done in just a few minutes after some training.',
  },
  {
    id: '57cf4076-51b1-46c0-96f9-fe60401ff308',
    name: 'Smart Visualizer',
    tagline: '3D digital twin platform',
    tags: [APP_TAGS['3d'], APP_TAGS.digitalTwin],
    url: 'https://smartvisualizer.com/',
    support: 'info@smartvisualizer.com',
    images: images.smartVisualizer,
    description: 'Smart Visualizer provides a perfect Digital Twin platform for your smart city project – offering a complete platform for visualization, and a wide selection of tools and features related to the different phases of a project. These include: planning, analyzing, dynamic real-time analysis, collaboration, crowdsourcing, informing, sharing, and finally publishing your data and projects. Smart Visualizer integrates seamlessly with Yggio to provide live IoT data in 3D models.',
  },
  {
    id: '57cf4076-51b1-46c0-96f9-fe60401ff309',
    name: 'Noodl',
    tagline: 'Low code app development platform',
    tags: [APP_TAGS.automation, APP_TAGS.visualization],
    url: 'https://noodl.net/yggio',
    support: 'anders@noodl.net',
    images: images.noodl,
    description: 'Noodl is a next-gen low-code platform that accelerates development of web apps. A pre-integrated Yggio module + a number of templates makes development of Yggio based apps fast and cheap. If needed, Noodl also offers development and managed hosting of the app.',
    demoUrl: 'https://yggio-dashboard.noodl-demos.com/',
  },
];

const getYggioApps = (): App[] => [
  {
    id: '57cf4076-51b1-46c0-96f9-fe60401ff991',
    name: 'Rule Engine',
    tagline: 'Create rules to automate your Yggio',
    tags: [APP_TAGS.automation],
    images: images.ruleEngine,
    url: getExternalUrls().ruleEngine,
  },
  {
    id: '57cf4076-51b1-46c0-96f9-fe60401ff992',
    name: 'Location Manager',
    tagline: 'Place your Yggio devices on a map',
    tags: [APP_TAGS.visualization],
    images: images.locationManager,
    url: getExternalUrls().locationManager,
  },
  {
    id: '57cf4076-51b1-46c0-96f9-fe60401ff993',
    name: 'Strips LoRa Configuration',
    tagline: 'Downlink data generator for Strips LoRa',
    tags: [APP_TAGS.hardware],
    images: images.stripsConfig,
    url: getExternalUrls().stripsConfig,
  },
  {
    id: '57cf4076-51b1-46c0-96f9-fe60401ff994',
    name: 'Control Panel V1',
    tagline: 'Legacy control panel for Yggio',
    tags: [APP_TAGS.visualization],
    images: images.controlPanelV1,
    url: getExternalUrls().controlPanelV1,
  },
  {
    id: '57cf4076-51b1-46c0-96f9-fe60401ff995',
    name: 'Device Updater',
    tagline: 'Update device meta info on the go',
    tags: [APP_TAGS.visualization],
    images: images.deviceUpdater,
    url: getExternalUrls().deviceUpdater,
  },
  {
    id: '57cf4076-51b1-46c0-96f9-fe60401ff996',
    name: 'Strips Battery Calculator',
    tagline: 'Calculate approximate battery life for Strips',
    tags: [APP_TAGS.hardware],
    images: images.stripsConfig,
    url: getExternalUrls().stripsBatteryCalculator,
  },
];

export {
  APP_TAGS,
  getStaticApps,
  getYggioApps,
};
