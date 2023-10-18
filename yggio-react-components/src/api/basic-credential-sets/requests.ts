import {request} from '../request';
import {HTTP_METHODS, RESOURCE_TYPES} from '../../constants';

const createOne = async (basicCredentialsSet: object) => request({
  method: HTTP_METHODS.post,
  URI: `${RESOURCE_TYPES.basicCredentialsSets}`,
  data: basicCredentialsSet,
});

const fetch = async () => request({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.basicCredentialsSets}`,
});

const fetchOne = async (basicCredentialsSetId: string) => request({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.basicCredentialsSets}/${basicCredentialsSetId}`,
});

const remove = async (basicCredentialsSetId: string) => request({
  method: HTTP_METHODS.delete,
  URI: `${RESOURCE_TYPES.basicCredentialsSets}/${basicCredentialsSetId}`,
});


export {
  createOne,
  fetch,
  fetchOne,
  remove,
};
