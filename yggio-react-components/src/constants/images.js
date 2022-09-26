/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import defaultLocationIcon from '../assets/images/defaults/location-icon.png';
import defaultBlueprintImage from '../assets/images/defaults/blueprint.jpg';
import defaultDeviceIcon from '../assets/images/defaults/device-icon.png';

const allowedTypes = ['image/jpeg', 'image/gif', 'image/png'];
const maxSize = 1024 * 1024 * 2;

const IMAGES = {
  defaultBlueprintImage,
  defaultDeviceIcon,
  defaultLocationIcon,
  allowedTypes,
  maxSize,
};

export default IMAGES;
