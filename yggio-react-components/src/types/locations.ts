/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
interface LocationItemControl {
  _id: string;
  icon?: string;
}

interface LayerItem {
  deviceId: string;
  left?: number;
  locationItemControl?: LocationItemControl;
  size: string;
  top?: number;
  type: string;
  _id?: string;
}

interface Layer {
  _id: string;
  name: string;
  items: LayerItem[];
  image: string;
}

interface Location {
  name: string;
  createdAt: string;
  defaultLayer: Layer;
  description: string;
  icon?: string;
  lat: number;
  layers: Layer[];
  lng: number;
  updatedAt: string;
  user: string;
  _id: string;
}

type Locations = Location[];
type IdKeyedLocations = Record<string, Location>;

export {
  LayerItem,
  Layer,
  Location,
  Locations,
  IdKeyedLocations,
};
