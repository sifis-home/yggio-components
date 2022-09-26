/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {getConfig} from '../yggio-config';
import {IMAGES} from '../constants';

// right now we're just keeping the images straight in the backend

const getFullImageUrl = imageUrl => (
  !imageUrl ? null : `${getConfig().restUrl}/${imageUrl}`
);

const getLocationIconUrl = iconUrl => (
  getFullImageUrl(iconUrl) || IMAGES.defaultLocationIcon
);

const getBlueprintImageUrl = imageUrl => (
  getFullImageUrl(imageUrl) || IMAGES.defaultBlueprintImage
);

const getDeviceIconUrl = iconUrl => (
  getFullImageUrl(iconUrl) || IMAGES.defaultDeviceIcon
);

export {
  getFullImageUrl,
  getLocationIconUrl,
  getBlueprintImageUrl,
  getDeviceIconUrl,
};
