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

export type {
  RealEstateCoreResponse,
  MountRecDeviceParams,
};
