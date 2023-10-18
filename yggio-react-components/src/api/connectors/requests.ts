import {request} from '../request';
import {HTTP_METHODS, RESOURCE_TYPES} from '../../constants';
import {Connector} from '../../types';

const fetch = async <T = Connector>(params: Record<string, string>) => request<T[]>({
  method: HTTP_METHODS.get,
  URI: RESOURCE_TYPES.connectors,
  params,
});

const fetchOne = async (connectorId: string) => request<Connector>({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.connectors}/${connectorId}`,
});

const create = async (data: Omit<Connector, '_id'>) => request<Connector>({
  method: HTTP_METHODS.post,
  URI: RESOURCE_TYPES.connectors,
  data,
});

const update = async (connectorId: string, data: Partial<Connector>) => request<Connector>({
  method: HTTP_METHODS.put,
  URI: `${RESOURCE_TYPES.connectors}/${connectorId}`,
  data,
});

const remove = async (connectorId: string) => request({
  method: HTTP_METHODS.delete,
  URI: `${RESOURCE_TYPES.connectors}/${connectorId}`,
});

interface SendCommandData {
  connectorId: string;
  command: string;
  integrationName: string;
  data: unknown;
}

const sendCommand = async (data: SendCommandData) => request({
  method: HTTP_METHODS.put,
  URI: `${RESOURCE_TYPES.connectors}/command`,
  data,
});


export {
  fetch,
  fetchOne,
  create,
  update,
  remove,
  sendCommand,
};
