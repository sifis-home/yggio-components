/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
interface RealEstateCoreResponseBody {
  '@id': string;
  '@type': string[];
  'http://www.w3.org/ns/hydra/core#member': {
    '@id': string;
    'https://w3id.org/rec/core/hasPopularName'?: {'@value': string}[],
    'https://w3id.org/rec/core/isPartOfRealEstate'?: {'@value': string}[],
    'https://w3id.org/rec/core/isPartOfBuilding'?: {'@value': string}[],
    'https://w3id.org/rec/core/hasSuperBuildingComponent'?: {'@value': string}[],
  }[];
  'http://www.w3.org/ns/hydra/core#totalItems': {'@value': number}[];
}

type RealEstateCoreResponse = RealEstateCoreResponseBody[];

interface MountRecDeviceParams {
  realEstateId: string;
  roomId: string;
  isCastellumMatilda: boolean;
}

export {
  RealEstateCoreResponse,
  MountRecDeviceParams,
};
