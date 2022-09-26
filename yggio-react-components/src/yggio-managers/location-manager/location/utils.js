/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';

const BLUEPRINT_ZOOM_SCALE_FACTOR = 3500;

// not sure where it goes for the moment
const multCoord = (coordinate, multiplier) => ({
  x: coordinate.x * multiplier,
  y: coordinate.y * multiplier,
});

const addTwoCoords = (coord1, coord2) => ({
  x: coord1.x + coord2.x,
  y: coord1.y + coord2.y,
});

const subtractCoords = (coord1, coord2) => {
  const mc2 = multCoord(coord2, -1);
  return addTwoCoords(coord1, mc2);
};

const addCoords = (...coords) => (
  _.reduce(coords, (acc, coord) => (
    addTwoCoords(acc, coord)
  ), {x: 0, y: 0})
);

const makeCoord = obj => ({
  x: obj.x || obj.left || 0,
  y: obj.y || obj.top || 0,
});

const getZoomedGeometry = (zoomDiff, geometry) => {
  const oldScale = geometry.scale;
  const scale = oldScale * (2 ** (zoomDiff.zoom / BLUEPRINT_ZOOM_SCALE_FACTOR));
  const factor = (scale / oldScale - 1);
  // const diffCoord = {x: zoomDiff.left, y: zoomDiff.top};
  const diffCoord = {x: 0, y: zoomDiff.top}; // Dont know why this works
  const scaledDiff = multCoord(diffCoord, -factor);
  const coordinate = addTwoCoords(geometry, scaledDiff);
  return {...coordinate, scale};
};

const getPannedGeometry = (screenDiff, geometry) => {
  const {scale} = geometry;
  const scaledDiff = multCoord(screenDiff, 1 / scale);
  const translated = addTwoCoords(geometry, scaledDiff);
  return {...translated, scale};
};

// not really the screen coord, just relative to layer
const getScreenCoordinate = (coord, geometry, parentDimensions) => {
  const translated = addTwoCoords(coord, geometry);
  const scaled = multCoord(translated, geometry.scale);
  const screenCenter = {
    x: parentDimensions.width / 2,
    y: parentDimensions.height / 2,
  };
  const screenCoordinate = addTwoCoords(scaled, screenCenter);
  return screenCoordinate;
};

const centerScreenPosition = (screenPosition, parentDimensions) => {
  const screenCoord = makeCoord(screenPosition);
  const screenOffset = multCoord(makeCoord(parentDimensions), -1);
  const screenSize = multCoord({x: parentDimensions.width, y: parentDimensions.height}, -0.5);
  const centeredCoord = addCoords(screenCoord, screenOffset, screenSize);
  return centeredCoord;
};

const unscaleCenteredCoord = (centered, geometry) => {
  const centeredCoord = makeCoord(centered);
  const unscaled = multCoord(centeredCoord, 1 / geometry.scale);
  const coordinate = subtractCoords(unscaled, geometry);
  return coordinate;
};

const centerAndUnscaleScreenPosition = (screenPosition, geometry, parentDimensions) => {
  const centeredCoord = centerScreenPosition(screenPosition, parentDimensions);
  const coordinate = unscaleCenteredCoord(centeredCoord, geometry);
  return coordinate;
};

export {
  centerScreenPosition,
  unscaleCenteredCoord,
  centerAndUnscaleScreenPosition,
  getScreenCoordinate,
  getZoomedGeometry,
  getPannedGeometry,
};
