/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {thermometerHalf as thermometer} from 'react-icons-kit/fa/thermometerHalf';
import {signal} from 'react-icons-kit/fa/signal';
import {arrowUp} from 'react-icons-kit/fa/arrowUp';
import {info} from 'react-icons-kit/fa/info';
import {batteryThreeQuarters as battery} from 'react-icons-kit/fa/batteryThreeQuarters';
import {tint as raindrop} from 'react-icons-kit/fa/tint';
import {adjust} from 'react-icons-kit/fa/adjust';

const MEASUREMENT_TYPES = {
  temperature: 'temperature',
  humidity: 'humidity',
  battery: 'battery',
  snr: 'snr',
  rssi: 'rssi',
  moisture: 'moisture',
  luminance: 'luminance',
  gwMetaDataRssi: 'gwMetaData_rssi',
  gwMetaDataLoRaSNR: 'gwMetaData_loRaSNR',
  gwMetaDataPort: 'gwMetaData_port',
  gwMetaDataFrameCount: 'gwMetaData_frameCount',
};

const DEVICE_MEASUREMENTS = {
  [MEASUREMENT_TYPES.temperature]: {
    type: MEASUREMENT_TYPES.temperature,
    name: 'Temperature',
    unit: '°C',
    icon: thermometer,
  },
  [MEASUREMENT_TYPES.humidity]: {
    type: MEASUREMENT_TYPES.humidity,
    name: 'Humidity',
    unit: '%',
    icon: raindrop,
  },
  [MEASUREMENT_TYPES.battery]: {
    type: MEASUREMENT_TYPES.battery,
    name: 'Battery',
    icon: battery,
  },
  [MEASUREMENT_TYPES.snr]: {
    type: MEASUREMENT_TYPES.snr,
    name: 'SNR',
    unit: 'dB',
    icon: signal,
  },
  [MEASUREMENT_TYPES.rssi]: {
    type: MEASUREMENT_TYPES.rssi,
    name: 'RSSI',
    icon: signal,
  },
  [MEASUREMENT_TYPES.gwMetaDataRssi]: {
    type: MEASUREMENT_TYPES.gwMetaDataRssi,
    name: 'Gateway RSSI',
    icon: signal,
    reversed: true,
  },
  [MEASUREMENT_TYPES.gwMetaDataLoRaSNR]: {
    type: MEASUREMENT_TYPES.gwMetaDataLoRaSNR,
    name: 'Gateway loRaSNR',
    icon: signal,
  },
  [MEASUREMENT_TYPES.gwMetaDataPort]: {
    type: MEASUREMENT_TYPES.gwMetaDataPort,
    name: 'Port',
    icon: info,
  },
  [MEASUREMENT_TYPES.gwMetaDataFrameCount]: {
    type: MEASUREMENT_TYPES.gwMetaDataFrameCount,
    name: 'Frame count',
    icon: arrowUp,
  },
  [MEASUREMENT_TYPES.moisture]: {
    type: MEASUREMENT_TYPES.moisture,
    name: 'Moisture',
    unit: '%',
    icon: raindrop,
  },
  [MEASUREMENT_TYPES.luminance]: {
    type: MEASUREMENT_TYPES.luminance,
    name: 'Luminance',
    unit: 'lux',
    icon: adjust,
  },
};

export default DEVICE_MEASUREMENTS;
