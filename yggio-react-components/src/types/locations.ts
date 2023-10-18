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

export type {
  LayerItem,
  Layer,
  Location,
  Locations,
  IdKeyedLocations,
};
