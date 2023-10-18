import _ from 'lodash';
import {RealEstateCoreResponse, FormInputs, InputOptions} from '../../types';

const MEMBER = 'http://www.w3.org/ns/hydra/core#member';
const HAS_POPULAR_NAME = 'https://w3id.org/rec/core/hasPopularName';
const VALUE = '@value';
const ID = '@id';

const selectRealEstateCoreOptions =
  (
    formInputs: FormInputs,
    realEstatesResponse?: RealEstateCoreResponse,
    buildingsResponse?: RealEstateCoreResponse,
    storeysResponse?: RealEstateCoreResponse,
    roomsResponse?: RealEstateCoreResponse,
  ) => {

    if (!realEstatesResponse || !buildingsResponse || !storeysResponse || !roomsResponse) {
      return undefined;
    }

    // Real estates
    const realEstateMembers = realEstatesResponse[0][MEMBER];
    const realEstateOptions = _.map(realEstateMembers, member => ({
      value: member[ID],
      label: member[HAS_POPULAR_NAME]?.[0][VALUE] || 'NO NAME',
    }));

    // Buildings
    const buildingMembers = buildingsResponse[0][MEMBER];
    const buildingAcc: InputOptions = [];
    const buildingOptions = _.reduce(buildingMembers, (result, member) => {
      const parent = member['https://w3id.org/rec/core/isPartOfRealEstate']?.[0][VALUE];
      if (parent === formInputs.realEstate.value) {
        result.push({
          value: member['@id'],
          label: member[HAS_POPULAR_NAME]?.[0][VALUE] || 'NO NAME',
        });
      }
      return result;
    }, buildingAcc);

    // Storeys
    const storeyMembers = storeysResponse[0][MEMBER];
    const storeyAcc: InputOptions = [];
    const storeyOptions = _.reduce(storeyMembers, (result, member) => {
      const parent = member['https://w3id.org/rec/core/isPartOfBuilding']?.[0][VALUE];
      if (parent === formInputs.building.value) {
        result.push({
          value: member['@id'],
          label: member[HAS_POPULAR_NAME]?.[0][VALUE] || 'NO NAME',
        });
      }
      return result;
    }, storeyAcc);

    // Rooms
    const roomMembers = roomsResponse[0][MEMBER];
    const roomAcc: InputOptions = [];
    const roomOptions = _.reduce(roomMembers, (result, member) => {
      const parent = member['https://w3id.org/rec/core/hasSuperBuildingComponent']?.[0][VALUE];
      if (parent === formInputs.storey.value) {
        result.push({
          value: member['@id'],
          label: member[HAS_POPULAR_NAME]?.[0][VALUE] || 'NO NAME',
        });
      }
      return result;
    }, roomAcc);

    return {
      realEstate: realEstateOptions,
      building: buildingOptions,
      storey: storeyOptions,
      room: roomOptions,
    };

  };

const selectRealEstateCorePopulateData = (
  roomId?: string,
  realEstatesResponse?: RealEstateCoreResponse,
  buildingsResponse?: RealEstateCoreResponse,
  storeysResponse?: RealEstateCoreResponse,
  roomsResponse?: RealEstateCoreResponse,
) => {

  // Room
  const roomMembers = _.get(roomsResponse, ['0', 'http://www.w3.org/ns/hydra/core#member']) as string;
  const room = _.find(roomMembers, ['@id', roomId]) as string;
  const roomName = _.get(room, ['https://w3id.org/rec/core/hasPopularName', '0', '@value']) as string;
  const storeyId = _.get(room, ['https://w3id.org/rec/core/hasSuperBuildingComponent', '0', '@value']) as string;

  // Storey
  const storeyMembers = _.get(storeysResponse, ['0', 'http://www.w3.org/ns/hydra/core#member']) as string;
  const storey = _.find(storeyMembers, ['@id', storeyId]) as string;
  const storeyName = _.get(storey, ['https://w3id.org/rec/core/hasPopularName', '0', '@value']) as string;
  const buildingId = _.get(storey, ['https://w3id.org/rec/core/isPartOfBuilding', '0', '@value']) as string;

  // Building
  const buildingMembers = _.get(buildingsResponse, ['0', 'http://www.w3.org/ns/hydra/core#member']) as string;
  const building = _.find(buildingMembers, ['@id', buildingId]);
  const buildingName = _.get(building, ['https://w3id.org/rec/core/hasPopularName', '0', '@value']) as string;
  const realEstateId = _.get(building, ['https://w3id.org/rec/core/isPartOfRealEstate', '0', '@value']) as string;

  // Real estate
  const realEstateMembers = _.get(realEstatesResponse, ['0', 'http://www.w3.org/ns/hydra/core#member']) as string;
  const realEstate = _.find(realEstateMembers, ['@id', realEstateId]) as string;
  const realEstateName = _.get(realEstate, ['https://w3id.org/rec/core/hasPopularName', '0', '@value']) as string;

  return {
    roomName,
    storeyName,
    buildingName,
    realEstateName,
  };

};

export {
  selectRealEstateCoreOptions,
  selectRealEstateCorePopulateData,
};
